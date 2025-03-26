import React, { useState } from "react";
import { useBankStore } from "../store/useStore";
import { OfferCard } from "../components/OfferCard";

export function OffersPage() {
  const offers = useBankStore((state) => state.offers);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = Array.from(new Set(offers.map((offer) => offer.category)));

  const filteredOffers = categoryFilter
    ? offers.filter((offer) => offer.category === categoryFilter)
    : offers;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Special Offers</h1>
      <p className="text-gray-600 mb-8">
        Discover our exclusive credit card offers tailored for your lifestyle
      </p>

      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter(null)}
            className={`px-4 py-2 rounded-full text-sm ${
              categoryFilter === null
                ? "bg-[#D71E28] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                categoryFilter === category
                  ? "bg-[#D71E28] text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <OfferCard key={offer.id} {...offer} />
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            No offers found
          </h3>
          <p className="text-gray-600">
            Please try a different category filter or check back later for new
            offers.
          </p>
        </div>
      )}
    </div>
  );
}
