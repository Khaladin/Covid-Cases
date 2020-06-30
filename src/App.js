import React, { useState } from 'react';
import Papa from 'papaparse';

import SunBurst from './SunBurst/SunBurst';
import './App.css';

function App() {
  const [covidValues, setCovidValues] = useState();
  const [filteredValues, setFilteredValues] = useState([]);

  let filterData = (data) => {
    let stateValues = [];
    data.forEach(item => {
      if (item.state === 'Florida' && item.county === 'Hillsborough') {
        stateValues.push(item);
      }
    })
    setFilteredValues(stateValues);
  }

  // CREATE ADDITIVE LIST FOR COUNTIES IN FLORIDA TO DISPLAY

  // ADJUST DATA TO BE BASED ON A CERTAIN DAY USING REACT DATE PICKER, OR PARSE THROUGH AVAILABLE DATA

  //SELECT OVER ALL STATE NUMBERS AND COMPARE STATES

  // ADD IN STATE SELECT INPUT

  let updateData = ({data}) => {
    filterData(data);
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

      <button onClick={papaParse}>
        Papa Parse button
      </button>
      <div>
        <SunBurst
          pieData={filteredValues}
          innerRadius={50}
          outterRadius={0}
        />
      </div>
    </div>
  );
}

export default App;
