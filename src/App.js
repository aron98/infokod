import React from 'react';
import './App.css';
import {ShiftEncode,ShiftDecode} from './components/Shift/Shift';

function App() {
  return (
    <div className="App">
      <h1>Shift</h1>
      <p>Nem 0-25 között tettem eltolhatóvá, hanem az egész számok halmazából akármelyik szám kiválasztható, és az ASCII tábla 32-126 intervallumán engedtem meg az eltolást, tehát a kód periodikus.</p>
      <h2>Encode</h2>
      <ShiftEncode/>
      <h2>Decode</h2>
      <ShiftDecode/>
    </div>
  );
}

export default App;
