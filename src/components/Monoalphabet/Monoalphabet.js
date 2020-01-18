import React, {Component} from 'react';
import classes from './Monoalphabet.module.css';

export class MonoalphabetEncode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shift: "",
            value: "",
            error: ""
        };
    }

    charRepeats(str){
        for (let i=0; i<str.length; i++) {
            if ( str.indexOf(str[i]) !== str.lastIndexOf(str[i]) ) {
                return true;
            }
        }
        return false;
    }

    changeShift(e){
        e.preventDefault();
        const str = e.target.value;
        if(this.charRepeats(str)){
            this.setState({error:"A permutációban nem lehet ismétlődő karakter."});
            return;
        }
        this.setState({error:"",shift:str});
    }

    changeValue(e){
        e.preventDefault();
        if(this.state.shift.length !== 95){
            this.setState({error:"A permutációnak 95 hosszúságúnak kell lenni."});
            return;
        }
        this.setState({value: e.target.value});
    }

    generatePerm(e){
        e.preventDefault();
        let rsort = new Array(95);
        for(let idx = 0; idx < 95; idx++)
        {
            rsort[idx] = String.fromCharCode(idx+32);
        }

        // then proceed to shuffle the rsort array
        for(let idx = 0; idx < rsort.length; idx++)
        {
            let swpIdx = idx + Math.floor(Math.random() * (rsort.length - idx));
            // now swap elements at idx and swpIdx
            let tmp = rsort[idx];
            rsort[idx] = rsort[swpIdx];
            rsort[swpIdx] = tmp;
        }

        this.setState({shift:rsort.join('')});
    }

    render(){
        let error = null;
        if(this.state.error !== "") error = (<p className={classes.error}>{this.state.error}</p>);

        let titkositott = "";
        const kulcs = this.state.shift.split("");
        this.state.value.split("").forEach(character => {
            titkositott += kulcs[character.charCodeAt()-32];
        });

        return (
            <div>
                {error}
                <label className={classes.label}>Permutáció: <input value={this.state.shift} onChange={e => this.changeShift(e)} type="text"/></label>
                <label className={classes.label}><input type="submit" value="Random permutáció generálása" onClick={e => this.generatePerm(e)}/></label>
                <label className={classes.label}>Titkosítandó szöveg: <input value={this.state.value} onChange={e => this.changeValue(e)} type="text"/></label>
                <label className={classes.label}>Titkosított szöveg: <input type="text" value={titkositott} disabled/></label>
            </div>
        );
    }
}

export class MonoalphabetDecode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shift: "",
            value: "",
            error: ""
        };
    }

    charRepeats(str){
        for (let i=0; i<str.length; i++) {
            if ( str.indexOf(str[i]) !== str.lastIndexOf(str[i]) ) {
                return true;
            }
        }
        return false;
    }

    changeShift(e){
        e.preventDefault();
        const str = e.target.value;
        if(this.charRepeats(str)){
            this.setState({error:"A permutációban nem lehet ismétlődő karakter."});
            return;
        }
        this.setState({error:"",shift:str});
    }

    changeValue(e){
        e.preventDefault();
        if(this.state.shift.length !== 95){
            this.setState({error:"A permutációnak 95 hosszúságúnak kell lenni."});
            return;
        }
        this.setState({value: e.target.value});
    }

    render(){
        let error = null;
        if(this.state.error !== "") error = (<p className={classes.error}>{this.state.error}</p>);

        let eredeti = "";
        const kulcs = this.state.shift.split("");
        this.state.value.split("").forEach(character => {
            eredeti += String.fromCharCode(kulcs.indexOf(character)+32);
        });

        return (
            <div>
                {error}
                <label className={classes.label}>Permutáció: <input value={this.state.shift} onChange={e => this.changeShift(e)} type="text"/></label>
                <label className={classes.label}>Titkosított szöveg: <input value={this.state.value} onChange={e => this.changeValue(e)} type="text"/></label>
                <label className={classes.label}>Eredeti szöveg: <input type="text" value={eredeti} disabled/></label>
            </div>
        );
    }
}