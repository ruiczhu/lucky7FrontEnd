// src/components/LotteryNumberPicker.jsx
import React from 'react';
import styled from 'styled-components';

const PickerContainer = styled.div`
    display: flex;
    gap: 15px;
`;

const DigitPicker = styled.select`
    width: 60px;
    height: 60px;
    padding: 10px;
    background: #2c2c3c;
    color: #fff;
    border: 2px solid #4e54c8;
    border-radius: 10px;
    font-size: 24px;
    text-align: center;
    cursor: pointer;
    transition: border 0.3s, transform 0.2s;

    &:hover {
        border-color: #ff6f61;
        transform: scale(1.05);
    }

    &:focus {
        outline: none;
        border-color: #ff6f61;
    }

    option {
        background: #2c2c3c;
        color: #fff;
        padding: 10px;
    }
`;

const LotteryNumberPicker = ({ numbers, setNumbers }) => {
    const handleChange = (index, value) => {
        const newNumbers = [...numbers];
        newNumbers[index] = value;
        setNumbers(newNumbers);
    };

    return (
        <PickerContainer>
            {numbers.map((number, index) => (
                <DigitPicker
                    key={index}
                    value={number}
                    onChange={(e) => handleChange(index, e.target.value)}
                >
                    <option value="" disabled>
                        -
                    </option>
                    {[...Array(10).keys()].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </DigitPicker>
            ))}
        </PickerContainer>
    );
};

export default LotteryNumberPicker;