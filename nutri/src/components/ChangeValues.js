import React, { useState } from "react";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";

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
        this.setValInDb = this.setValInDb.bind(this);
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
    // Set values
    async setValInDb(userId_, valId_, newVal_) {
        await axios.post("http://localhost:3001/api/updateVal", {params: {userId: userId_, valId: valId_, newVal: newVal_}}).then((res)=>{
            this.setState({
            });
        })
    };

    setValues = (e) => {
        let userId = this.props.userId
        let valName = this.state.value.nutrient_name
        let newVal = this.state.inText
        let valId = -1
        switch (valName) {
            case "Protein":
                valId = "1003";
                break;
            case "Energy":
                valId = "1008";
                break;
            case "Total fat (NLEA)":
                valId = "1085";
                break;
            case "Calcium, Ca":
                valId = 1087;
                break;
            case "Sodium, Na":
                valId = 1093;
                break;
            case "Vitamin A, RAE":
                valId = 1106;
                break;
            case "Vitamin D (D2 + D3)":
                valId = 1114;
                break;
            case "Vitamin B-12":
                valId = 1178;
                break;
            case "Vitamin C, added":
                valId = 1241;
                break;
            case "Vitamin E, added":
                valId = 1242;
        }
        this.setValInDb(userId, valId, newVal).then()

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
                <h6>Your value: {this.state.text}</h6>
            </Box>
        );
    }
}
export default ChangeValues;