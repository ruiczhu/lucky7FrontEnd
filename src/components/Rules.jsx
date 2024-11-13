// src/components/Rules.jsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const SectionTitle = styled.h2`
    color: #fff;
    margin-bottom: 20px;
    font-size: 24px;
`;

const RuleList = styled.ul`
    list-style: none;
    padding: 0;
    color: #ddd;
    font-size: 16px;
`;

const RuleItem = styled.li`
    margin-bottom: 15px;
    position: relative;
    padding-left: 25px;

    &:before {
        content: '★'; /* Star icon */
        position: absolute;
        left: 0;
        color: #ff6f61;
    }

    ul {
        margin-top: 10px;
        margin-left: 20px;
    }

    ul li {
        padding-left: 15px;
        position: relative;
        &:before {
            content: '•'; /* Bullet for sub-items */
            position: absolute;
            left: 0;
            color: #ff6f61;
        }
    }
`;

const Rules = () => {
    return (
        <Container>
            <SectionTitle>Lottery Rules</SectionTitle>
            <RuleList>
                <RuleItem>
                    Each lottery ticket consists of a unique 7-digit number.
                </RuleItem>
                <RuleItem>
                    The lottery draw occurs every five minutes.
                </RuleItem>
                <RuleItem>
                    Half of the total ticket sales contribute to the first prize pool.
                </RuleItem>
                <RuleItem>
                    Prizes are distributed based on the number of matching digits with the winning number:
                    <ul>
                        <li>First Prize: Exact match of all 7 digits.</li>
                        <li>Second Prize: 6 matching digits.</li>
                        <li>Third Prize: 5 matching digits.</li>
                        <li>Fourth Prize: 4 matching digits.</li>
                    </ul>
                </RuleItem>
                <RuleItem>
                    In case of multiple winners for the first prize, the prize pool is equally divided among them.
                </RuleItem>
                <RuleItem>
                    Unclaimed prizes roll over to the next lottery draw.
                </RuleItem>
                <RuleItem>
                    The platform owner reserves the right to pause or modify the lottery operations in case of emergencies.
                </RuleItem>
            </RuleList>
        </Container>
    );
};

export default Rules;