import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [formType, setFormType] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isPasswordStrong, setIsPasswordStrong] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = process.env.REACT_APP_DOMAIN_KEY;
  const projectName = process.env.REACT_APP_FORM_TYPE_KEY;
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
      } catch (error) {
        console.error('Error fetching form type:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormType();
  }, [projectName, apiKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }
  };

  const validatePassword = (password: string) => {
    const errors: string[] = [];
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      console.log('Signup successful:', result);
      navigate("/signin");
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
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
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
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
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${passwordErrors.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    <ul className="mt-2 text-xs text-red-500">
                      {passwordErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                    {isPasswordStrong && (
                      <p className="mt-2 text-green-500 text-xs">Your account has a strong password.</p>
                    )}
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
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${passwordErrors.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    <ul className="mt-2 text-xs text-red-500">
                      {passwordErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                    {isPasswordStrong && (
                      <p className="mt-2 text-green-500 text-xs">Your account has a strong password.</p>
                    )}
                  </div>
                </div>
              )}
              <button
                type="submit"
                disabled={!isPasswordStrong}
                className={`w-full py-2 px-4 rounded-lg focus:outline-none ${!isPasswordStrong ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
              >
                Signup
              </button>
            </form>
          )
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/signin" className="text-indigo-600 hover:underline">Signin</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
