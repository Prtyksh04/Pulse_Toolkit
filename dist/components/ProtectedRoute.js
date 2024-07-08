"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("./AuthContext");
const ProtectedRoute = () => {
    const { user } = (0, AuthContext_1.useAuth)();
    return user ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {}) : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/signin" });
};
exports.default = ProtectedRoute;
