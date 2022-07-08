import { message } from "antd";
import useApp from "Hooks/useApp";
import useAuth from "Hooks/useAuth";
import { FC, useState } from "react";

const LoginJWT: FC = () => {
  const { login } = useAuth() as any;
  const { theme } = useApp();
  const [isSubmitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!email.length && !password.length)
      return message.error("Please provide required credentials!");

    setSubmitting(true);

    try {
      await login(email, password);
      setSubmitting(false);
    } catch (err: any) {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative py-25">
      <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="rounded-xl bg-white shadow-xl">
            <div className="p-6 sm:p-16">
              <div className="space-y-4">
                <div className="centered">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="mb-8 text-2xl text-cyan-900 font-bold centered">
                  Log in to your account
                </h2>
              </div>
              <div className="mt-5 grid space-y-4">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={`group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
              hover:border-${theme.primaryColorHover} focus:bg-blue-50 active:bg-${theme.primaryColor} focus:outline-none`}
                  placeholder="Email address"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className={`group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
              hover:border-${theme.primaryColorHover} focus:bg-blue-50 active:bg-${theme.primaryColor} focus:outline-none`}
                  placeholder="Password"
                />
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`group h-12 rounded-full flex justify-center py-3 border border-transparent text-sm font-medium text-white bg-${theme.primaryColor} hover:bg-${theme.primaryColorHover} transition duration-300`}
                >
                  <div className="relative space-x-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-0 w-5"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    <span className="block w-max font-semibold tracking-wide text-sm sm:text-base">
                      Login
                    </span>
                  </div>
                </button>
              </div>
              <div className="mt-20 space-y-4 text-gray-600 text-center sm:-mb-8">
                <p className="text-xs">
                  Forgot password? Please contact admin.
                </p>
                <p className="text-xs">&copy;{new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginJWT;
