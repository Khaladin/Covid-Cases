import React, { useState } from 'react';
import Select from 'react-select';

function StateSelector({stateList, setSelectedState, setStateCountys, papaParse, setSelectedCountys}) {
   let handleSelect = (values) => {
    let handleData = (papaParseData) => {
      let countyArr = [];
      let formatedCountyArr = []
      papaParseData.data.forEach(item => {
        if (values.value === item.state) {
          if (!countyArr.includes(item.county)) {
            formatedCountyArr.push({value: item.county, label: item.county})
            countyArr.push(item.county)
          }
        }
      })
      setStateCountys(formatedCountyArr)
    }
    papaParse(handleData)
    setSelectedState(values)
    setSelectedCountys([])
    
   }
    return( 
    <Select
      defaultValue={stateList}
      name="State"
      options={stateList}
      onChange={handleSelect}
      className="basic-multi-select"
      classNamePrefix="select"
    />
   );
};

export default StateSelector;