import React from 'react';
import './App.css';
import classes from './App.module.css';
import {ShiftEncode, ShiftDecode} from './components/Shift/Shift';
import {MonoalphabetEncode, MonoalphabetDecode} from './components/Monoalphabet/Monoalphabet';

function App() {
  return (
    <div className="App">
      <div className={classes.block}>
        <h1>Shift cipher</h1>
        <p>Nem 0-25 között tettem eltolhatóvá, hanem az egész számok halmazából akármelyik szám kiválasztható, és az ASCII tábla 32-126 intervallumán engedtem meg az eltolást, tehát a kód periodikus.</p>
        <h2>Encode</h2>
        <ShiftEncode/>
        <h2>Decode</h2>
        <ShiftDecode/>
      </div>
      <div className={classes.block}>
        <h1>Monoalphabetic cipher</h1>
        <p>Szintén kiterjesztettem a 32-126 intervallumra a titkosítást.</p>
        <h2>Encode</h2>
        <MonoalphabetEncode/>
        <h2>Decode</h2>
        <MonoalphabetDecode/>
      </div>
      <div className={classes.block}>
        <h1>RSA cipher</h1>
        <h2>Encode</h2>

        <h2>Decode</h2>

      </div>
    </div>
  );
}

export default App;
