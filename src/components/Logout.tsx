import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const LogoutButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none"
      >
        Logout
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Logout</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
