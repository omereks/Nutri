import React from "react"; 
import './userFood.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';



class UserFood extends React.Component {
    render() { 
        return( 
        <div>
            <table>
                <tr>
                    <td className="name1">{this.props.valueName}</td>
                    <td className="name2">Amount: {this.props.foodAmount}</td>
                    <td className="name3">
                        <IconButton aria-label="delete" onClick={ () =>this.props.removeFunction(this.props.valueName)}> 
                            <DeleteIcon />
                        </IconButton>
                    </td>
                </tr>
            </table>
            {/* <span className="badge badge-primary">{this.props.valueName}</span>
            <span className="badge badge-primary">Amount: {this.props.foodAmount} |
            <IconButton aria-label="delete" onClick={ () =>this.props.removeFunction(this.props.valueName)}> |
                <DeleteIcon />
            </IconButton></span> */}
        </div>);
        }
}
 
export default UserFood;