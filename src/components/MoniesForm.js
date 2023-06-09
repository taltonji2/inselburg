import React from "react"
import styled from "styled-components"
import { useState, useEffect } from "react"


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
const MoniesForm = ({data, setData}) => {
    const [hideFinancials, setIsFinancials] = useState(false)

    const handleStateUpdate = (key, value) => {
        setData(prevState => ({
        ...prevState,
        [key]: value
        }))
    }

    const handleInputChange = (event, key, nestedKey) => {
        const value = event.target.value;
        if (nestedKey) {
          handleStateUpdate(key, { ...data[key], [nestedKey]: value })
          console.log(value)
        } else {
          handleStateUpdate(key, value)
        }
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
                        {Object.entries(data.financials).map(([key, value]) => (
                            <div key={key}>
                                <label>{splitCamelCase(key.charAt(0).toUpperCase() + key.slice(1))}</label>
                                {
                                    (key == "income") && <TextInput
                                    key={key}
                                    type="number"
                                    value={value}
                                    placeholder={value === 0 ? '' : `${key}`}
                                    onChange={event => handleInputChange(event, 'financials', key)}
                                    />
                                }
                                {
                                    (key == "state" || key == "zip") && <TextInput
                                    key={key}
                                    type="text"
                                    value={value}
                                    placeholder={value === '' ? `${key}` : value}
                                    onChange={event => handleInputChange(event, 'financials', key)}
                                    />
                                }
                                {
                                    (key == "filingStatus") &&
                                    <SelectInput 
                                        id="filingStatus" 
                                        value={data.filingStatus} 
                                        onChange={event => handleInputChange(event, 'financials', key)}
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