// src/components/AllLotteryResults.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getContract } from '../utils/helpers';
import { ethers } from 'ethers';

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

const AllLotteryResults = () => {
    const [draws, setDraws] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDraws = async () => {
        setLoading(true);
        try {
            const contract = getContract();
            if (!contract) {
                setLoading(false);
                return;
            }

            console.log('Fetching all draws using getDraws()');
            const allDraws = await contract.getDraws();

            console.log('All Draws:', allDraws);

            // Process the draws data
            const formattedDraws = allDraws.map((draw) => {
                const totalPrize = draw.winners.reduce(
                    (acc, winner) => acc.add(winner.amount),
                    ethers.BigNumber.from(0)
                );

                return {
                    drawId: draw.drawId.toNumber(),
                    winningNumber: draw.winningNumber,
                    drawTime: new Date(draw.drawTime.toNumber() * 1000).toLocaleString(),
                    totalPrize: ethers.utils.formatEther(totalPrize),
                };
            });

            setDraws(formattedDraws);
        } catch (error) {
            console.error('Error fetching draws', error);
            alert('Failed to fetch lottery results.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDraws();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <SectionTitle>All Lottery Results</SectionTitle>
            {loading ? (
                <p>Loading...</p>
            ) : draws.length === 0 ? (
                <p>No lottery results available.</p>
            ) : (
                <Table>
                    <thead>
                    <tr>
                        <Th>Draw ID</Th>
                        <Th>Winning Number</Th>
                        <Th>Draw Time</Th>
                        <Th>Total Prize</Th>
                    </tr>
                    </thead>
                    <tbody>
                    {draws.map((draw) => (
                        <tr key={draw.drawId}>
                            <Td>{draw.drawId}</Td>
                            <Td>{draw.winningNumber}</Td>
                            <Td>{draw.drawTime}</Td>
                            <Td>{draw.totalPrize} ETH</Td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default AllLotteryResults;