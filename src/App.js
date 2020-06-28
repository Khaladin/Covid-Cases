import React, { useState } from 'react';
import './App.css';
// import CovidStateValues from './csv/CovidStateValues.csv';

import Papa from 'papaparse';

import SubBurst from './SunBurst/SunBurst';

import CsvParse from '@vtex/react-csv-parse'
import SunBurst from './SunBurst/SunBurst';

function App() {
  const [covidValues, setCovidValues] = useState();
  const [floridaValues, setFloridaValues] = useState([]);


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
  ];

  let updateData = ({data}) => {
    csvFunc(data);
    
    setCovidValues(data);
  }

  
  let papaParse = () => {
    const dataFilePath = require('./csv/CovidStateValues.csv');
    Papa.parse(dataFilePath, {
      download: true,
      header: true,
      delimiter: ",",
      newline: ",",
      complete: updateData
    })
  }

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
      <button onClick={papaParse}>
        Papa Parse button
      </button>
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
