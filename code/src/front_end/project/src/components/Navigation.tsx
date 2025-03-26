import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Wallet, CreditCard, Gift, Shield } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-10 h-16">
          <Link
            to="/accounts"
            className={`flex items-center space-x-3 text-base font-medium transition-colors duration-200 ${
              location.pathname === "/accounts"
                ? "text-[#D71E28]"
                : "text-gray-600 hover:text-[#D71E28]"
            }`}
          >
            <Wallet size={22} />
            <span>Accounts</span>
          </Link>
          <Link
            to="/cards"
            className={`flex items-center space-x-3 text-base font-medium transition-colors duration-200 ${
              location.pathname === "/cards"
                ? "text-[#D71E28]"
                : "text-gray-600 hover:text-[#D71E28]"
            }`}
          >
            <CreditCard size={22} />
            <span>Cards</span>
          </Link>
          <Link
            to="/offers"
            className={`flex items-center space-x-3 text-base font-medium transition-colors duration-200 ${
              location.pathname === "/offers"
                ? "text-[#D71E28]"
                : "text-gray-600 hover:text-[#D71E28]"
            }`}
          >
            <Gift size={22} />
            <span>Offers</span>
          </Link>
          <Link
            to="/insurance"
            className={`flex items-center space-x-3 text-base font-medium transition-colors duration-200 ${
              location.pathname === "/insurance"
                ? "text-[#D71E28]"
                : "text-gray-600 hover:text-[#D71E28]"
            }`}
          >
            <Shield size={22} />
            <span>Insurance</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
