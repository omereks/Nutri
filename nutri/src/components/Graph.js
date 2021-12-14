import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import axios from "axios";
import {Button} from "reactstrap";

const data = [
    {
        name: 'Carbon',
        Recommended: 75,
        Recommended4U: 75
    },
    {
        name: 'Proteins',
        Recommended: 120,
        Recommended4U: 95
    },
    {
        name: 'Fats',
        Recommended: 75,
        Recommended4U: 90
    },
    {
        name: 'Vitamins',
        Recommended: 65,
        Recommended4U: 35
    },
    {
        name: 'Minerals',
        Recommended: 45,
        Recommended4U: 45
    },
    {
        name: 'Dietary fibre',
        Recommended: 27,
        Recommended4U: 126
    },
]
class Graph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userRecommendedValues: {},
            recommenedValues: {},
            userEatenValues: {},
        }
        //this.updateGraph = this.updateGraph.bind(this);
    }


    async getData() {
        await axios.get("http://localhost:3001/api/nutrients", {params: {user_id:5555}}).then((res)=>{
            this.setState({
                data: res.data

            });
            console.log(res.data)
        })
    };

    async componentDidMount() {

    }
    async componentWillReceiveProps(nextProps) {
        this.getData().then(()=>{
            this.setState()
        })
    }

    render() {
        return (

            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={200} height={200} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{fontSize: 15, fill:'white'}} />
                    <YAxis tick={{fontSize:15, fill:'white'}}/>
                    <Tooltip />
                    <Legend verticalAlign="top" iconSize={14} />
                    <Bar dataKey="Recommended4U" onClick={this.updateGraph} name='Daily nutrient in %' legendType={"line"} label={{ fill: 'green', fontSize: 15 }} fill="#82ca9d" />
                    <ReferenceLine strokeWidth={3} y={100} alwaysShow={true} isFront={true} label={{value:'Your Goal For Today', fill: 'white', fontSize: 20 }}  stroke="red" strokeDasharray="3 3" />
                </BarChart>
            </ResponsiveContainer>

        );
        // <Bar dataKey="Recommended" legendType={"line"} label={{ fill: 'blue', fontSize: 15 }} fill="#8884d8" />
    }
}
export default Graph;