# Decentralized Wallet Project

A decentralized wallet built with **Solidity**, **Foundry**, and **React.js**. This project allows users to store Ether in a smart contract, deposit Ether, and transfer Ether to other addresses.

---

## Features

- **Deposit Ether**: Users can deposit Ether into the smart contract.
- **Transfer Ether**: Users can transfer Ether from the contract to another address.
- **View Balances**: Users can view their wallet balance and the contract's balance.
- **Secure**: Only the contract owner can withdraw funds.
- **User-Friendly Interface**: Built with React.js and Tailwind CSS for a clean and responsive UI.

---

## Technologies Used

- **Smart Contracts**: Solidity, Foundry
- **Frontend**: React.js, Vite, Tailwind CSS
- **Blockchain Interaction**: Ethers.js
- **Testing**: Foundry (Solidity tests)
- **Environment Management**: `.env` files

---

## Project Structure

```
decentralized-wallet/
├── contracts/               # Solidity smart contracts
│   ├── Wallet.sol           # Main wallet contract
│   ├── test/                # Foundry tests
│   │   └── Wallet.t.sol
│   ├── script/              # Deployment scripts
│   │   └── DeployWallet.s.sol
|   ├── Makefile                 # Make commands for Foundry
│   └── foundry.toml         # Foundry configuration
│
├── frontend/                # React.js frontend
│   ├── public/              # Static assets
│   ├── src/                 # React source code
│   │   ├── abi/             # Contract ABI
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind CSS
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   └── index.html           # HTML template
│
├── .env.example             # Environment variable template
├── .gitignore               # Git ignore file
└── README.md                # Project documentation
```

---

## Getting Started

### Prerequisites

- **Node.js**: Install [Node.js](https://nodejs.org/) (v18 or higher).
- **Foundry**: Install [Foundry](https://book.getfoundry.sh/getting-started/installation).
- **MetaMask**: Install the [MetaMask](https://metamask.io/) browser extension.

---

### Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Anonymous961/SimpleWallet
cd decentralized-wallet
```

#### 2. Set Up the Smart Contract

1. Navigate to the `contracts` folder:

   ```bash
   cd contracts
   ```

2. Install dependencies:

   ```bash
   forge install
   ```

3. Compile the contract:

   ```bash
   forge build
   ```

4. Run tests:

   ```bash
   forge test
   ```

5. Deploy the contract:
   - Update the `script/DeployWallet.s.sol` script with your desired network and private key.
   - Run the deployment script:
     ```bash
     forge script script/DeployWallet.s.sol --broadcast --rpc-url <YOUR_RPC_URL> --private-key <YOUR_PRIVATE_KEY>
     ```

#### 3. Set Up the Frontend

1. Navigate to the `frontend` folder:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your contract address and RPC URL:

   ```env
   VITE_CONTRACT_ADDRESS=0xYourContractAddress
   VITE_RPC_URL=https://your-rpc-url
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:5173
   ```

---

## Usage

1. **Connect MetaMask**:

   - When the app loads, it will prompt you to connect your MetaMask wallet. Approve the connection.

2. **Deposit Ether**:

   - Enter an amount in the "Deposit" section and click "Deposit". This will send Ether from your MetaMask wallet to the contract.

3. **Transfer Ether**:

   - Enter a recipient address and an amount in the "Transfer" section, then click "Transfer". This will send Ether from the contract to the recipient.

4. **View Balances**:
   - Your wallet balance and the contract's balance will be displayed at the top of the page and updated after each transaction.

---

## Testing

### Smart Contract Tests

Run the Foundry tests for the smart contract:

```bash
cd contracts
forge test
```

### Frontend Tests

To add frontend tests, you can use a testing library like [Vitest](https://vitest.dev/) or [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Foundry](https://book.getfoundry.sh/) for the smart contract development framework.
- [Ethers.js](https://docs.ethers.io/) for blockchain interaction.
- [Vite](https://vitejs.dev/) and [React](https://reactjs.org/) for the frontend.
- [Tailwind CSS](https://tailwindcss.com/) for styling.

---

## Contact

For questions or feedback, feel free to reach out:

- **Your Name**: [Your Email](mailto:your-email@example.com)
- **GitHub**: [Your GitHub Profile](https://github.com/your-username)

---

Enjoy building and using your decentralized wallet! 🚀
