import React from "react"
import styled from "styled-components"
import { useState, useEffect } from "react"


const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`
const Graph = styled.div`
    display: flex;
    flex-direction: column;
`

const NumberInput = styled.input`
    display: flex;
    margin-bottom: .268rem;
`

const SelectInput = styled.select`
    display: flex;
    margin-bottom: .568rem;
`
const ButtonContainer = styled.div`
    margin-bottom: .45rem;
`

const Button = styled.button`
    margin-bottom: .668rem;
`
const MoniesForm = () => {
    const [userData, setUserData] = useState({
        assets: {
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
        },
        income: 0,
        financialGoal: '',
        riskTolerance: '',

    })

    const [isAssets, setIsAssets] = useState(false)
    const [isIncome, setIsIncome] = useState(false)

    const handleStateUpdate = (key, value) => {
        setUserData(prevState => ({
        ...prevState,
        [key]: value
        }));
    };

    const handleInputChange = (event, key, nestedKey) => {
        const value = event.target.value;
        if (nestedKey) {
          handleStateUpdate(key, { ...userData[key], [nestedKey]: value });
        } else {
          handleStateUpdate(key, value);
        }
    };

    const handleAssetsClicked = () => {
        setTimeout(() => {
            setIsAssets(!isAssets)
        }, 100)
    }

    const handleIncomeClicked = () => {
        setTimeout(() => {
            setIsIncome(!isIncome)
        }, 100)
    }

    const calculateData = () => {
        const data = []

    }

    return (
        <form id='form'>
            <InputsContainer>
                <div>
                    <div>
                        <label htmlFor="financialGoal">Select Financial Goal:</label>
                        <SelectInput id="financialGoal" value={userData.financialGoal} onChange={event => handleInputChange(event, 'financialGoal')}>
                            <option value="emergencyFund">Emergency Fund</option>
                            <option value="retirementSavings">Retirement Savings</option>
                            <option value="debtRepayment">Debt Repayment</option>
                        </SelectInput>
                    </div>
                    <div>
                        <label htmlFor="riskTolerance">Select Risk Tolerance:</label>
                        <SelectInput id="riskTolerance" value={userData.riskTolerance} onChange={event => handleInputChange(event, 'riskTolerance')}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </SelectInput>
                    </div>

                    <ButtonContainer>
                        <Button onClick={handleIncomeClicked}><label>Income</label></Button>
                        <div hidden={isIncome}>
                        <NumberInput
                                type="number"
                                value={userData.income}
                                placeholder={userData.income === 0 ? '' : `${userData.income}`}
                                onChange={event => handleInputChange(event, 'income')}
                        />
                        </div>
                    </ButtonContainer>
                    <ButtonContainer>
                        <Button onClick={handleAssetsClicked}><label>Assets</label></Button>
                        <div hidden={isAssets}>
                        {/* Button  that unhides the bellow form*/}
                        {Object.entries(userData.assets).map(([key, value]) => (
                            <div key={key}>
                                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                <NumberInput
                                key={key}
                                type="number"
                                value={value}
                                placeholder={value === 0 ? '' : `${key}`}
                                onChange={event => handleInputChange(event, 'assets', key)}
                                />
                            </div>
                        ))}
                        </div>
                    </ButtonContainer>
                </div>
            </InputsContainer>          
        </form>
    )
}

export default MoniesForm