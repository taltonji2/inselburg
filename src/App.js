import Card from './components/Card';
import MoniesForm from './components/MoniesForm';
import styled, {createGlobalStyle} from 'styled-components';
import {BarChart} from "./components/charts/BarChart";
import React, {useState} from 'react';

const GlobalStyle = createGlobalStyle`
 

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

function App() {

  return (
    <>
      <GlobalStyle/>
      <Container>
        <Card title='Monies' body={<MoniesForm/>} />
        <Card title='Graph' body={<BarChart/>} primary/>
      </Container>
    </>
 
  );
}

export default App;
