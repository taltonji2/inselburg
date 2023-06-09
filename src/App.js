
import Monies from './components/Monies'
import styled, {createGlobalStyle} from 'styled-components';

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
       <Monies/>
      </Container>
    </>
 
  );
}

export default App;
