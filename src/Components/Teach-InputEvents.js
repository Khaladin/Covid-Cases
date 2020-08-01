import React, { useState } from 'react';
import Papa from 'papaparse';



function StandardInput({ }) {

    const [formValues, setFormValue] = useState({userName:'', password:'', firstName:''})
    const handleChange = (event, propertyName) => {
        setFormValue({
            ...formValues,
            //..formValues is the same as {userName:'', password:''}
            [propertyName]: event.target.value,
            //[propertyName] This is called bracket notation and we use this to pass in Key's in Key: Value Pairs
        })
    }

    return (
        <div>
            <input
              placeholder={"What's in the box"}
              value={formValues.userName}
              //onChange={(event) => setFormValue({userName: event.target.value, password: formValues.password})}
              onChange={(event) => handleChange(event,'userName')} 
            /> 
            <input
                placeholder={"New Text"}
                value={formValues.password}
                //onChange={(event) => setFormValue({password: event.target.value, userName: formValues.userName})}
                onChange={(event) => handleChange(event, 'password')}
            />
            <input
                placeholder={"New Text"}
                value={formValues.firstName}
                //onChange={(event) => setFormValue({password: event.target.value, userName: formValues.userName})}
                onChange={(event) => handleChange(event, 'firstName')}
            />
        </div>
    )
}

export default StandardInput;