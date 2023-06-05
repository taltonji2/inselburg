import logo from './logo.svg';
import Card from './components/Card';
import MoniesForm from './components/MoniesForm';
import styled, {createGlobalStyle} from 'styled-components';
import BarChart from "./components/charts/BarChart";
import React, {useState} from 'react';
import { UserData } from "./Data";

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
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Monies",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });


  return (
    <>
      <GlobalStyle/>
      <Container>
        <Card title='Monies' body={<MoniesForm/>}/>
        <Card title='Graph' width={'37.08rem'} body={<BarChart chartData={userData} />}/>
      </Container>
    </>
 
  );
}

export default App;
