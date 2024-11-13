// src/utils/helpers.js
import {ethers} from 'ethers';
import LotteryABI from '../contracts/Lottery.json';

const getContract = () => {
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to use this dApp!');
        return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contractAddress = '0xc39f94146630f81ab4ba18b1784b053170a8e3b2';
    return new ethers.Contract(contractAddress, LotteryABI.abi, signer);
};

export { getContract };