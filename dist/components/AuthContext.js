"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = exports.AuthProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const js_cookie_1 = __importDefault(require("js-cookie"));
const AuthContext = (0, react_1.createContext)(undefined);
const AuthProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)(() => {
        const userCookie = js_cookie_1.default.get('user');
        return userCookie ? JSON.parse(userCookie) : null;
    });
    const signIn = (userData) => {
        js_cookie_1.default.set('user', JSON.stringify(userData));
        setUser(userData);
    };
    const signOut = () => {
        js_cookie_1.default.remove('user');
        setUser(null);
    };
    return ((0, jsx_runtime_1.jsx)(AuthContext.Provider, { value: { user, signIn, signOut }, children: children }));
};
exports.AuthProvider = AuthProvider;
const useAuth = () => {
    const context = (0, react_1.useContext)(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
exports.useAuth = useAuth;
