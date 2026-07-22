import { useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {signup, loading} = useUserStore()

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData)
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Changed from emerald-400 to red-400 */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-red-400">
          Create Admin Account
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-red-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              {/* Changed from gray-300 to red-100 */}
              <label
                htmlFor="email"
                className="block text-sm font-medium text-red-100"
              >
                Email address
              </label>

              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="block w-full px-3 py-2 bg-red-950 border border-red-700 rounded-md shadow-sm placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              {/* Changed from gray-300 to red-100 */}
              <label
                htmlFor="password"
                className="block text-sm font-medium text-red-100"
              >
                Password
              </label>

              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="block w-full px-3 py-2 bg-red-950 border border-red-700 rounded-md shadow-sm placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              {/* Changed from gray-300 to red-100 */}
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-red-100"
              >
                Confirm Password
              </label>

              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="block w-full px-3 py-2 bg-red-950 border border-red-700 rounded-md shadow-sm placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Changed button colors from emerald to red */}
<button
  type="submit"
  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out disabled:opacity-50"
  disabled={loading}
>
  {loading ? (
    <>
      <Loader className="mr-2 h-5 w-5 animate-spin" />
      Loading...
    </>
  ) : (
    "Sign up"
  )}
</button>
          </form>

<p className="mt-4 text-center text-sm text-red-100">
  Do you already have an admin account?{" "}
  <Link
    to="/login"
    className="font-semibold text-red-400 hover:text-red-300 transition-colors duration-300"
  >
    Login
  </Link>
</p>

        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;