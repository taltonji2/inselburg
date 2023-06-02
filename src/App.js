import logo from './logo.svg';
import Card from './components/Card';
import MoniesForm from './components/MoniesForm';
import styled, {createGlobalStyle} from 'styled-components';

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
        <Card title='Monies' body='how much is in the piggie'/>
      </Container>
    </>
 
  );
}

export default App;
