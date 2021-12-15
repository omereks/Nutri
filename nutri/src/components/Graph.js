import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import axios from "axios";
import {Button} from "reactstrap";



class Graph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        this.updateGraph = this.updateGraph.bind(this);
    }

    updateGraph(){
        // graph = {
        //     name: ,
        //     precents:
        // }
    }


    async getRecommendedValues() {
        await axios.get("http://localhost:3001/api/nutrients", {params: {user_id:this.props.userId}}).then((res)=>{
            this.setState({
                recommendedValues: res.data
            });
            //console.log(res.data[0].amount)
            console.log("FROM VALUES", res.data)
        })
    };
    async getFoodEaten() {
        await axios.get("http://localhost:3001/api/foodEaten", {params: {user_id:this.props.userId}}).then((res)=>{
            this.setState({
                foodEaten: res.data
            });
            //console.log(res.data[0].amount)
            console.log("FROM FOOD EATEN", res.data)
        })
    };
    async componentDidMount() {
        this.setState({data: vars})
    }

    async componentWillReceiveProps(nextProps) {
        console.log("PROPS HAS CHANGED")
        this.getRecommendedValues(nextProps).then(()=>{
            // this.setState({
            //     recommendedValues: res.data
            // });
        })
        this.getFoodEaten(nextProps).then(()=>{
            // this.setState({
            //     foodEaten: res.data
            // });
        })

    }
//
    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={200} height={200} data={this.state.data}>
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

const vars = [
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

export default Graph;