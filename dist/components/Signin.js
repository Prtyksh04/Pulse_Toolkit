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
const AuthContext_1 = require("./AuthContext");
const Signin = ({ redirectPath = '/dashboard' }) => {
    const [formData, setFormData] = (0, react_1.useState)({ email: '', password: '' });
    const [formType, setFormType] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(null);
    const apiKey = process.env.REACT_APP_DOMAIN_KEY;
    const projectName = process.env.REACT_APP_FORM_TYPE_KEY;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { signIn } = (0, AuthContext_1.useAuth)();
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
        const { name, value } = e.target;
        setFormData(prevState => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setErrorMessage(null);
        const payload = Object.assign(Object.assign({}, formData), { apiKey,
            projectName });
        try {
            const response = yield fetch('http://localhost:3000/client/Auth/SignIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = yield response.json();
            if (response.ok) {
                signIn(result.data.user);
                navigate(redirectPath);
            }
            else {
                setErrorMessage(result.message);
            }
        }
        catch (error) {
            console.error('Signin failed:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    });
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-screen bg-gray-100", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-8 rounded-lg shadow-lg w-full max-w-sm", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold mb-6 text-center", children: "Signin" }), isLoading ? ((0, jsx_runtime_1.jsxs)("div", { className: "animate-pulse", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-6 bg-gray-200 rounded mb-4" }), (0, jsx_runtime_1.jsx)("div", { className: "h-6 bg-gray-200 rounded mb-4" }), (0, jsx_runtime_1.jsx)("div", { className: "h-10 bg-gray-200 rounded mb-6" })] })) : (formType && ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [formType === 'EMAIL_USERNAME_PASSWORD' && ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email or Username" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "email", name: "email", value: formData.email, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", required: true })] }) })), formType === 'EMAIL_PASSWORD' && ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", required: true })] }) })), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", required: true })] }), errorMessage && ((0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-red-500 text-xs mb-2", children: errorMessage })), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg focus:outline-none", children: "Signin" })] }))), (0, jsx_runtime_1.jsxs)("p", { className: "mt-4 text-center text-sm text-gray-600", children: ["Don't have an account? ", (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/signup", className: "text-indigo-600 hover:underline", children: "Signup" })] })] }) }));
};
exports.default = Signin;
