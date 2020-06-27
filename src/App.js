import React, { useState } from 'react';
import './App.css';
// import CovidStateValues from './csv/CovidStateValues.csv';

import SubBurst from './SunBurst/SunBurst';

import CsvParse from '@vtex/react-csv-parse'
import SunBurst from './SunBurst/SunBurst';

function App() {
  const [floridaValues, setFloridaValues] = useState([]);

const results = [];
  let csvFunc = (data) => {
    let stateValues = [];
    data.forEach(item => {
      if (item.state === 'Florida' && item.county === 'Hillsborough' && item.cases <= 100) {
        stateValues.push(item);
      }
    })
    setFloridaValues(stateValues);
  }
  const keys = [
    "date",
    "county",
    "state",
    "fips",
    "cases",
    "deaths"
  ]
  return (
    <div className="App">
      <header className="App-header">
        Covid visualization app
      </header>
      <CsvParse
        keys={keys}
        onDataUploaded={csvFunc}
        render={onChange => <input type="file" onChange={onChange} />}
      >
      </CsvParse>
      <section>
        <button onClick={() => csvFunc()}>
          Parse CSV
        </button>
      </section>
      <div>
        <SunBurst
          pieData={floridaValues}
          innerRadius={50}
          outterRadius={0}
        />
      </div>
    </div>
  );
}

export default App;
