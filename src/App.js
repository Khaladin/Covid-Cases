import React, { useState } from 'react';
import Papa from 'papaparse';
import moment from 'moment';

import SunBurst from './SunBurst/SunBurst';
import { DateSelector } from './Components/DateSelector'
import CountySelector from './Components/CountySelector'
import './App.css';
import StateSelector from './Components/StateSelector';

function App() {
  // const [covidValues, setCovidValues] = useState();
  const [filteredValues, setFilteredValues] = useState([]);
  const [date, setDate] = useState(new Date('2020-03-02'));
  const [formatedDate, setFormatedDate] = useState('2020-03-01');
  const [stateCountys, setStateCountys] = useState({value:"Hillsborough", label:"Hillsborough"});
  const [selectedCountys, setSelectedCountys] = useState([{value:"Hillsborough", label:"Hillsborough"}]);
  const [stateList, setStateList] = useState({value:"Florida", label:"Florida"})
  const [selectedState, setSelectedState] = useState([{value:"Florida", label:"Florida"}]);

  let filterData = (data) => {
    let graphValues = [];
    let stateCounty = [];
    let formatedSelectValues = [];
    let stateArr = [];
    let formatedStateList = [];
    data.forEach(item => {
      if (!stateArr.includes(item.state)) {
        stateArr.push(item.state);
        formatedStateList.push({value:item.state, label:item.state})
      }
      if (item.state === selectedState[0].value && !stateCounty.includes(item.county)) {
          stateCounty.push(item.county);
          formatedSelectValues.push({value:item.county, label:item.county})     
      }
      if (item.state === selectedState[0].value && item.date == formatedDate) {
        selectedCountys.forEach(county => {
          if (item.county === county.value) {
            graphValues.push(item);
          }
        })
      }
    })
    
    setFilteredValues(graphValues);

    formatedSelectValues.sort(function (a, b) {
      return a.value.localeCompare(b.value);
    });

    setStateCountys(formatedSelectValues);

    formatedStateList = formatedStateList.sort(function (a, b) {
      return a.value.localeCompare(b.value);
    });
    setStateList(formatedStateList);
    

  }

  let dateFunction = (date) => {
    setDate(date);
    setFormatedDate(moment(date).format('YYYY-MM-DD').toString());
  }

  let updateData = ({data}) => {
    filterData(data);
  }

  let parseCountyList = ({data}) => {
    let selectedCountyList = [];
    data.forEach( item => {
      //if (!selectedCountyList.includes(item.county)) {
        //selectedCountyList.push(item.county)
      }
    })
    return selectedCountyList;
  }
  
  let papaParse = (completeFunction) => {
    const dataFilePath = require('./csv/CovidStateValues.csv');
    Papa.parse(dataFilePath, {
      download: true,
      header: true,
      delimiter: ",",
      newline: ",",
      complete: completeFunction
    })
  }

  return (
    <div className="App">
      <div>
        Covid visualization app
      </div>
      <DateSelector
        date={date}
        dateFunction={dateFunction}
      />
      <div>
        {formatedDate}
      </div>
      <div>
        <StateSelector
          stateList={stateList}
          setSelectedCountys={setSelectedCountys}
          setSelectedState={setSelectedState}
          //papaParse={papaParse(parseCountyList)}
        />
      </div>
      <div>
        <CountySelector
        stateCounty={stateCountys}
        selectedCountys={selectedCountys}
        setSelectedCountys={setSelectedCountys}
        />
      </div>
      <button onClick={papaParse(updateData)}>
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
