import React from 'react';


function Square(props) { 
    return (
        // onCLick={props.onClick} heißt: props haben einen Event von onClick
        // und dieses Event ruft die Function aus Board auf, 
        // und diese Function hat die handleClick
        <button className="square" 
                onClick={props.onClick}>
            {props.value}    
        </button> 
    );
}
export default Square;

/*
class Square extends Component {

    render() {
        return (
            <button 
            className="square" 
            //  this.setState({value: 'X'}) --> hier müssen wir 
            // die function 'onClick' vom Board aufrufen und das geht durch:
            onClick={() => this.props.onClick()}
            >
              {this.props.value}

            </button>
        );
    }
}
 
export default Square;
*/