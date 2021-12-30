import React, { useState } from "react";
//import { View, Picker, StyleSheet } from "react-native";
import Graph from "./Graph";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

let defText = 0

class ChangeValues extends React.Component {
    constructor(props) {
        let obj =
            {
                nutrient_name: "",
                nameForGraph: "",
                amount: 0
            }
        super(props);
        this.state = {
            text: defText,
            value:obj
        }
    }

    componentDidMount() {
        let obj =
        {
            nutrient_name: "",
            nameForGraph: "",
            amount: 0
        }
        this.setState({value:obj})
    }
    setValues = (e) => {
        let userId = this.props.userId
        let valName = this.state.value.nutrient_name
        let newVal = this.state.inText
        console.log("After Click:", this.state.inText)
    }

    textChange = (e) => {
        this.setState({inText: e.target.value})
    }

    handleChange = (e) => {
        try {
            let i = e.target.value
            this.setState({value: this.props.values[i],
            text: this.props.values[i].amount})
        }
        catch(err){}
        console.log(this.state.text)
    }

    render() {
        return (
            <Box sx={{ minWidth: 420 }}>
                <FormControl fullWidth>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select"  label="Age" onChange={this.handleChange}>
                        <MenuItem value={0}>Protein</MenuItem>
                        <MenuItem value={1}>Energy</MenuItem>
                        <MenuItem value={2}>Fat</MenuItem>
                        <MenuItem value={3}>Calcium</MenuItem>
                        <MenuItem value={4}>Sodium</MenuItem>
                        <MenuItem value={5}>Vitamin A</MenuItem>
                        <MenuItem value={6}>Vitamin D</MenuItem>
                        <MenuItem value={7}>Vitamin B-12</MenuItem>
                        <MenuItem value={8}>Vitamin C</MenuItem>
                        <MenuItem value={9}>Vitamin E</MenuItem>
                    </Select>


                </FormControl>
                <TextField id="outlined-basic" variant="outlined" type="number" onChange={this.textChange}/>
                <Button variant="contained" onClick={this.setValues}>Set Values</Button>
                <h6>Current value: {this.state.text}</h6>
            </Box>
        ); // label={this.state.value.amount}
        // defaultValue={this.state.value.amount}
    }
}
// value={this.props.values.nutrient_name}
export default ChangeValues;