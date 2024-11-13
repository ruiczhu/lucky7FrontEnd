// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    background: #1f1f2e;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    margin: 0;
    font-size: 28px;
    color: #4e54c8;
`;


const ConnectButton = styled.button`
    background: #4e54c8;
    border: none;
    padding: 10px 25px;
    color: #fff;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
        background: #6455d1;
    }
`;

const Address = styled.span`
    background: #4e54c8;
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 14px;
    color: #fff;
`;

const Navbar = () => {
    const [currentAccount, setCurrentAccount] = useState(null);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                setCurrentAccount(accounts[0]);
            } catch (error) {
                console.error('Connection Error:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this dApp!');
        }
    };

    const truncateAddress = (address) => {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    };

    useEffect(() => {
        const checkWalletConnected = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0]);
                }
            }
        };

        checkWalletConnected();

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setCurrentAccount(accounts[0]);
                } else {
                    setCurrentAccount(null);
                }
            });

            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', () => {});
                window.ethereum.removeListener('chainChanged', () => {});
            }
        };
    }, []);

    return (
        <Nav>
            <Title>Decentralized Lottery</Title>

            {currentAccount ? (
                <Address>{truncateAddress(currentAccount)}</Address>
            ) : (
                <ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
            )}
        </Nav>
    );
};

export default Navbar;