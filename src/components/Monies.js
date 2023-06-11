import React from "react"
import { useState } from "react"
import Card from './Card';
import MoniesForm from './MoniesForm';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
const { faker } = require('@faker-js/faker');

const Monies = () => {
    const [moniesData, setMoniesData] = useState({
        financials: {
            income: 1000,
            state: 'NJ',
            zip: '07030',
            filingStatus: false
        },
    })

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )
      
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Chart.js Bar Chart',
            },
        },
    }
        
    const labels = ['2023'];
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [moniesData.financials.income],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
    }
      
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

    const updateGraph = () => {

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
          <Card title='Graph' body={<div style={{ width: 575 }}><Bar data={data} options={options} /></div>} primary/>
        </>
    )
}

export default Monies