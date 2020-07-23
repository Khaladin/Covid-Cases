import React, { useState } from 'react';
import Select from 'react-select';

function StateSelector({stateList, setSelectedState, setSelectedCountys, papaParse}) {
   let handleSelect = (values) => {
    console.log("we now know", values)
    papaParse();
    setSelectedCountys([]);  
    setSelectedState(values)
    
   }
   console.log(stateList);
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