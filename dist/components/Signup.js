import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [formType, setFormType] = useState(null);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [isPasswordStrong, setIsPasswordStrong] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVerifingOtp, setIsVerifingOtp] = useState(false);
    const apiKey = import.meta.env.VITE_REACT_APP_DOMAIN_KEY;
    const projectName = import.meta.env.VITE_REACT_APP_FORM_TYPE_KEY;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchFormType = async () => {
            try {
                const response = await fetch('http://localhost:3000/client/Auth/formtype', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${projectName}`,
                    },
                    body: JSON.stringify({ token: apiKey, projectName: projectName })
                });
                const data = await response.json();
                setFormType(data);
            }
            catch (error) {
                console.error('Error fetching form type:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchFormType();
    }, [projectName, apiKey]);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === 'password') {
            validatePassword(e.target.value);
        }
    };
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const payload = {
            ...formData,
            apiKey,
            projectName,
        };
        try {
            const response = await fetch('http://localhost:3000/client/Auth/SignUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            setIsOtpSent(true);
            console.log('OTP sent:', result);
        }
        catch (error) {
            console.error('Signup failed:', error);
        }
        finally {
            setIsSubmitting(false); // Set isSubmitting to false when the request is done
        }
    };
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setIsVerifingOtp(true);
        const payload = {
            ...formData,
            otp,
            apiKey,
            projectName
        };
        try {
            const response = await fetch('http://localhost:3000/client/Auth/verifyotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            console.log('OTP verification successful:', result);
            navigate("/signin");
        }
        catch (error) {
            console.error('OTP verification failed:', error);
        }
    };
    return (React.createElement("div", { className: "flex items-center justify-center min-h-screen bg-gray-100" },
        React.createElement("div", { className: "bg-white p-8 rounded-lg shadow-lg w-full max-w-sm" },
            React.createElement("h1", { className: "text-2xl font-bold mb-6 text-center" }, "Signup"),
            isLoading ? (React.createElement("div", { className: "animate-pulse" },
                React.createElement("div", { className: "h-6 bg-gray-200 rounded mb-4" }),
                React.createElement("div", { className: "h-6 bg-gray-200 rounded mb-4" }),
                React.createElement("div", { className: "h-10 bg-gray-200 rounded mb-6" }))) : (formType && !isOtpSent && (React.createElement("form", { onSubmit: handleSubmit },
                formType === 'EMAIL_USERNAME_PASSWORD' && (React.createElement("div", null,
                    React.createElement("div", { className: "mb-4" },
                        React.createElement("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700" }, "Username"),
                        React.createElement("input", { type: "text", id: "username", name: "username", value: formData.username, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", required: true })),
                    React.createElement("div", { className: "mb-4" },
                        React.createElement("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700" }, "Email"),
                        React.createElement("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", required: true })),
                    React.createElement("div", { className: "mb-6" },
                        React.createElement("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700" }, "Password"),
                        React.createElement("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleChange, className: `mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${passwordErrors.length > 0 ? 'border-red-500' : 'border-gray-300'}`, required: true }),
                        React.createElement("ul", { className: "mt-2 text-xs text-red-500" }, passwordErrors.map((error, index) => (React.createElement("li", { key: index }, error)))),
                        isPasswordStrong && (React.createElement("p", { className: "mt-2 text-green-500 text-xs" }, "Your account has a strong password."))))),
                formType === 'EMAIL_PASSWORD' && (React.createElement("div", null,
                    React.createElement("div", { className: "mb-4" },
                        React.createElement("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700" }, "Email"),
                        React.createElement("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", required: true })),
                    React.createElement("div", { className: "mb-6" },
                        React.createElement("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700" }, "Password"),
                        React.createElement("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleChange, className: `mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${passwordErrors.length > 0 ? 'border-red-500' : 'border-gray-300'}`, required: true }),
                        React.createElement("ul", { className: "mt-2 text-xs text-red-500" }, passwordErrors.map((error, index) => (React.createElement("li", { key: index }, error)))),
                        isPasswordStrong && (React.createElement("p", { className: "mt-2 text-green-500 text-xs" }, "Your account has a strong password."))))),
                React.createElement("button", { type: "submit", disabled: !isPasswordStrong || isSubmitting, className: `w-full py-2 px-4 rounded-lg focus:outline-none ${!isPasswordStrong || isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}` }, isSubmitting ? 'Sending OTP...' : 'Signup')))),
            isOtpSent && (React.createElement("form", { onSubmit: handleOtpSubmit },
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { htmlFor: "otp", className: "block text-sm font-medium text-gray-700" }, "Enter OTP"),
                    React.createElement("input", { type: "text", id: "otp", name: "otp", value: otp, onChange: handleOtpChange, className: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm", required: true })),
                React.createElement("button", { type: "submit", disabled: isVerifingOtp, className: `w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg focus:outline-none  ${isVerifingOtp ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}` }, isVerifingOtp ? "Verifing OTP..." : "Verify"))),
            React.createElement("p", { className: "mt-4 text-center text-sm text-gray-600" },
                "Already have an account? ",
                React.createElement(Link, { to: "/signin", className: "text-indigo-600 hover:underline" }, "Signin")))));
};
export default Signup;
