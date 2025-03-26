// Define interfaces for the data structure
interface Transaction {
  amount: number;
  category: string;
  merchant: string;
  date: string;
}

interface UserTransactions {
  user_id: string;
  transactions: Transaction[];
  credit_score: number;
  current_card: string;
  overdue: boolean;
  credit_utilization: number;
}

interface RequestBody {
  user_transactions: UserTransactions;
}

// For Node.js environments that don't have fetch globally
import nodeFetch from "node-fetch";
const fetch = globalThis.fetch || nodeFetch;

async function sendTransactionData(): Promise<any> {
  try {
    // URL to send the request to
    const url = "https://480e-35-229-33-93.ngrok-free.app/";

    // Prepare the request body
    const requestBody: RequestBody = {
      user_transactions: {
        user_id: "12345",
        transactions: [
          {
            amount: 5000,
            category: "Travel",
            merchant: "Airline",
            date: "2025-03-15",
          },
          {
            amount: 1200,
            category: "Dining",
            merchant: "Restaurant",
            date: "2025-03-10",
          },
          {
            amount: 3500,
            category: "Shopping",
            merchant: "Luxury Store",
            date: "2025-03-08",
          },
        ],
        credit_score: 780,
        current_card: "XYZ Bank Gold",
        overdue: false,
        credit_utilization: 40,
      },
    };

    // Configure the fetch options
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    console.log("Sending request to:", url);

    // Send the request
    const response = await fetch(url, options);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response
    const data = await response.json();
    console.log("Response received:", data);

    return data;
  } catch (error) {
    console.error("Error sending transaction data:", error);
    throw error;
  }
}

// Execute the function
sendTransactionData()
  .then((data) => console.log("Operation completed successfully"))
  .catch((error) => console.error("Operation failed:", error));
