import React, { useEffect, useState } from "react";
import { CreditCard, Star, Award, Check, Sparkles, ArrowRight, Heart, Wallet, Shield } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import { useBankStore } from "../store/useStore";
import { useAuth } from "../App";

// Fallback image URL if the main one fails to load
const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export function CardsPage() {
  const { user } = useAuth();
  const [recommend, setRecommend] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offerapi, setOfferAPI] = useState<any>();

  const cards = [
    {
      id: "1",
      type: "credit",
      number: "**** **** **** 1234",
      expiryDate: "12/25",
      name: user?.name || "User",
      limit: 10000,
      balance: 2500,
    },
    {
      id: "2",
      type: "debit",
      number: "**** **** **** 5678",
      expiryDate: "06/26",
      name: user?.name || "User",
      balance: 15000,
    },
  ];

  const offers = [
    {
      id: "Luxury_Prestige_Platinum",
      title: "Luxury Prestige Platinum",
      description:
        "Maximizes rewards on luxury purchases with high-end benefits.",
      category: "Luxury",
      annual_fee: 4999,
      cashback: "3% on premium brands",
      reward_points: "20x on luxury shopping",
      benefits: [
        "Personalized concierge service",
        "Access to exclusive fashion events",
        "Free business-class flight upgrade once a year",
      ],
      min_income_required: 1000000,
      image:
        "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "1",
      title: "Elite Dining Rewards",
      description: "5% on dining, 2% on groceries. 10x points on restaurants.",
      image:
        "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Dining",
      annual_fee: 999,
      cashback: "5% on dining, 2% on groceries",
      reward_points: "10x on restaurants",
      benefits: [
        "Complimentary fine-dining vouchers",
        "Priority reservations at premium restaurants",
        "No surcharge on food delivery platforms",
      ],
      min_income_required: 500000,
    },
    {
      id: "2",
      title: "Global Travel Explorer",
      description:
        "5% on flight and hotel bookings. 15x points on international spends.",
      image:
        "https://images.pexels.com/photos/2007401/pexels-photo-2007401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Travel",
      annual_fee: 2999,
      cashback: "5% on flight and hotel bookings",
      reward_points: "15x on international spends",
      benefits: [
        "Complimentary airport lounge access",
        "Zero forex markup",
        "Travel insurance and trip cancellation cover",
      ],
      min_income_required: 700000,
    },
    {
      id: "3",
      title: "Lifestyle Premium Card",
      description: "3% on shopping, entertainment and streaming services.",
      image:
        "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Lifestyle",
      annual_fee: 1499,
      cashback: "3% on shopping and entertainment",
      reward_points: "5x on streaming services",
      benefits: [
        "Complimentary movie tickets monthly",
        "Buy-one-get-one on weekend shopping",
        "Exclusive brand discounts",
      ],
      min_income_required: 400000,
    },
    {
      id: "4",
      title: "Student Essentials",
      description: "No annual fee. 2% cashback on educational expenses.",
      image:
        "https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Education",
      annual_fee: 0,
      cashback: "2% on educational expenses",
      reward_points: "3x on books and stationery",
      benefits: [
        "Education loan interest discounts",
        "Free educational subscriptions",
        "Internship opportunity priorities",
      ],
      min_income_required: 100000,
    },
    {
      id: "5",
      title: "Business Professional",
      description: "Premium benefits for business expenses and travel.",
      image:
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Business",
      annual_fee: 4999,
      cashback: "4% on business expenses",
      reward_points: "12x on business travel",
      benefits: [
        "Dedicated business lounge access",
        "Expense management tools",
        "Tax advisory services",
        "Extended warranty on business purchases",
      ],
      min_income_required: 1000000,
    },
  ];

