// src/components/MyPurchaseHistory.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getContract } from '../utils/helpers';

const Container = styled.div`
    padding: 20px;
`;

const SectionTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: #3a3a4f;
`;

const Th = styled.th`
    padding: 12px;
    border: 1px solid #4e54c8;
`;

const Td = styled.td`
    padding: 12px;
    border: 1px solid #4e54c8;
    text-align: center;
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

            // Define the filter for TicketPurchased events for this user
            const filter = contract.filters.TicketPurchased(userAddress, null, null, null);

            // Fetch all TicketPurchased events for the user
            const events = await contract.queryFilter(filter, 0, 'latest');

            // Process events to extract tickets
            let userTickets = [];
            events.forEach((event) => {
                const { number, quantity, timestamp } = event.args;
                for (let i = 0; i < quantity; i++) {
                    userTickets.push({
                        buyer: userAddress,
                        number,
                        purchaseTime: new Date(timestamp.toNumber() * 1000).toLocaleString(),
                        result: 'Not Drawn', // Placeholder
                        prize: '0 ETH', // Placeholder
                    });
                }
            });

            setTickets(userTickets);
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