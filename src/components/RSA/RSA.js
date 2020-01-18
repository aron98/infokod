import React, {Component} from 'react';
import classes from './RSA.module.css';
import axios from 'axios';

export default class RSAEncode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            p: 0,
            q:0,
            n:"",
            e:"",
            d:"",
            envalue: "",
            devalue: "",
            decripted:"",
            error: ""
        };
    }

    isPrime(num) {
        for(let i = 2; i < num/2; i++)
            if(num % i === 0) return false;
        return num > 1;
    }

    primeChange(e,n){
        e.preventDefault();
        if(n === "p")
            this.setState({p: e.target.value, error:""});
        else if(n === "q")
            this.setState({q: e.target.value, error:""});
    }

    generatePrime(e){
        e.preventDefault();
        let arr = [2];
        for ( let i = 3; i <= 10000; i+=2 ) {
            if ( this.isPrime(i) ) {
                arr.push(i);
            }
        }
        this.setState({error:"",p:arr[Math.floor(Math.random() * arr.length)],q:arr[Math.floor(Math.random() * arr.length)]})
    }

    generateLargePrime(e){
        e.preventDefault();
        let arr = [2];
        for ( let i = 3; i <= 100000; i+=2 ) {
            if ( this.isPrime(i) ) {
                arr.push(i);
            }
        }
        this.setState({error:"",p:arr[Math.floor(Math.random() * arr.length)],q:arr[Math.floor(Math.random() * arr.length)]})
    }

    gcd(a,b) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b > a) {var temp = a; a = b; b = temp;}
        while (true) {
            if (b === 0) return a;
            a %= b;
            if (a === 0) return b;
            b %= a;
        }
    }

    generateKey(e){
        e.preventDefault();
        if(!(this.isPrime(this.state.p) && this.isPrime(this.state.q))){
            this.setState({error: "A p és a q nem prímszámok."});
            return;
        }
        this.setState({n:this.state.p*this.state.q});
        let phi = (this.state.p-1)*(this.state.q-1);

        let x = 2;
        let en = 1;
        while(x > 1) {
            en = en + 1;
            x = this.gcd(phi, en);
        }

        let i = 1;
        let d = 1;
        let k = 0;
        while(d > 0) {
            console.log("Step "+i);
            k = (phi * i) + 1;
            console.log("k="+k);
            d = k % en;
            console.log("d="+d);
            i = i + 1;
        }
        d=k/en;
        this.setState({e:en,d:d});
    }

    changeEncryptionValue(e){
        e.preventDefault();
        this.setState({envalue: e.target.value});
    }

    changeDecryptionValue(e){
        e.preventDefault();
        this.setState({devalue: e.target.value});
    }

    decrypt(e){
        e.preventDefault();
        if(this.state.d !== "" && this.state.devalue !== ""){
            axios.get('https://cors-anywhere.herokuapp.com/http://api.wolframalpha.com/v1/result?appid=78AE7U-QXE665K7V6&i=' + this.state.devalue + '^' + this.state.d + 'mod'+this.state.n)
                .then(response => {
                    this.setState({decripted: response.data});
                });
        }
    }

    render(){
        let error = "";
        if(this.state.error !== "")
            error=<p className={classes.error}>{this.state.error}</p>;

        let titkositott = "";
        this.state.envalue.split("").forEach(character => {
            let n = character.charCodeAt();
            titkositott += n.toString();
        });
        console.log(titkositott);
        titkositott = Math.pow(titkositott,parseInt(this.state.e)) % this.state.n;


        return (
            <>
                <h2>Key generation</h2>
                {error}
                <label className={classes.label}>p: <input type="number" onChange={e => this.primeChange(e,"p")} value={this.state.p}/></label>
                <label className={classes.label}>q: <input type="number" onChange={e => this.primeChange(e,"q")} value={this.state.q}/></label>
                <label className={classes.label}><input type="submit" value="Prímszámok generálása" onClick={e => this.generatePrime(e)}/></label>
                <label className={classes.label}><input type="submit" value="Nagy prímszámok generálása" onClick={e => this.generateLargePrime(e)}/></label>
                <label className={classes.label}><input type="submit" value="Kulcs generálása" onClick={e => this.generateKey(e)}/></label>
                <h3>Kulcs</h3>
                <label className={classes.label}>n: <input type="number" value={this.state.n} disabled/></label>
                <label className={classes.label}>e: <input type="number" value={this.state.e} disabled/></label>
                <label className={classes.label}>d: <input type="number" value={this.state.d} disabled/></label>

                <h2>Encode</h2>
                <label className={classes.label}>Titkosítandó szöveg: <input value={this.state.envalue} onChange={e => this.changeEncryptionValue(e)} type="text"/></label>
                <label className={classes.label}>Titkosított szöveg: <input type="text" value={titkositott} disabled/></label>

                <h2>Decode</h2>
                <label className={classes.label}>Titkosított szöveg: <input value={this.state.devalue} onChange={e => this.changeDecryptionValue(e)} type="text"/></label>
                <label className={classes.label}><input type="submit" value="Decrypt" onClick={e => this.decrypt(e)}/></label>
                <label className={classes.label}>Eredeti szöveg: <input type="text" value={this.state.decripted} disabled/></label>
            </>
        );
    }
}