"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Signup = () => {
    const [formData, setFormData] = (0, react_1.useState)({ username: '', email: '', password: '' });
    const [formType, setFormType] = (0, react_1.useState)(null);
    const [passwordErrors, setPasswordErrors] = (0, react_1.useState)([]);
    const [isPasswordStrong, setIsPasswordStrong] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const apiKey = process.env.REACT_APP_DOMAIN_KEY;
    const projectName = process.env.REACT_APP_FORM_TYPE_KEY;
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const fetchFormType = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/client/Auth/formtype', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${projectName}`,
                    },
                    body: JSON.stringify({ token: apiKey, projectName: projectName })
                });
                const data = yield response.json();
                setFormType(data);
            }
            catch (error) {
                console.error('Error fetching form type:', error);
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchFormType();
    }, [projectName, apiKey]);
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
        if (e.target.name === 'password') {
            validatePassword(e.target.value);
        }
    };
    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("Your password must be at least 8 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Your password must contain at least one uppercase letter.");
        }
        if (!/\d/.test(password)) {
            errors.push("Your password must contain at least one number.");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Your password must contain at least one special character.");
        }
        setPasswordErrors(errors);
        setIsPasswordStrong(errors.length === 0);
        return errors.length === 0;
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const payload = Object.assign(Object.assign({}, formData), { apiKey,
            projectName });
        try {
            const response = yield fetch('http://localhost:3000/client/Auth/SignUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = yield response.json();
            console.log('Signup successful:', result);
            navigate("/signin");
        }
        catch (error) {
            console.error('Signup failed:', error);
        }
    });
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-screen bg-gray-100", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-8 rounded-lg shadow-lg w-full max-w-sm", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold mb-6 text-center", children: "Signup" }), isLoading ? ((0, jsx_runtime_1.jsxs)("div", { className: "animate-pulse", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-6 bg-gray-200 rounded mb-4" }), (0, jsx_runtime_1.jsx)("div", { className: "h-6 bg-gray-200 rounded mb-4" }), (0, jsx_runtime_1.jsx)("div", { className: "h-10 bg-gray-200 rounded mb-6" })] })) : (formType && ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [formType === 'EMAIL_USERNAME_PASSWORD' && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700", children: "Username" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "username", name: "username", value: formData.username, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-6", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleChange, className: `mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${passwordErrors.length > 0 ? 'border-red-500' : 'border-gray-300'}`, required: true }), (0, jsx_runtime_1.jsx)("ul", { className: "mt-2 text-xs text-red-500", children: passwordErrors.map((error, index) => ((0, jsx_runtime_1.jsx)("li", { children: error }, index))) }), isPasswordStrong && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-green-500 text-xs", children: "Your account has a strong password." }))] })] })), formType === 'EMAIL_PASSWORD' && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-6", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleChange, className: `mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${passwordErrors.length > 0 ? 'border-red-500' : 'border-gray-300'}`, required: true }), (0, jsx_runtime_1.jsx)("ul", { className: "mt-2 text-xs text-red-500", children: passwordErrors.map((error, index) => ((0, jsx_runtime_1.jsx)("li", { children: error }, index))) }), isPasswordStrong && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-green-500 text-xs", children: "Your account has a strong password." }))] })] })), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: !isPasswordStrong, className: `w-full py-2 px-4 rounded-lg focus:outline-none ${!isPasswordStrong ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`, children: "Signup" })] }))), (0, jsx_runtime_1.jsxs)("p", { className: "mt-4 text-center text-sm text-gray-600", children: ["Already have an account? ", (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/signin", className: "text-indigo-600 hover:underline", children: "Signin" })] })] }) }));
};
exports.default = Signup;
