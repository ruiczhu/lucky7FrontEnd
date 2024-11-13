// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  background: #2c2c3c;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  color: #ffffff;
  font-size: 16px;
  &:hover {
    color: #4e54c8;
  }
`;

const ConnectButton = styled.button`
  background: #4e54c8;
  border: none;
  padding: 10px 20px;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const Address = styled.span`
  background: #4e54c8;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  color: #ffffff;
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
                console.error('Error connecting to MetaMask', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this dApp!');
        }
    };

    const truncateAddress = (address) => {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(
            address.length - 4
        )}`;
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

            window.ethereum.on('chainChanged', (chainId) => {
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
            <NavLinks>
                <StyledLink to="/">Purchase Tickets</StyledLink>
                <StyledLink to="/history">My Purchase History</StyledLink>
                <StyledLink to="/results">All Lottery Results</StyledLink>
                <StyledLink to="/rules">Rules</StyledLink>
            </NavLinks>
            {currentAccount ? (
                <Address>{truncateAddress(currentAccount)}</Address>
            ) : (
                <ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
            )}
        </Nav>
    );
};

export default Navbar;