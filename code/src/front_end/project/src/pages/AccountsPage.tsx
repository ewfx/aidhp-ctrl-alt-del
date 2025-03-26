import React, { useEffect, useState } from 'react';
import { Building2, Wallet, ArrowUpRight, ArrowDownRight, Clock, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../App';

export function AccountsPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    account_number: '',
    account_type: '',
    balance: '',
    created_at: '',
    id: '',
    interest_rate: '',
    status: '',
    updated_at: '',
    user_id: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<any[]>([]);

  // Format number to 2 decimal places
  const formatAmount = (amount: string | number) => {
    const num = parseFloat(amount.toString());
    return isNaN(num) ? 'N/A' : `$${num.toFixed(2)}`;
  };

  // Fetch user data from the Flask API
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      if (!user?.id) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/transaction/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transaction data');
        }
        const data = await response.json();
        setTransaction(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [user?.id]);

  // If still loading, display a loading message
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If there's an error fetching the data, display an error message
  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-xl border border-red-100">
        <div className="flex items-center gap-3 text-red-600">
          <div className="p-2 bg-red-100 rounded-lg">
            <Shield className="h-6 w-6" />
          </div>
          <p className="font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-3 rounded-xl backdrop-blur-sm border border-indigo-100/50">
            <Building2 className="text-indigo-600 h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Accounts</h1>
            <p className="text-gray-600">Manage your checking and savings accounts</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Checking Account Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
          <div className="relative h-48 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMzQzIDM2LjM0M2E2IDYgMCAxMS04LjQ4NS04LjQ4NCA2IDYgMCAwMTguNDg1IDguNDg0eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
                <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Checking Account</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{user?.name || "User"}</h2>
              <p className="text-white/90">Account ending in {userData?.account_number?.slice(-4) || '****'}</p>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-6 rounded-xl border border-indigo-100/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Wallet className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-indigo-900">Available Balance</h3>
              </div>
              <p className="text-2xl font-bold text-indigo-600">{formatAmount(userData?.balance)}</p>
            </div>
          </div>
        </div>

        {/* Savings Account Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
          <div className="relative h-48 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMzQzIDM2LjM0M2E2IDYgMCAxMS04LjQ4NS04LjQ4NCA2IDYgMCAwMTguNDg1IDguNDg0eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
                <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Savings Account</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{user?.name || "User"}</h2>
              <p className="text-white/90">Account ending in {userData?.account_number?.slice(-4) || '****'}</p>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-6 rounded-xl border border-indigo-100/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Wallet className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900">Available Balance</h3>
                </div>
                <p className="text-2xl font-bold text-indigo-600">{formatAmount(userData?.balance)}</p>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-6 rounded-xl border border-indigo-100/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-indigo-900">Interest Rate</h3>
                </div>
                <p className="text-2xl font-bold text-indigo-600">{userData?.interest_rate ? `${parseFloat(userData.interest_rate).toFixed(2)}%` : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-indigo-900">Recent Transactions</h2>
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {Array.isArray(transaction) && transaction.length > 0 ? (
              transaction.map((transactions, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 rounded-xl border border-indigo-100/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      transactions.type === 'debit' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {transactions.type === 'debit' ? (
                        <ArrowDownRight className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-indigo-900">{transactions.category}</p>
                      <p className="text-sm text-gray-600">{transactions.created_at}</p>
                    </div>
                  </div>
                  <span className={`font-semibold ${
                    transactions.type === 'debit' 
                      ? 'text-red-600' 
                      : 'text-green-600'
                  }`}>
                    {transactions.type === 'debit' ? '-' : '+'}{formatAmount(transactions.amount)}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No recent transactions found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
