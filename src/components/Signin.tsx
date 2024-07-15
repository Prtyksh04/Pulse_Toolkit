import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface SignInProps {
  redirectPath?: string;
}

const Signin: React.FC<SignInProps> = ({ redirectPath = '/dashboard' }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formType, setFormType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formValid, setFormValid] = useState(false); // State to track form validity
  const apiKey = process.env.REACT_APP_DOMAIN_KEY || '';
  const projectName = process.env.REACT_APP_FORM_TYPE_KEY || '';
  const navigate = useNavigate();
  const { signIn } = useAuth();

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
      } catch (error) {
        console.error('Error fetching form type:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFormType();
  }, [projectName, apiKey]);

  useEffect(() => {
    // Validate form whenever formData changes
    const isFormValid = formData.email !== '' && formData.password !== '';
    setFormValid(isFormValid);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const payload = {
      ...formData,
      apiKey,
      projectName,
    };

    try {
      const response = await fetch('http://localhost:3000/client/Auth/SignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.status === 401) {
        setErrorMessage(result.message);
      }
      if (response.ok) {
        signIn(result.data.user);
        navigate(redirectPath);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error('Signin failed:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Signin</h1>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-6"></div>
          </div>
        ) : (
          formType && (
            <form onSubmit={handleSubmit}>
              {formType === 'EMAIL_USERNAME_PASSWORD' && (
                <div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email or Username</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              )}
              {formType === 'EMAIL_PASSWORD' && (
                <div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              {errorMessage && (
                <p className="mt-2 text-red-500 text-xs mb-2">{errorMessage}</p>
              )}
              <button
                type="submit"
                className={`w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg focus:outline-none ${!formValid && 'cursor-not-allowed opacity-50'}`}
                disabled={!formValid}
              >
                Signin
              </button>
            </form>
          )
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
