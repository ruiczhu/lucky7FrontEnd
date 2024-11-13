// src/components/PurchaseTickets.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import LotteryNumberPicker from './LotteryNumberPicker';
import { getContract } from '../utils/helpers';
import { ethers } from 'ethers';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility

const Container = styled.div`
    width: 100%;
`;

const PurchaseSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SectionTitle = styled.h2`
    color: #fff;
    margin-bottom: 20px;
    font-size: 24px;
`;

const BuyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const BuyForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    padding: 30px;
    border-radius: 15px;
    width: 100%;
    max-width: 600px;
    gap: 20px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const QuantityInput = styled.input`
  width: 100px;
  padding: 15px;
  margin-left: 20px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  text-align: center;
`;

const BuyButton = styled.button`
  background: #ff6f61;
  border: none;
  padding: 15px 30px;
  color: #fff;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
    &:hover {
        background: #ff8573;
        transform: scale(1.05);
    }

    transition: background 0.3s, transform 0.2s;    

    

  &:hover {
    background: #ff8573;
  }

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const PurchaseTickets = () => {
    const [numbers, setNumbers] = useState(['','','','','','','']);
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
            setNumbers(['','','','','','','']);
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
                <BuyContainer>
                    <BuyForm>
                        <LotteryNumberPicker numbers={numbers} setNumbers={setNumbers} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <label htmlFor="quantity" style={{ fontSize: '18px' }}>Quantity:</label>
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
                    </BuyForm>
                </BuyContainer>
            </PurchaseSection>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    content: {
                        background: '#1f1f2e',
                        color: '#fff',
                        borderRadius: '15px',
                        padding: '30px',
                        maxWidth: '500px',
                        margin: 'auto',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
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
                        style={{ color: '#ff6f61' }}
                    >
                        {txHash.slice(0, 10)}...
                    </a>
                </p>
                <button
                    onClick={() => setModalIsOpen(false)}
                    style={{
                        background: '#ff6f61',
                        border: 'none',
                        padding: '10px 20px',
                        color: '#fff',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        marginTop: '20px',
                    }}
                >
                    Close
                </button>
            </Modal>
        </Container>
    );
};

export default PurchaseTickets;