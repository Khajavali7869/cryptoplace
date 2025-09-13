# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


CryptoPlace

CryptoPlace is a modern cryptocurrency marketplace designed to provide real-time tracking and analysis of digital assets. It offers a clean, interactive interface suitable for both novice and experienced crypto enthusiasts.

Built using React.js, Vite, and the CoinGecko API, CryptoPlace provides price tracking, market capitalization, and interactive charts for a variety of cryptocurrencies.

Features

Real-Time Price Tracking: Monitor the latest prices of various cryptocurrencies, including Bitcoin, Ethereum, and more.

24-Hour Price Changes: Stay updated with the percentage changes in prices over the past 24 hours.

Market Capitalization: View market cap rankings to understand the relative size of different cryptocurrencies.

Currency Conversion: Prices are displayed in multiple currencies (USD, EUR, INR).

Search Functionality: Easily search for specific cryptocurrencies to get detailed information.

Interactive Charts: Visualize price trends with interactive charts powered by React Google Charts.

Technologies Used

React.js – A JavaScript library for building user interfaces.

Vite – A build tool providing fast development and optimized production builds.

CoinGecko API – Free API providing comprehensive cryptocurrency data.

React Google Charts – Integrates Google Charts with React for data visualization.

React Router DOM – Handles routing between pages.

React Toastify – Displays notifications for login/signup and other actions.


Project Structure

CryptoPlace/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar/
│   │   └── Footer/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CoinContext.jsx
│   ├── pages/
│   │   ├── Home/
│   │   ├── Coin/
│   │   ├── Pricing/
│   │   ├── Features/
│   │   └── SignUp/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md

Installation & Setup

Clone the repository
git clone https://github.com/SSurya1504/CryptoPlace.git

Navigate into the project directory
cd crypto

Install dependencies 
npm install

Start the development server
npm run dev

Open your browser
Go to http://localhost:5173
 (Vite default port) to view the app.