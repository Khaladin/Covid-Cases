import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export function DateSelector({ date, dateFunction }) {
  return(
    <div>
      <DatePicker 
        selected={date}
        onChange={date => dateFunction(date)}
        minDate={new Date('2020-03-01')}
        maxDate={new Date('2020-06-20')}
        dateFormat="yyyy/MM/dd"
      />
    </div>
  );
}
