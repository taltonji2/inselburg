import React from "react"
import styled from "styled-components"
import { useState } from "react"
import { stateIncomeTax, federalIncomeTax } from "../data/incometax"


const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`
const TextInput = styled.input`
    display: flex;
    margin-bottom: .568rem;
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
const MoniesForm = ({formData, onChange}) => {

    const [hideFinancials, setIsFinancials] = useState(false)

    const updateFormData = (event, key, nestedKey) => {
        onChange(event, key, nestedKey)
    }

    const handleFinancialsClicked = () => {
        setTimeout(() => {
            setIsFinancials(!hideFinancials)
        }, 100)
    }

    function splitCamelCase(word) {
        return word.replace(/([A-Z])/g, ' $1');
    }

    return (
        <form id='form'> 
            <InputsContainer>
                <div>
                    <ButtonContainer>
                        <Button onClick={handleFinancialsClicked}><label>Financials</label></Button>
                        <div hidden={hideFinancials}>
                        {console.log(formData.financials)}
                        {Object.entries(formData.financials).map(([key, value]) => (
                            <div key={key}>
                                <label>{splitCamelCase(key.charAt(0).toUpperCase() + key.slice(1))}</label>
                                {
                                    (key === "income") && <TextInput
                                    key={key}
                                    type="number"
                                    value={value}
                                    step={1000}
                                    placeholder={value === 0 ? '' : `${key}`}
                                    onChange={event => updateFormData(event, 'financials', key)}
                                    />
                                }
                                {
                                    (key === "state" || key === "zip") && <TextInput
                                    key={key}
                                    type="text"
                                    value={value}
                                    placeholder={value === '' ? `${key}` : value}
                                    onChange={event => updateFormData(event, 'financials', key)}
                                    />
                                }
                                {
                                    (key === "filingStatus") &&
                                    <SelectInput 
                                        id="filingStatus" 
                                        value={formData.filingStatus} 
                                        onChange={event => updateFormData(event, 'financials', key)}
                                    >
                                        <option value={false}>Single</option>
                                        <option value={true}>Married</option>
                                    </SelectInput>
                                }
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