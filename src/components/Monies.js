import React, { useEffect } from "react"
import { useState } from "react"
import Card from './Card';
import MoniesForm from './FinancialsForm';
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
import '../styles/styles.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)



const Monies = () => {
 
    useEffect(() => {
    })

    const [moniesData, setMoniesData] = useState({
        financials: {
            afterTaxIncome: 0,  
            income: 90000,
            state: 'alabama',
            filingStatus: false,
        },
        effectiveStateTaxRate: 0,
        effectiveFedTaxRate: 0,
        fedEffectiveTaxTable: [],
        stateEffectiveTaxTable: [],
        filingStatus: "single"
    })

    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: '',
            },
        },
    }
    
    let labels = Object.values(moniesData.fedEffectiveTaxTable).map((row) => {return row.bracket});
    const effectiveStateIncomeTax = {
      label: "Tax Bracket",
      data: Object.values(Object.values(moniesData.stateEffectiveTaxTable).map((row) => {return row.totalTax})),
      backgroundColor: 'rgba(360, 100, 0, 0.75)',
    }
    const effectiveFedIncomeTax = {
      label: "Tax Bracket",
      data: Object.values(Object.values(moniesData.fedEffectiveTaxTable).map((row) => {return row.totalTax})),
      backgroundColor: 'rgba(300, 225, 0, 0.75)',
    }
    const totalEffectiveTaxData = {
      labels,
        datasets: [
          effectiveFedIncomeTax,
        ],
    }
    labels = Object.values(moniesData.stateEffectiveTaxTable).map((row) => {return row.bracket});
    const stateEffectiveTaxData = {
      labels,
        datasets: [
          effectiveStateIncomeTax
        ],
    }
      
    const handleStateUpdate = (key, value) => {
        setMoniesData(prevState => ({
        ...prevState,
        [key]: value
        }))
    }

    const handleInputChange = (value, key, nestedKey) => {
        if (nestedKey) {
          handleStateUpdate(key, { ...moniesData[key], [nestedKey]: value })
        } else {
          handleStateUpdate(key, value)
        }
    }


    /* 
    https://smartasset.com/taxes/new-jersey-tax-calculator#hEziFgNLPe
    for tax bracket data
    https://taxfoundation.org/state-income-tax-rates-2022/ 
    */
 
    return (
      <div className="container">
        <div className="card left-card">
          <Card title='Financials' body={
            <MoniesForm 
                formData={moniesData} 
                onChange={handleInputChange}
            />
          }
          />
        </div>
        <div className="card right-card">
            <div className="nav-container">
              <label className="nav-cell"><p> Federal Total Tax : {moniesData.fedTotalTax}</p></label>
              <label className="nav-cell"><p> State Total Tax : {moniesData.stateTotalTax}</p></label>
              <label className="nav-cell"><p> Net Income : {moniesData.netIncome}</p></label>
            </div>
            <Card title='' body={<Bar data={totalEffectiveTaxData} options={options} />} />
            <Card title='' body={<Bar data={stateEffectiveTaxData} options={options} />} />
        </div>
      </div>
    )
}

export default Monies