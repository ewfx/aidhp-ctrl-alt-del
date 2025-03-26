import React from 'react';
import { LineChart } from 'lucide-react';

export function InvestmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <LineChart className="text-[#D71E28] h-8 w-8" />
        <h1 className="text-3xl font-bold">Investments</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Investment Portfolio</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-semibold">$158,420.50</p>
              <p className="text-sm text-green-600">+2.5% today</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stocks</span>
                <span className="font-medium">60%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Bonds</span>
                <span className="font-medium">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cash</span>
                <span className="font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Retirement Account</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-semibold">$285,850.75</p>
              <p className="text-sm text-green-600">+1.8% today</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">YTD Return</span>
                <span className="font-medium text-green-600">+8.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Contributions</span>
                <span className="font-medium">$19,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Employer Match</span>
                <span className="font-medium">$5,850</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Dividend Payment</p>
              <p className="text-sm text-gray-600">Mar 15, 2024</p>
            </div>
            <span className="text-green-600">+$125.50</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Stock Purchase</p>
              <p className="text-sm text-gray-600">Mar 10, 2024</p>
            </div>
            <span className="text-red-600">-$1,500.00</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">401(k) Contribution</p>
              <p className="text-sm text-gray-600">Mar 1, 2024</p>
            </div>
            <span className="text-green-600">+$750.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}