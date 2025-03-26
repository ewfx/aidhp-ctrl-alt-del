import { create } from "zustand";

interface Card {
  id: string;
  type: "credit" | "debit";
  number: string;
  expiryDate: string;
  name: string;
  balance?: number;
  limit?: number;
}

interface Offer {
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

interface BankState {
  cards: Card[];
  offers: Offer[];
  notifications: string[];
  loading: boolean;
  recommendedOffer: any | null;
  error: string | null;
  addNotification: (notification: string) => void;
  removeNotification: (index: number) => void;
  fetchRecommendedOffer: (userId: string) => Promise<void>;
}

export const useBankStore = create<BankState>((set) => ({
  cards: [
    {
      id: "1",
      type: "credit",
      number: "**** **** **** 1234",
      expiryDate: "12/25",
      name: "John Doe",
      limit: 10000,
      balance: 2500,
    },
    {
      id: "2",
      type: "debit",
      number: "**** **** **** 5678",
      expiryDate: "06/26",
      name: "John Doe",
      balance: 15000,
    },
  ],
  offers: [
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
  ],
  notifications: [],
  loading: false,
  recommendedOffer: null,
  error: null,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (index) =>
    set((state) => ({
      notifications: state.notifications.filter((_, i) => i !== index),
    })),
  fetchRecommendedOffer: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/recommenedOffers/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      set({ recommendedOffer: data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
