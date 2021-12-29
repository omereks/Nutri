import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import axios from "axios";
import {Button} from "reactstrap";


class Graph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        //this.updatePercents = updatePercents.bind(this)
    }
    async componentDidMount() {
        let precents_ = [
            {
                nutrient_name: "Protein",
                nameForGraph: "Protein",
                total: 0
            },
            {
                nutrient_name: "Energy",
                nameForGraph: "Energy",
                total: 0
            },
            {
                nutrient_name: "Total fat",
                nameForGraph: "Fat",
                total: 0
            },
            {
                nutrient_name: "Calcium, Ca",
                nameForGraph: "Calcium",
                total: 0
            },
            {
                nutrient_name: "Sodium, Na",
                nameForGraph: "Sodium",
                total: 0
            },
            {
                nutrient_name: "Vitamin A, RAE",
                nameForGraph: "Vitamin A",
                total: 0
            },
            {
                nutrient_name: "Vitamin D (D2 + D3)",
                nameForGraph: "Vitamin D",
                total: 0
            },
            {
                nutrient_name: "Vitamin B-12",
                nameForGraph: "Vitamin B-12",
                total: 0
            },
            {
                nutrient_name: "Vitamin C, added",
                nameForGraph: "Vitamin C",
                total: 0
            },
            {
                nutrient_name: "Vitamin E, added)",
                nameForGraph: "Vitamin E",
                total: 0
            }
            ]
        this.setState({precents: precents_})
    }


    async getRecommendedValues() {
        await axios.get("http://localhost:3001/api/nutrients", {params: {user_id:this.props.userId}}).then((res)=>{
            this.setState({
                recommendedValues: res.data
            });
            console.log("Personal nutrients values:", res.data)
            try {this.updatePercents()}
            catch (e){}
        })
    };
    async getFoodEaten() {
        await axios.get("http://localhost:3001/api/foodEaten", {params: {user_id:this.props.userId}}).then((res)=>{
            this.setState({
                foodEaten: res.data
            });
            console.log("Total nutrients eaten:", res.data)
            try {this.updatePercents()}
            catch (e){}
        })
    };

    updatePercents = () => {
        var pre = {
            nutrient_name: "",
            total: 0
        }
        let precents_ = this.state.precents
        for(let i = 0; i < this.state.foodEaten.length; i++){
            let nutrient = this.state.foodEaten[i]
            for(let j = 0; j < this.state.recommendedValues.length; j++){
                let nut = this.state.recommendedValues[j]
                if (nut.nutrient_id == nutrient.nutrient_id) {
                    let recommended = nut.amount
                    let p = Math.round((nutrient.total / nut.amount) * 100)
                    for(let k = 0; k < this.state.precents.length; k++) {
                        if (this.state.precents[k].nutrient_name == nutrient.nutrient_name){
                            this.state.precents[k].total = p
                        }
                    }
                    //recents_[nutrient.nutrient_name] = p
                }
            }
            this.setState({precents: precents_})
        }
    }

    refreshGraph = () => {
        console.log("PROPS HAS CHANGED")
        this.getRecommendedValues(this.props.userId)
        this.getFoodEaten(this.props.userId)

    }

    render() {
        return (
            <div>
                <Button onClick={this.refreshGraph} >Calculate</Button>
                <BarChart width={600} height={350} data={this.state.precents}>
                    <XAxis dataKey="nameForGraph" tick={{fontSize: 12, fill:'white'}} />
                    <YAxis tick={{fontSize:15, fill:'white'}}/>
                    <Legend verticalAlign="top" iconSize={14} />
                    <ReferenceLine strokeWidth={3} y={100} alwaysShow={true} isFront={true} label={{value:'Your Goal For Today', fill: 'white', fontSize: 20 }}  stroke="red" strokeDasharray="3 3" />
                    <Bar  dataKey="total" onClick={this.updateGraph} name='Daily %' legendType={"line"} label={{ fill: 'green', fontSize: 15 }} fill="#82ca9d" />
                </BarChart>
            </div>

        ); // DONT DELETE: <ReferenceLine strokeWidth={3} y={100} alwaysShow={true} isFront={true} label={{value:'Your Goal For Today', fill: 'white', fontSize: 20 }}  stroke="red" strokeDasharray="3 3" />
    }
}
export default Graph;