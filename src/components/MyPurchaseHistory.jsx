// src/components/MyPurchaseHistory.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getContract } from '../utils/helpers';

const Container = styled.div`
    width: 100%;
`;

const SectionTitle = styled.h2`
    color: #fff;
    margin-bottom: 20px;
    font-size: 24px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    overflow: hidden;
`;

const Th = styled.th`
    padding: 15px;
    border-bottom: 2px solid #4e54c8;
    text-align: left;
    font-size: 18px;
`;

const Td = styled.td`
    padding: 15px;
    border-bottom: 1px solid #4e54c8;
    font-size: 16px;
    color: #ddd;
`;

const MyPurchaseHistory = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const contract = getContract();
            if (!contract) {
                setLoading(false);
                return;
            }

            // Get user address
            const userAddress = await contract.signer.getAddress();

            // Fetch all tickets using the getUserTickets() function
            const userTickets = await contract.getUserTickets(userAddress);

            // Process tickets
            const formattedTickets = userTickets.map((ticket) => ({
                buyer: ticket.buyer,
                number: ticket.number,
                purchaseTime: new Date(ticket.purchaseTime.toNumber() * 1000).toLocaleString(),
                result: 'Not Drawn', // Placeholder
                prize: '0 ETH', // Placeholder
            }));

            setTickets(formattedTickets);
        } catch (error) {
            console.error('Error fetching tickets', error);
            alert('Failed to fetch tickets.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <SectionTitle>My Purchase History</SectionTitle>
            {loading ? (
                <p>Loading...</p>
            ) : tickets.length === 0 ? (
                <p>You have not purchased any tickets yet.</p>
            ) : (
                <Table>
                    <thead>
                    <tr>
                        <Th>Lottery Number</Th>
                        <Th>Quantity</Th>
                        <Th>Purchase Time</Th>
                        <Th>Result</Th>
                        <Th>Prize Amount</Th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={index}>
                            <Td>{ticket.number}</Td>
                            <Td>1</Td>
                            <Td>{ticket.purchaseTime}</Td>
                            <Td>{ticket.result}</Td>
                            <Td>{ticket.prize}</Td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default MyPurchaseHistory;