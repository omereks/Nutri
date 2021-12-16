import React from "react"; 
import './userFood.css';

class UserFood extends React.Component {
    render() { 
        return <div>
            <span className="badge badge-primary">{this.props.valueName}</span>
            <div>
            <span className="badge badge-primary">Count {this.props.foodAmount}
            <button onClick={ () =>this.props.removeFunction(this.props.valueName)}>remove</button></span>
            </div>
        </div>;
    }
}
 
export default UserFood;