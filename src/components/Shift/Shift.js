import React, {Component} from 'react';
import classes from './Shift.module.css';

export class ShiftEncode extends Component{
    constructor(props) {
        super(props);
        this.state = {
            shift: 0,
            value: ""
        };
    }

    changeShift(e){
        e.preventDefault();
        this.setState({shift: e.target.value});
    }

    changeValue(e){
        e.preventDefault();
        this.setState({value: e.target.value});
    }

    render(){
        let titkositott = "";
        this.state.value.split("").forEach(character => {
            let n = (character.charCodeAt()-32+parseInt(this.state.shift)) % 95;
            if(n<0) n = 95 + n;
            n = n + 32;
            titkositott += String.fromCharCode(n);
        });

        return (<div>
            <label className={classes.label}>Eltolás: <input value={this.state.shift} onChange={e => this.changeShift(e)} type="number"/></label>
            <label className={classes.label}>Titkosítandó szöveg: <input value={this.state.value} onChange={e => this.changeValue(e)} type="text"/></label>
            <label className={classes.label}>Titkosított szöveg: <input type="text" value={titkositott} disabled/></label>
        </div>);
    }
}

export class ShiftDecode extends Component{
    constructor(props) {
        super(props);
        this.state = {
            shift: 0,
            value: ""
        };
    }

    changeShift(e){
        e.preventDefault();
        this.setState({shift: e.target.value});
    }

    changeValue(e){
        e.preventDefault();
        this.setState({value: e.target.value});
    }

    render(){
        let eredeti = "";
        this.state.value.split("").forEach(character => {
            let n = (character.charCodeAt()-32-parseInt(this.state.shift)) % 95;
            if(n<0) n = 95 + n;
            n = n + 32;
            eredeti += String.fromCharCode(n);
        });

        return (<div>
            <label className={classes.label}>Eltolás: <input value={this.state.shift} onChange={e => this.changeShift(e)} type="number"/></label>
            <label className={classes.label}>Titkosított szöveg: <input value={this.state.value} onChange={e => this.changeValue(e)} type="text"/></label>
            <label className={classes.label}>Eredeti szöveg: <input type="text" value={eredeti} disabled/></label>
        </div>);
    }
}