useEffect(() => {
    if (!user?.id) {
      setError("User not authenticated");
      setIsLoading(false);
      return;
    }
  
    // Avoid calling API if the offer data is already present
    if (recommend) return;
  
    setIsLoading(true);
    setError(null);
    const fetchOffersData = async () => {
      try {
        const response = await fetch(`/api/recommenedOffers/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setOfferAPI(data.title);
        setRecommend(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchOffersData();
  }, [user?.id, recommend]);

  // Function to handle image loading errors
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-3 rounded-xl backdrop-blur-sm border border-indigo-100/50">
            <CreditCard className="text-indigo-600 h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Cards</h1>
            <p className="text-gray-600">Manage your credit and debit cards</p>
          </div>
        </div>
      </div>

      <Tabs.Root defaultValue="credit" className="space-y-6">
        <Tabs.List className="flex space-x-2 border-b border-gray-200">
          <Tabs.Trigger
            value="credit"
            className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 transition-colors duration-200"
          >
            Credit Cards
          </Tabs.Trigger>
          <Tabs.Trigger
            value="debit"
            className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 transition-colors duration-200"
          >
            Debit Cards
          </Tabs.Trigger>
          <Tabs.Trigger
            value="offers"
            className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 transition-colors duration-200"
          >
            Special Offers
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="credit" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards
              .filter((card) => card.type === "credit")
              .map((card) => (
                <div
                  key={card.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-48 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMzQzIDM2LjM0M2E2IDYgMCAxMS04LjQ4NS04LjQ4NCA2IDYgMCAwMTguNDg1IDguNDg0eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="h-5 w-5 text-yellow-300 animate-pulse" />
                        <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Credit Card</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{card.name}</h2>
                      <p className="text-white/90">{card.number}</p>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-6 rounded-xl border border-indigo-100/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <Wallet className="h-5 w-5 text-indigo-600" />
                          </div>
                          <h3 className="font-semibold text-indigo-900">Balance</h3>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">₹{card.balance}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-6 rounded-xl border border-indigo-100/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <Shield className="h-5 w-5 text-indigo-600" />
                          </div>
                          <h3 className="font-semibold text-indigo-900">Credit Limit</h3>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">₹{card.limit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="debit" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards
              .filter((card) => card.type === "debit")
              .map((card) => (
                <div
                  key={card.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-48 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMzQzIDM2LjM0M2E2IDYgMCAxMS04LjQ4NS04LjQ4NCA2IDYgMCAwMTguNDg1IDguNDg0eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="h-5 w-5 text-yellow-300 animate-pulse" />
                        <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Debit Card</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{card.name}</h2>
                      <p className="text-white/90">{card.number}</p>
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
                      <p className="text-2xl font-bold text-indigo-600">₹{card.balance}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="offers" className="space-y-6">
          <div className="space-y-6">
            {isLoading ? (
              <>
                <div className="text-center py-4">
                  <p className="text-gray-600 text-lg animate-pulse">
                    ✨ Curating special offers cards for you... ✨
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-white/20 animate-pulse"
                    >
                      <div className="h-56 bg-gradient-to-br from-indigo-100 to-purple-100"></div>
                      <div className="p-5 space-y-4">
                        <div className="h-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded w-3/4"></div>
                        <div className="flex gap-2">
                          <div className="h-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded w-1/4"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded w-full"></div>
                          <div className="h-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded w-5/6"></div>
                          <div className="h-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded w-4/6"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded w-1/3"></div>
                          <div className="h-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded w-1/2"></div>
                        </div>
                        <div className="h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded mt-4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : error ? (
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <div className="flex items-center gap-3 text-red-600">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Shield className="h-6 w-6" />
                  </div>
                  <p className="font-medium">Error: {error}</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {offers
                  .filter((offer) => offer.title === offerapi)
                  .map((offer) => (
                    <div
                      key={offer.id}
                      className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 group"
                    >
                      <div className="relative h-56 bg-gray-100">
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6 flex flex-col justify-end">
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {offer.title}
                          </h3>
                          <div className="flex items-center gap-2 flex-wrap">
                            {offer.category && (
                              <span className="bg-indigo-600/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium border border-white/20">
                                {offer.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="font-medium text-indigo-900">
                          {recommend?.marketing_statement}
                        </span>
                        <br />
                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                          {"annual_fee" in offer && (
                            <div className="flex items-center gap-1.5">
                              <Award className="h-4 w-4 text-indigo-600" />
                              <span className="font-medium text-indigo-900">
                                ₹{offer.annual_fee}/yr
                              </span>
                            </div>
                          )}
                          {"cashback" in offer && offer.cashback && (
                            <div className="flex items-center gap-1.5">
                              <Star className="h-4 w-4 text-indigo-600" />
                              <span className="font-medium text-indigo-900">
                                {offer.cashback}
                              </span>
                            </div>
                          )}
                        </div>

                        {offer.description && (
                          <p className="text-sm text-gray-700 mb-4 flex-grow">
                            {offer.description}
                          </p>
                        )}

                        {offer.benefits && offer.benefits.length > 0 && (
                          <div className="mt-auto">
                            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5 text-indigo-900">
                              <Check className="h-4 w-4 text-indigo-600" />
                              Key Benefits
                            </h4>
                            <ul className="text-xs text-gray-600 space-y-1.5">
                              {offer.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-indigo-600 mr-1.5">
                                    •
                                  </span>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-5 pt-4 border-t border-indigo-100">
                          <button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-2 rounded-xl text-sm font-medium hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30">
                            <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                            Apply Now
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
