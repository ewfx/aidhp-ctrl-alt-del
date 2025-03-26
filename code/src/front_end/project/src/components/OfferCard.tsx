import React from "react";
import { useBankStore } from "../store/useStore";

interface OfferCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  annual_fee: number;
  cashback: string;
  reward_points: string;
  benefits: string[];
  min_income_required: number;
}

export function OfferCard({
  id,
  title,
  description,
  image,
  category,
  annual_fee,
  cashback,
  reward_points,
  benefits,
  min_income_required,
}: OfferCardProps) {
  const addNotification = useBankStore((state) => state.addNotification);

  const handleApply = () => {
    addNotification(
      `You've applied for the ${title} card. We'll process your application soon.`
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" data-id={id}>
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs font-semibold text-[#D71E28] bg-red-100 rounded-full mb-2">
          {category}
        </span>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-500">Annual Fee</h4>
            <p className="font-medium">₹{annual_fee}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500">Min Income</h4>
            <p className="font-medium">
              ₹{min_income_required.toLocaleString()}/yr
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">Benefits</h4>
          <ul className="list-disc pl-5">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-gray-600 mb-1">
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-500">Cashback</h4>
            <p className="text-sm">{cashback}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500">
              Reward Points
            </h4>
            <p className="text-sm">{reward_points}</p>
          </div>
        </div>

        <button
          onClick={handleApply}
          className="w-full bg-[#D71E28] text-white py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
