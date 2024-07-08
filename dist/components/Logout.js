"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AuthContext_1 = require("./AuthContext");
const LogoutButton = () => {
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const { signOut } = (0, AuthContext_1.useAuth)();
    const handleLogout = () => {
        signOut();
        setIsModalOpen(false);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setIsModalOpen(true), className: "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none", children: "Logout" }), isModalOpen && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-lg", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white w-full max-w-md p-6 rounded-lg shadow-lg", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setIsModalOpen(false), className: "absolute top-2 right-2 text-gray-600 hover:text-gray-800", children: "\u00D7" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold mb-4 text-red-600", children: "Confirm Logout" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-700 mb-4", children: "Are you sure you want to logout?" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setIsModalOpen(false), className: "mr-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg focus:outline-none", children: "Cancel" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleLogout, className: "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none", children: "Confirm" })] })] }) }))] }));
};
exports.default = LogoutButton;
