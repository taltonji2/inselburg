import React, { useEffect, useState, useRef } from "react"
import Card from './Card';
import MoniesForm from './MoniesForm';
import Chart from 'chart.js/auto';
import { Bar, defaults } from 'react-chartjs-2';
import '../styles/styles.css'

var data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [{
    label: "Dataset #1",
    backgroundColor: "rgba(255,99,132,0.2)",
    borderColor: "rgba(255,99,132,1)",
    borderWidth: 2,
    hoverBackgroundColor: "rgba(255,99,132,0.4)",
    hoverBorderColor: "rgba(255,99,132,1)",
    data: [65, 59, 20, 81, 56, 55, 40],
  }]
};

var options = {
  maintainAspectRatio: true,
  scales: {
    y: {
      stacked: true,
      grid: {
        display: true,
        color: "rgba(255,99,132,0.2)"
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
};

new Chart('chart', {
  type: 'bar',
  options: options,
  data: data
});

const Monies = () => {

  const [moniesData, setMoniesData] = useState({
      financials: {
        afterTaxIncome: 0,  
        income: 90000,
        state: 'alabama',
        filingStatus: false,
      },
      expenses: {
        food: 0,
        rent: 0,
        mortgage: 0,
        autoLoan: 0,
      },
      effectiveStateTaxRate: 0,
      effectiveFedTaxRate: 0,
      fedEffectiveTaxTable: [],
      stateEffectiveTaxTable: [],
      filingStatus: "single"
  })

  const options = {
      responsive: true,
      maintainAspectRatio: false,
      width: '30px',
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
    backgroundColor: 'rgba(255, 213, 0, 0.75)',
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
  add married filing info
  then change chart display to have navigation for different chart breakdown
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
          <div className="financial-results-grid">
            <div className="financial-results-grid-item">
              <label>Federal Total Tax </label>
              <p  className="yellow"> {"$" + moniesData.fedTotalTax}</p>
            </div>
            <div className="financial-results-grid-item">
              <label> State Total Tax </label>
              <p  className="orange"> {"$" + moniesData.stateTotalTax}</p>
            </div>
            <div className="financial-results-grid-item">
              <label>Net Income </label>
              <p  className="green"> {"$" + moniesData.netIncome}</p>
            </div>
            <div className="financial-results-grid-item">
              <label>Food </label>
              <p  className="red"> {"$" + moniesData.expenses.food}</p>
            </div>
            <div className="financial-results-grid-item">
              <label>Rent </label>
              <p  className="red"> {"$" + moniesData.expenses.rent}</p>
            </div>
            <div className="financial-results-grid-item">
              <label>Mortgage </label>
              <p  className="red"> {"$" + moniesData.expenses.mortgage}</p>
            </div>
            <div className="financial-results-grid-item">
              <label>Auto Loan </label>        
              <p  className="red"> {"$" + moniesData.expenses.autoLoan}</p>
            </div>

          </div>
          <div className="chart-container">
            <Card title='' body={<Bar data={totalEffectiveTaxData} options={options} />} />
            <Card title='' body={<Bar data={stateEffectiveTaxData} options={options} />} />
          </div>
          
            
          
      </div>
    </div>
  )
}

export default Monies