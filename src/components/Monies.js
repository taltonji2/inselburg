import React from "react"
import styled from "styled-components"
import { useState, useEffect } from "react"
import {BarChart} from "./charts/BarChart";
import Card from './Card';
import MoniesForm from './MoniesForm';

const Monies = () => {
    const [moniesData, setMoniesData] = useState({
        financials: {
            income: 0,
            state: '',
            zip: '',
            filingStatus: false
        },
    })
    
    const handleStateUpdate = (key, value) => {
        setMoniesData(prevState => ({
        ...prevState,
        [key]: value
        }))
    }

    const handleInputChange = (event, key, nestedKey) => {
        const value = event.target.value;
        if (nestedKey) {
          handleStateUpdate(key, { ...moniesData[key], [nestedKey]: value })
          console.log(value)
        } else {
          handleStateUpdate(key, value)
        }
    }
/* 
    Feature estimate take home pay
    Income
    Location (state, zip)
    Filing Status (single, married)
    
    Advanced
    401k contribution
    IRA contribution
    Itemized Deductions
    Number of state personal exemptions

    https://smartasset.com/taxes/new-jersey-tax-calculator#hEziFgNLPe

    for tax bracket data
    https://taxfoundation.org/state-income-tax-rates-2022/ 
    
*/
    return (
        <>
          <Card title='Monies' body={
             <MoniesForm 
                 formData={moniesData} 
                 onChange={handleInputChange}
             />
           } 
          />
          <Card title='Graph' body={<BarChart/>} primary/>
        </>
    )
}

export default Monies