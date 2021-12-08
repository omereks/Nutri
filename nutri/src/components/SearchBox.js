import React from "react";
import './SearchBox.css';
import axios from "axios";
import UserFood from "./userFood";

export default class SearchBox extends React.Component{

/************************************************************************************************
 * FUNCTION NAME: constructor
 * details: this cunstructor include 
 * counter = to create id for each food in food eaten
 * foods = a list of all the food we eat
 * text = the current text in the search bar
 * suggestion = a small list which include suggestions (the first top 5)
*************************************************************************************************/
    constructor(props) {
        super(props);
        this.count = {
            counter:0,
        }
        this.foods = []
        this.state = {
            suggestions: [],
            text: '',
            foodsList:[],
        };
    }

/************************************************************************************************
 * FUNCTION NAME: onTextChanged
 * details: this function work when we type/change somthing in the search food bar, this function
 * check for suggestion from data base.
*************************************************************************************************/
    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0 ){
            axios.get("http://localhost:3001/api/foodexist", {params: {foodname:value}}).then((newVal) => { // go to the server and request the top five food with prefix of the input(value)
                //console.log(newVal.data) Delete later (for debug)
                suggestions = newVal.data
                this.food = e.target.value
                //console.log(suggestions) // Delete later (for debug)
                this.setState(() => ({suggestions,text: value}));
            })
            //const regex = new RegExp(`^${value}`,'i' ) // for testing  Dont TOCH! i delete later.
            //suggestions = this.items.sort().filter(v=> regex.test(v)) // for testing
    }else{
        let suggestions = [];
        this.setState(() => ({suggestions,text: value}));

    }
    //this.setState(() => ({suggestions,text: value})); # delete later
}
/************************************************************************************************
 * FUNCTION NAME: addFood
 * details: this function take the user input and check if the input is in the db if so then 
 * we send post request to the data base
*************************************************************************************************/
addFood = (v) =>{
    // check the user have input
    if(this.state.text == 0){
        window.alert("empty string")
        return
    }
    // check if it exists so we change the count
    const inputName = this.state.text
    var existsValue = this.foods.filter(c => c.foodsname == inputName) // return the value if exists otherwise return empty list
    if (existsValue.length != 0) { // if the value is already exists we upload it
        const newAmount = existsValue[0].foodAmount + 1
        const existId = existsValue[0].foodId
        const fv = inputName
        const newFoods = this.foods.filter(c => c.foodsname != inputName)
        newFoods.push({foodId: existId,foodsname: fv,foodAmount:newAmount}) 
        this.foods = newFoods
        this.setState(this.foods)
        axios.post("http://localhost:3001/api/updateAmount",{params: {foodId:existId,foodAmount:newAmount}}) // send post request with the food_id and food count.
        
    }else{ // if we here that means that is a new name which can be false name (not in db) so we check if its in the db and after that we enter to the db (the server doing both in one request)
    axios.post("http://localhost:3001/api/addFood",{params: {foodId:this.count.counter,foodValue:inputName,foodAmount:1,userId:this.props.userId}}).then((succes) => {
        if(succes.data == false){
            window.alert("not in database, try diffrent name convention")
        }else{
            this.foods.push({foodId: this.count.counter,foodsname: this.state.text,foodAmount:1})
            this.count.counter = this.count.counter + 1
            this.setState(this.foods) 
        }
    })
}
}
/************************************************************************************************
 * FUNCTION NAME: removeFood
 * details: this function remove/decrease the count from the db
*************************************************************************************************/
removeFood = (v)=>{
    const inputValue = v
   // var exists = this.foods.filter(c=> c.foodname == inputValue)
    const indexFood = this.foods.findIndex((obj => obj.foodsname == inputValue));
    const counter = this.foods[indexFood].foodAmount
    const newAmount = counter - 1
    const existId = this.foods[indexFood].foodId
    if(counter > 1){
        // reduce the amount from list.
        this.foods[indexFood].foodAmount = counter - 1
        this.setState(this.foods)
        axios.post("http://localhost:3001/api/updateAmount",{params: {foodId:existId,foodAmount:newAmount}})
    }else{
        axios.post("http://localhost:3001/api/deleteFood",{params: {foodValue:inputValue}})
        this.foods.splice(indexFood,1)
        this.setState(this.foods)
    }
    
}

    suggestionsSelected (value){
       this.setState(() => ({
           text: value,
           suggestions: [],
       }))
    }


    renderSuggestions(){
        const {suggestions} = this.state;
        if (suggestions.length == 0){
            return null
        }
        return (
            <ul>
            {suggestions.map((item) =>  <li onClick={() => this.suggestionsSelected(item)}>{item}</li>)}
            </ul>
        );


    }
    render(){
       const { text} = this.state;
        return (
            <div className="SearchBox">
                <button onClick={this.addFood}>Add!</button>
                <input value={text} onChange={this.onTextChanged} type="text" />
                {this.renderSuggestions()}
                {this.foods.map(f => <UserFood  key={f.foodId} id={f.foodId} valueName={f.foodsname} foodAmount={f.foodAmount} removeFunction={this.removeFood}></UserFood>)}
            </div>
            
        )
    }

}