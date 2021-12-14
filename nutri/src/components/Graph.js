import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import axios from "axios";
import {Button} from "reactstrap";

const data = [
    {
        name: 'Carbon',
        Recommended: 75
    },
    {
        name: 'Proteins',
        Recommended: 120
    },
    {
        name: 'Fats',
        Recommended: 75
    },
    {
        name: 'Vitamins',
        Recommended: 65
    },
    {
        name: 'Minerals',
        Recommended: 45
    },
    {
        name: 'Dietary fibre',
        Recommended: 27
    },
]

class Graph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async getRecommendedValues() {
        await axios.get("http://localhost:3001/api/nutrients", {params: {user_id:this.props.userId}}).then((res)=>{
            this.setState({
                recommendedValues: res.data
            });
            //console.log(res.data[0].amount)
            console.log(res.data)
        })
    };
    async getFoodEaten() {
        await axios.get("http://localhost:3001/api/foodEaten", {params: {user_id:this.props.userId}}).then((res)=>{
            this.setState({
                recommendedValues: res.data
            });
            //console.log(res.data[0].amount)
            console.log(res.data)
        })
    };
    async componentDidMount() {

    }

    async componentWillReceiveProps(nextProps) {
        console.log("PROPS HAS CHANGED")
        // this.getRecommendedValues().then(()=>{
        //     //this.setState()
        // })
        this.getFoodEaten().then(()=>{
            //this.setState()
        })
    }
//
    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={200} height={200} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{fontSize: 15, fill:'white'}} />
                    <YAxis tick={{fontSize:15, fill:'white'}}/>
                    <Tooltip />
                    <Legend verticalAlign="top" iconSize={14} />
                    <Bar dataKey="Recommended" onClick={this.updateGraph} name='Daily nutrient in %' legendType={"line"} label={{ fill: 'green', fontSize: 15 }} fill="#82ca9d" />
                    <ReferenceLine strokeWidth={3} y={100} alwaysShow={true} isFront={true} label={{value:'Your Goal For Today', fill: 'white', fontSize: 20 }}  stroke="red" strokeDasharray="3 3" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default Graph;