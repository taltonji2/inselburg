import React from "react"
import styled from "styled-components"
import { useState, useEffect } from "react"
import {BarChart} from "./charts/BarChart";
import Card from './Card';
import MoniesForm from './MoniesForm';

const Monies = () => {
    const [moniesData, setMoniesData] = useState({
        financials: {
            income: 45000,
            state: '',
            zip: '',
            filingStatus: false
        },
    })
    
/* 
    Feature estimate take home pay
    Income
    Location (zip)
    filing Status
    
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
                data={moniesData} 
                setData={setMoniesData}
            />
          } 
          />
         <Card title='Graph' body={<BarChart/>} primary/>
        </>
    )
}

export default Monies