import React from 'react';
import { Shield, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function TopBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="bg-[#D71E28] text-white px-6 py-2 text-base border-b-4 border-[#FFB81C]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold">WeCare Bank</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Shield size={20} />
            <span>Secure Banking</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:bg-red-700 px-3 py-1.5 rounded"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}