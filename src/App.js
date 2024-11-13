// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PurchaseTickets from './components/PurchaseTickets';
import MyPurchaseHistory from './components/MyPurchaseHistory';
import AllLotteryResults from './components/AllLotteryResults';
import Rules from './components/Rules';
import GlobalStyles from './styles/GlobalStyles';

function App() {
    return (
        <Router>
            <GlobalStyles />
            <Navbar />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<PurchaseTickets />} />
                    <Route path="/history" element={<MyPurchaseHistory />} />
                    <Route path="/results" element={<AllLotteryResults />} />
                    <Route path="/rules" element={<Rules />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;