// src/components/PurchaseTickets.js
import React, { useState } from 'react';
import styled from 'styled-components';
import LotteryNumberPicker from './LotteryNumberPicker';
import { getContract } from '../utils/helpers';
import { ethers } from 'ethers';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PurchaseSection = styled.div`
  background: #3a3a4f;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const QuantityInput = styled.input`
  width: 100px;
  padding: 10px;
  margin-left: 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
`;

const BuyButton = styled.button`
  background: #4e54c8;
  border: none;
  padding: 10px 20px;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  width: 100%;
`;

const PurchaseTickets = () => {
    const [numbers, setNumbers] = useState(['', '', '', '', '', '', '']);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [txHash, setTxHash] = useState('');

    const handleBuy = async () => {
        // Validate that all digits are selected
        if (numbers.some((num) => num === '')) {
            alert('Please select all 7 digits.');
            return;
        }

        // Validate quantity
        if (quantity < 1) {
            alert('Quantity must be at least 1.');
            return;
        }

        // Convert numbers array to string
        const lotteryNumber = numbers.join('');

        try {
            setLoading(true);
            const contract = getContract();
            if (!contract) {
                setLoading(false);
                return;
            }

            const ticketPrice = ethers.utils.parseEther('0.00000000001'); // Match your contract's ticket price
            const totalCost = ticketPrice.mul(quantity);

            const tx = await contract.buyTicket(lotteryNumber, quantity, {
                value: totalCost,
            });

            setTxHash(tx.hash);
            setModalIsOpen(true);
            await tx.wait();
            alert('Tickets purchased successfully!');
            // Reset selections
            setNumbers(['', '', '', '', '', '', '']);
            setQuantity(1);
        } catch (error) {
            console.error('Error purchasing tickets', error);
            alert('Failed to purchase tickets.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <PurchaseSection>
                <SectionTitle>Purchase Lottery Tickets</SectionTitle>
                <LotteryNumberPicker numbers={numbers} setNumbers={setNumbers} />
                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="quantity">Quantity:</label>
                    <QuantityInput
                        type="number"
                        id="quantity"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                </div>
                <BuyButton onClick={handleBuy} disabled={loading}>
                    {loading ? 'Processing...' : 'Buy Tickets'}
                </BuyButton>
            </PurchaseSection>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    content: {
                        background: '#2c2c3c',
                        color: '#ffffff',
                        borderRadius: '10px',
                        padding: '20px',
                        maxWidth: '500px',
                        margin: 'auto',
                    },
                }}
            >
                <h2>Transaction Submitted</h2>
                <p>Your transaction is being processed.</p>
                <p>
                    View on Etherscan:{' '}
                    <a
                        href={`https://etherscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#4e54c8' }}
                    >
                        {txHash.slice(0, 10)}...
                    </a>
                </p>
                <button
                    onClick={() => setModalIsOpen(false)}
                    style={{
                        background: '#4e54c8',
                        border: 'none',
                        padding: '10px 20px',
                        color: '#ffffff',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Close
                </button>
            </Modal>
        </Container>
    );
};

export default PurchaseTickets;