import React, { useState } from 'react';
import { useAuth } from './AuthContext';
const LogoutButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { signOut } = useAuth();
    const handleLogout = () => {
        signOut();
        setIsModalOpen(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { onClick: () => setIsModalOpen(true), className: "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none" }, "Logout"),
        isModalOpen && (React.createElement("div", { className: "fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg" },
            React.createElement("div", { className: "bg-white w-full max-w-md p-6 rounded-lg shadow-lg" },
                React.createElement("button", { onClick: () => setIsModalOpen(false), className: "absolute top-2 right-2 text-gray-600 hover:text-gray-800" }, "\u00D7"),
                React.createElement("h2", { className: "text-xl font-bold mb-4 text-red-600" }, "Confirm Logout"),
                React.createElement("p", { className: "text-gray-700 mb-4" }, "Are you sure you want to logout?"),
                React.createElement("div", { className: "flex justify-end" },
                    React.createElement("button", { onClick: () => setIsModalOpen(false), className: "mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg focus:outline-none" }, "Cancel"),
                    React.createElement("button", { onClick: handleLogout, className: "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none" }, "Confirm")))))));
};
export default LogoutButton;
