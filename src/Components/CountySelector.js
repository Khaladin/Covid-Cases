import React, { useState } from 'react';
import Select from 'react-select';

function CountySelector({stateCounty, setSelectedCountys, selectedCountys}) {
   let handleSelect = (values) => {
    console.log("we now know", values)
    if (values === null) {
      values = [];
    }   
    setSelectedCountys(values)
   }
   console.log(stateCounty)
    return( 
    <Select
      value={selectedCountys}
      isMulti
      name="County"
      options={stateCounty}
      onChange={handleSelect}
      className="basic-multi-select"
      classNamePrefix="select"
    />
   );
};

export default CountySelector;