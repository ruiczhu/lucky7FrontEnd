// src/App.js
import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import GlobalStyles from './styles/GlobalStyles';

function App() {
    return (
        <AppContainer>
            <GlobalStyles />
            <Navbar />
            <MainContent>
                <HomePage />
            </MainContent>
        </AppContainer>
    );
}

export default App;

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background: linear-gradient(135deg, #1e1e2f, #3a3a4f); /* Dark Gradient Background */
`;