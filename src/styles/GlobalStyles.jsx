// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background: #111; /* Dark Background */
        color: #fff; /* Default text color */
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    a {
        color: #4e54c8; /* Vibrant Link Color */
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyles;