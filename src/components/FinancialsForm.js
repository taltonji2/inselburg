import React, { useEffect } from "react"
import { useState } from "react"
import { stateIncomeTax, federalIncomeTax } from "../data/incometax"
import { states } from "../data/states"


const MoniesForm = ({formData, onChange}) => {

    useEffect(() => {
        calculateAfterTaxIncome()
    }, [formData.financials.income, formData.financials.state])

    const [isFinancials, setIsFinancials] = useState(false)

    const updateFormData = (value, key, nestedKey) => {
        onChange(value, key, nestedKey)
    }

    const handleFinancialsClicked = () => {
        setTimeout(() => {
            setIsFinancials(!isFinancials)
        }, 100)
    }

    const splitCamelCase = (word) => {
        return word.replace(/([A-Z])/g, ' $1');
    }

    const removeSpacesAndCapitalize = (str) => {
        var words = str.split(' ');
        
        for (var i = 1; i < words.length; i++) {
          var word = words[i];
          word = word.charAt(0).toUpperCase() + word.slice(1);
          words[i] = word;
        }
      
        var result = words.join('');
      
        return result;
    }

    const firstLetterCapitalization = (str) => {
        var words = str.split(' ');
  
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            
            if (word.length > 0) {
            var capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
            words[i] = capitalizedWord;
            }
        }

        var result = words.join(' ');

        return result;
    }

    const reverseCapitalization = (str) => {
        var words = str.split(' ');
      
        for (var i = 0; i < words.length; i++) {
          var word = words[i];
          
          if (word.length > 0) {
            var reversedWord = word.charAt(0).toLowerCase() + word.slice(1);
            words[i] = reversedWord;
          }
        }
      
        var result = words.join(' ');
        return result;
      }

    const calculateAfterTaxIncome = (inputState) => {
        const income = formData.financials.income;
        const fedRates = federalIncomeTax.rates
        const fedBrackets = federalIncomeTax.singleFilerBrackets
        const state = inputState ? removeSpacesAndCapitalize(inputState) : removeSpacesAndCapitalize(formData.financials.state)
        const stateRates = stateIncomeTax[state].singleFiler.rates
        const stateBrackets = stateIncomeTax[state].singleFiler.brackets
        let rate = 0
        let prevBracket = 0
        let totalTax = 0
        let amountSubjectToTax = 0
        let fedEffectiveTaxTable = []
        let stateEffectiveTaxTable = []

        for (let i=0; i<fedBrackets.length; i++){
            if (amountSubjectToTax < income){
                const currentSubjectToTax = Math.min(fedBrackets[i] - prevBracket, income - amountSubjectToTax)
                amountSubjectToTax += Math.min(fedBrackets[i] - prevBracket, income - amountSubjectToTax)
                totalTax += currentSubjectToTax * (fedRates[i] * .01)       
                const row = {
                    "totalTax": totalTax,
                    "currentSubjectToTax": currentSubjectToTax,
                    "bracket": prevBracket + " - " + fedBrackets[i],
                    "rate": (fedRates[i] * .01),
                    "tax": currentSubjectToTax * (fedRates[i] * .01)
                }     
                fedEffectiveTaxTable.push(row)    
                prevBracket = fedBrackets[i]
            }
        }
        const effectiveFedTaxRate = (totalTax / income) * 100
        const fedTotalTax = totalTax
        amountSubjectToTax = 0
        prevBracket = 0
        totalTax = 0
        for (let i=0; i<stateBrackets.length; i++){
            if (amountSubjectToTax < income){
                const currentSubjectToTax = Math.min(stateBrackets[i] - prevBracket, income - amountSubjectToTax)
                amountSubjectToTax += Math.min(stateBrackets[i] - prevBracket, income - amountSubjectToTax)
                totalTax += currentSubjectToTax * (stateRates[i] * .01)              
                const row = {
                    "totalTax": totalTax,
                    "currentSubjectToTax": currentSubjectToTax,
                    "bracket": prevBracket + " - " + stateBrackets[i],
                    "rate": (stateRates[i] * .01),
                    "tax": currentSubjectToTax * (stateRates[i] * .01)
                }     
                stateEffectiveTaxTable.push(row)    
                prevBracket = stateBrackets[i]
            }
        }
        const stateTotalTax = totalTax
        const effectiveStateTaxRate  = (totalTax / income) * 100
        const netIncome = income - fedTotalTax - stateTotalTax 
        updateFormData(effectiveStateTaxRate, "effectiveStateTaxRate")
        updateFormData(effectiveFedTaxRate, "effectiveFedTaxRate")
        updateFormData(fedEffectiveTaxTable, "fedEffectiveTaxTable")
        updateFormData(stateEffectiveTaxTable, "stateEffectiveTaxTable")
        updateFormData(fedTotalTax, "fedTotalTax")
        updateFormData(stateTotalTax, "stateTotalTax")
        updateFormData(netIncome, "netIncome")
    }
    return (
        <div>
        {console.log("data", formData)}
        <button onClick={handleFinancialsClicked}><label>Financials</label></button>
        <div hidden={isFinancials}>
        {Object.entries(formData.financials).map(([key, value]) => (
            <div key={key}>
                {
                    (key === "income") && <div>
                    <label>{splitCamelCase(key.charAt(0).toUpperCase() + key.slice(1))}</label>
                    <input
                    key={key}
                    type="number"
                    value={value}
                    step={1000}
                    placeholder={value === 0 ? '' : `${key}`}
                    onChange={event => updateFormData(event.target.value, 'financials', key)}
                    />
                    </div>
                }
                {
                    (key === "state") &&
                    <div>
                        <label>{splitCamelCase(key.charAt(0).toUpperCase() + key.slice(1))}</label>
                        <select 
                        id="state" 
                        value={formData.state} 
                        onChange={event => updateFormData(reverseCapitalization(event.target.value), 'financials', key)}
                        >
                        {states.map((name) => (
                            <option key={name}>{firstLetterCapitalization(name)}</option>
                        ))}
                        </select>
                    </div>                                  
                }
                {
                    (key === "filingStatus") && 
                    <div>
                    <label>{splitCamelCase(key.charAt(0).toUpperCase() + key.slice(1))}</label>
                    <select 
                        id="filingStatus" 
                        value={formData.filingStatus} 
                        onChange={event => updateFormData(event.target.value, key)}
                    >
                        <option value={"single"}>Single</option>
                        <option value={"married"}>Married</option>
                    </select>
                    </div>
                }
                
            </div>
        ))}
        </div>
    </div>          
    )
}

export default MoniesForm