import React, { useState } from 'react';
import Papa from 'papaparse';
import moment from 'moment';
import Select from 'react-select';

import SunBurst from './SunBurst/SunBurst';
import { DateSelector } from './Components/DateSelector'
import Menus from './Components/Menus'
import './App.css';

function App() {
  const [covidValues, setCovidValues] = useState();
  const [filteredValues, setFilteredValues] = useState([]);
  const [date, setDate] = useState(new Date('2020-03-02'));
  const [formatedDate, setFormatedDate] = useState('2020-03-01');
  const [floridaCountys, setFloridaCountys] = useState({value:"Hillsborough", label:"Hillsborough"});
  // const [endDate, setEndDate] = useState('2020-06-15');

  let filterData = (data) => {
    let stateValues = [];
    let stateCounty = [];
    let formatedSelectValues = [];
        data.forEach(item => {
      // && item.county === 'Hillsborough'
      if (item.state === 'Florida' && item.date == formatedDate) {
        stateValues.push(item);
      }
      if (item.state === 'Florida' && !stateCounty.includes(item.county)) {
        stateCounty.push(item.county);
        formatedSelectValues.push({value:item.county, label:item.county})
      }
    })
    
    setFilteredValues(stateValues);
    formatedSelectValues.sort(function (a, b) {
      return a.value.localeCompare(b.value);
    });
    console.log('whatveryouwant',stateCounty);
    setFloridaCountys(formatedSelectValues);
  }

  let dateFunction = (date) => {
    setDate(date);
    setFormatedDate(moment(date).format('YYYY-MM-DD').toString());
  }

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
      <div>
        Covid visualization app
      </div>
      <DateSelector
        date={date}
        setDate={setDate}
        dateFunction={dateFunction}
      />
      <div>
        {formatedDate}
      </div>
      <div>
        <Menus
        stateCounty={floridaCountys}
        />
      </div>
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
