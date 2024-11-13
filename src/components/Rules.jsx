// src/components/Rules.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: #3a3a4f;
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const RuleList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RuleItem = styled.li`
  margin-bottom: 15px;
  padding-left: 20px;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #4e54c8;
  }
`;

const Rules = () => {
    return (
        <Container>
            <SectionTitle>Lottery Rules</SectionTitle>
            <RuleList>
                <RuleItem>Each lottery ticket consists of a unique 7-digit number.</RuleItem>
                <RuleItem>The lottery draw occurs every five minutes.</RuleItem>
                <RuleItem>Half of the total ticket sales contribute to the first prize pool.</RuleItem>
                <RuleItem>
                    Prizes are distributed based on the number of matching digits with the winning number:
                    <ul>
                        <RuleItem>First Prize: Exact match of all 7 digits.</RuleItem>
                        <RuleItem>Second Prize: 6 matching digits.</RuleItem>
                        <RuleItem>Third Prize: 5 matching digits.</RuleItem>
                        <RuleItem>Fourth Prize: 4 matching digits.</RuleItem>
                    </ul>
                </RuleItem>
                <RuleItem>
                    In case of multiple winners for the first prize, the prize pool is equally divided among them.
                </RuleItem>
                <RuleItem>Unclaimed prizes roll over to the next lottery draw.</RuleItem>
                <RuleItem>
                    The platform owner reserves the right to pause or modify the lottery operations in case of
                    emergencies.
                </RuleItem>
            </RuleList>
        </Container>
    );
};

export default Rules;