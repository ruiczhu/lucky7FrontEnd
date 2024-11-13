// src/components/HomePage.jsx
import React from 'react';
import styled from 'styled-components';
import PurchaseTickets from './PurchaseTickets';
import MyPurchaseHistory from './MyPurchaseHistory';
import AllLotteryResults from './AllLotteryResults';
import Rules from './Rules';


const HomePage = () => {
    return (
        <Container>
            <Section>
                <PurchaseTickets />
            </Section>
            <Section>
                <MyPurchaseHistory />
            </Section>
            <Section>
                <AllLotteryResults />
            </Section>
            <Section>
                <Rules />
            </Section>
        </Container>
    );
};

export default HomePage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px; /* Space between sections */
`;

const Section = styled.div`
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;