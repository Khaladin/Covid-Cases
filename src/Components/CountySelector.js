import React, { useState } from 'react';
import Select from 'react-select';

function CountySelector({stateCounty, setSelectedCountys}) {
   let handleSelect = (values) => {
    console.log("we now know", values)   
    setSelectedCountys(values)
   }
    return( 
    <Select
      defaultValue={stateCounty}
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