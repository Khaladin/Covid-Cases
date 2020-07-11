import React, { useState } from 'react';
import Select from 'react-select';



function CountySelector({stateCounty}) {
   return( 
    <Select
      defaultValue={stateCounty}
      isMulti
      name="County"
      options={stateCounty}
      className="basic-multi-select"
      classNamePrefix="select"
    />
   );
};

export default CountySelector;