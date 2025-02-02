import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletABI from "../abi/Wallet.json";

const Home = () => {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  const [userAddress, setUserAddress] = useState("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [userBalance, setUserBalance] = useState("0");
  const [transferAmount, setTransferAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [loadingDeposit, setLoadingDeposit] = useState(false);
  const [loadingTransfer, setLoadingTransfer] = useState(false);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);

  const toEthers = (bigInt: ethers.BigNumber) => {
    return ethers.utils.formatEther(bigInt);
  };

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();

        const contract = new ethers.Contract(
          import.meta.env.VITE_CONTRACT_ADDRESS,
          WalletABI.abi,
          signer
        );

        setContract(contract);
        setProvider(provider);
        setSigner(signer);
        setUserAddress(userAddress);
        fetchUserBalance(signer);
        fetchBalance(contract);
      } else {
        alert("Please install Metamask!");
      }
    };

    init();

    window.ethereum?.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length > 0) {
        init();
      } else {
        setSigner(null);
        setUserAddress("");
      }
    });

    return () => {
      window.ethereum?.removeListener("accountsChanged", init);
    };
  }, []);

  useEffect(() => {
    if (!signer || !contract) return;
    fetchUserBalance(signer);
    fetchBalance(contract);
  }, [balance, userBalance, provider, signer]);

  const fetchBalance = async (contract: ethers.Contract) => {
    const balance = await contract.getBalance();
    setBalance(toEthers(balance));
  };

  const fetchUserBalance = async (signer: ethers.providers.JsonRpcSigner) => {
    const balance = await signer.getBalance();
    setUserBalance(toEthers(balance));
  };

  const handleDeposit = async () => {
    if (!contract || !amount) return;
    setLoadingDeposit(true);
    try {
      const tx = await contract.deposit({
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      fetchBalance(contract);
      setAmount("");
    } catch (error) {
      console.error("Deposit failed:", error);
    } finally {
      setLoadingDeposit(false);
    }
  };

  const handleTransfer = async () => {
    if (!contract || !recipient || !transferAmount) return;
    setLoadingTransfer(true);
    try {
      const tx = await contract.transfer(
        recipient,
        ethers.utils.parseEther(transferAmount)
      );
      await tx.wait();
      fetchBalance(contract);
      setRecipient("");
      setTransferAmount("");
    } catch (error) {
      console.error("Transfer failed:", error);
    } finally {
      setLoadingTransfer(false);
    }
  };

  const handleWithdraw = async () => {
    if (!contract || !withdrawAmount) return;
    setLoadingWithdraw(true);
    try {
      const tx = await contract.withdraw(
        ethers.utils.parseEther(withdrawAmount)
      );
      await tx.wait();
      fetchBalance(contract);
      setWithdrawAmount("");
    } catch (error) {
      console.error("Withdraw failed:", error);
    } finally {
      setLoadingWithdraw(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Decentralized Wallet
        </h1>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-700">Your Address:</p>
            <p className="text-lg font-semibold text-gray-900 break-all">
              {userAddress}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              Your Wallet Balance:
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {userBalance} ETH
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              Contract Wallet Balance:
            </p>
            <p className="text-lg font-semibold text-gray-900">{balance} ETH</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Deposit</h2>
            <input
              type="text"
              placeholder="Amount in ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleDeposit}
              disabled={loadingDeposit}
              className={`w-full mt-2 py-2 px-4 rounded-lg transition-colors ${
                loadingDeposit ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {loadingDeposit ? "Processing..." : "Deposit"}
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Withdraw</h2>
            <input
              type="text"
              placeholder="Amount in ETH"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleWithdraw}
              disabled={loadingWithdraw}
              className={`w-full mt-2 py-2 px-4 rounded-lg transition-colors ${
                loadingWithdraw
                  ? "bg-gray-400"
                  : "bg-violet-500 hover:bg-violet-600"
              } text-white`}
            >
              {loadingWithdraw ? "Processing..." : "Withdraw"}
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Transfer</h2>
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Amount in ETH"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleTransfer}
              disabled={loadingTransfer}
              className={`w-full mt-2 py-2 px-4 rounded-lg transition-colors ${
                loadingTransfer
                  ? "bg-gray-400"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {loadingTransfer ? "Processing..." : "Transfer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
