import React from "react"
import styled from "styled-components"
import { useState, useEffect } from "react"

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    margin-bottom: 10px;
`
const NumberInput = styled.input`
    display: flex;
    margin-bottom: .268rem;
`

const SelectInput = styled.select`
    display: flex;
    margin-bottom: .568rem;
`

const MoniesForm = () => {

    const [assets, setAssets] = useState({
        cash: 0,
        stocks: 0,
        bonds: 0,
        mutualfunds: 0,
        etf: 0,
        realestate: 0,
        retirement: 0,
        commodities: 0,
        derivatives: 0,
        cryptocurrency: 0,
    })

    const [income, setIncome] = useState(0)
    const [financialGoal, setFinancialGoal] = useState('')
    const [riskTolerance, setRiskTolerance] = useState('')

    const [isAssets, setIsAssets] = useState(false)

    const handleAssetChange = (event, key) => {
        const value = event.target.value
        console.log(value)
        setAssets(prevState => ({
            ...prevState, 
            [key]: value
        }))

    }

    const handleIncomeChange = (event) => {
        const value = event.target.value
        console.log(value)
        setIncome(value)
    }

    const handleGoalChange = (event) => {
        const value = event.target.value
        console.log(value)
        setFinancialGoal(value)
    }

    const handleRiskChange = (event) => {
        const value = event.target.value
        console.log(value)
        setRiskTolerance(value)
    }

    const handleAssetsClicked = () => {
        setTimeout(() => {
            setIsAssets(!isAssets)
        }, 100)
    }

    return (
        <form id='form'>
            <InputsContainer>
            <div>
                <label>Income:</label>
                <NumberInput
                        type="number"
                        value={income}
                        placeholder={income === 0 ? '' : `${income}`}
                        onChange={handleIncomeChange}
                />
            </div>

            <div>
                <button onClick={handleAssetsClicked}><label>Assets</label></button>
                <div hidden={isAssets}>
                {/* Button  that unhides the bellow form*/}
                {Object.entries(assets).map(([key, value]) => (
                    <div key={key}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        <NumberInput
                        key={key}
                        type="number"
                        value={value}
                        placeholder={value === 0 ? '' : `${key}`}
                        onChange={(event) => handleAssetChange(event, key)}
                        />
                    </div>
                ))}
                </div>
            </div>

            <div>
                <label htmlFor="financialGoal">Select Financial Goal:</label>
                <SelectInput id="financialGoal" value={financialGoal} onChange={handleGoalChange}>
                    <option value="emergencyFund">Emergency Fund</option>
                    <option value="retirementSavings">Retirement Savings</option>
                    <option value="debtRepayment">Debt Repayment</option>
                </SelectInput>
                {financialGoal && (
                    <p>Selected financial goal: {financialGoal}</p>
                )}
            </div>

            <div>
                <label htmlFor="riskTolerance">Select Risk Tolerance:</label>
                <SelectInput id="riskTolerance" value={riskTolerance} onChange={handleRiskChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">high</option>
                </SelectInput>
                {riskTolerance && (
                    <p>Selected risk tolerance: {riskTolerance}</p>
                )}
            </div>

            </InputsContainer>          
        </form>
    )
}

export default MoniesForm