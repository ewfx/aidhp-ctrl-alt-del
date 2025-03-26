import React, { useEffect, useState } from 'react';
import { Wallet, Shield, CheckCircle2, Sparkles, ArrowRight, Star, Award, Heart } from 'lucide-react';
import { useAuth } from '../App';

export function LoansPage() {
  const { user } = useAuth();
  const [insuranceRecommendation, setInsuranceRecommendation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsuranceRecommendation = async () => {
      if (!user?.id) {
        setError("User not authenticated");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/recommenedInsurance/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch insurance recommendation");
        }
        const data = await response.json();
        setInsuranceRecommendation(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsuranceRecommendation();
  }, [user?.id]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-3 rounded-xl backdrop-blur-sm border border-indigo-100/50">
            <Shield className="text-indigo-600 h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Insurance</h1>
            <p className="text-gray-600">Your personalized insurance recommendations</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <div className="flex items-center gap-3 text-red-600">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <p className="font-medium">Error: {error}</p>
          </div>
        </div>
      ) : insuranceRecommendation ? (
        <div className="space-y-6">
          {/* Main Recommendation Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="relative h-48 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMzQzIDM2LjM0M2E2IDYgMCAxMS04LjQ4NS04LjQ4NCA2IDYgMCAwMTguNDg1IDguNDg0eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-5 w-5 text-yellow-300 animate-pulse" />
                  <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">Recommended Plan</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{insuranceRecommendation.title}</h2>
                <p className="text-white/90">{insuranceRecommendation.description}</p>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Marketing Statement */}
              <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 p-4 rounded-xl border border-purple-100/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMzQzIDM2LjM0M2E2IDYgMCAxMS04LjQ4NS04LjQ4NCA2IDYgMCAwMTguNDg1IDguNDg0eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                  {/* Icon container with animated glow */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl rounded-full animate-pulse"></div>
                    <div className="relative p-1.5 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Heart className="h-4 w-4 text-pink-500 animate-pulse" />
                    </div>
                  </div>

                  {/* Text with gradient and animation */}
                  <div className="space-y-0.5">
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                      {insuranceRecommendation.marketing_statement}
                    </p>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full mx-auto group-hover:w-24 transition-all duration-300"></div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-xl"></div>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-6 rounded-xl border border-indigo-100/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Wallet className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-indigo-900">Annual Premium</h3>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">₹{insuranceRecommendation.annual_fee}</p>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-6 rounded-xl border border-indigo-100/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Shield className="h-5 w-5 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-indigo-900">Coverage</h3>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">{insuranceRecommendation.coverage}</p>
                </div>
              </div>

              {/* Benefits Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-900">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                  Key Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insuranceRecommendation.benefits.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-4 rounded-xl border border-indigo-100/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group">
                      <div className="p-1.5 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                      </div>
                      <span className="text-indigo-900 group-hover:text-indigo-700 transition-colors duration-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personalized Recommendation */}
              <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-6 rounded-xl border border-blue-100/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg">
                    <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Why This Plan is Perfect for You</h3>
                    <p className="text-blue-800">{insuranceRecommendation.why_specific_for_you}</p>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-4">
                <button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-4 rounded-xl font-medium hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30">
                  <Award className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Apply for Insurance
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-8 rounded-xl text-center border border-indigo-100/50 backdrop-blur-sm">
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Shield className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-900">No Insurance Recommendations Available</h3>
          <p className="text-indigo-700">We're currently analyzing your profile to provide personalized insurance recommendations.</p>
        </div>
      )}
    </div>
  );
}