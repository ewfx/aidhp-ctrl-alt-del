import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, CreditCard, Wallet, LineChart } from 'lucide-react';

export function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <Link
        to="/accounts"
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3 mb-4">
          <Building2 className="text-[#D71E28]" />
          <h2 className="text-xl font-semibold">Accounts</h2>
        </div>
        <p className="text-gray-600">
          View and manage your checking and savings accounts
        </p>
      </Link>

      <Link
        to="/cards"
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="text-[#D71E28]" />
          <h2 className="text-xl font-semibold">Cards</h2>
        </div>
        <p className="text-gray-600">
          Manage your credit and debit cards, view statements and rewards
        </p>
      </Link>

      <Link
        to="/insurance"
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="text-[#D71E28]" />
          <h2 className="text-xl font-semibold">Insurance</h2>
        </div>
        <p className="text-gray-600">
          View your insurance recommendations and coverage
        </p>
      </Link>

      <Link
        to="/investments"
        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-3 mb-4">
          <LineChart className="text-[#D71E28]" />
          <h2 className="text-xl font-semibold">Investments</h2>
        </div>
        <p className="text-gray-600">
          Track your investment portfolio and retirement accounts
        </p>
      </Link>
    </div>
  );
}