import React, { Component } from 'react';
import Axios from "axios";
import './Users.css';
import { Button,InputGroup,Input,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Toggle from "react-toggle";
import "react-toggle/style.css";



// https://reactstrap.github.io/?path=/docs/home-installation--page
class Users extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newUser: false,
            userID: props.userID,
            gender: 0,
            validID: true
        }
    }

    

    render() {
        return (
            
            <div className="main">
                <div className="id">
                    <InputGroup >
                        <Input  onChange={
                            (val) => {
                                this.setState({userID:`${val.target.value}`})
                                this.setState({validID:!isNaN(`${val.target.value}`)})
                            }}/>
                        <Button data-bs-toggle="modal" data-bs-target="#exampleModal" {...!this.state.validID?{disabled:'true'}:""} onClick={(e)=>{
                            if(this.state.validID){
                                console.log(this.state.newUser)
                                Axios.get("http://localhost:3001/api/isuser", {params: {id:this.state.userID}})
                                .then((val)=> {
                                    console.log(val)
                                    if(val.data){
                                        this.setState({newUser: false})
                                        this.props.chengeUserId(this.state.userID)
                                    }else{
                                        this.setState({newUser: true})
                                    }
                                })
                            }
                        }}>
                        Let's Go!
                        </Button>
                    </InputGroup>
                </div> 


                <div className={this.state.newUser?"gender":"hidden"} >
                            New User :) please select a gender:
                            <Button data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={(e)=>{
                            console.log(this.state.newUser)
                            Axios.post("http://localhost:3001/api/adduser", {params: {id:this.state.userID, gender:1}})
                            this.setState({newUser: false})
                            }}>
                                Male
                            </Button>
                            <span>  </span>
                            <Button data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={(e)=>{
                            Axios.post("http://localhost:3001/api/adduser", {params: {id:this.state.userID, gender:0}})
                            this.setState({newUser: false})
                            }}>
                                Female
                            </Button>
                        </div>


            </div>

            
          );
    }
}
export default Users;