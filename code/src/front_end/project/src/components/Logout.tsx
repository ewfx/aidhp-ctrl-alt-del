import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear all user data from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        
        toast.success("Logged out successfully");
        navigate("/login");
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
      // Still clear data and redirect even if the API call fails
      localStorage.removeItem("user");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
    >
      Logout
    </button>
  );
} 