import React, { useState } from 'react';
import Select from 'react-select';

function CountySelector({stateCounty, setSelectedCountys, selectedCountys}) {
   let handleSelect = (values) => {
    if (values === null) {
      values = [];
    }   
    setSelectedCountys(values)
   }
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