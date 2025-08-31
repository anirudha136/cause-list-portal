import { useState } from "react";
import { auth, db } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("officer");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      // For demo purposes, check default credentials first
      if (email === "admin" && password === "12345") {
        navigate("/admin");
        return;
      }
      
      if (email === "John Doe" && password === "12345") {
        navigate("/officer");
        return;
      }

      // If not default credentials, try Firebase authentication
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (role === "admin") navigate("/admin");
        else navigate("/officer");
      }
    } catch (error: any) {
      alert("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (type: string) => {
    if (type === "admin") {
      setEmail("admin");
      setPassword("12345");
      setUserType("admin");
    } else {
      setEmail("John Doe");
      setPassword("12345");
      setUserType("officer");
    }
  };

  return (
    <div className="min-h-screen bg-facebook-gray flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex items-center justify-between">
        {/* Left side - Facebook branding and description */}
        <div className="max-w-md">
          <div className="text-facebook-blue text-6xl font-bold mb-4">
            cause-list-portal
          </div>
          <h2 className="text-2xl leading-8 text-gray-800">
            Connect with your legal community and stay updated on case proceedings.
          </h2>
        </div>

        {/* Right side - Login form */}
        <div className="w-96">
          <div className="facebook-card">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-facebook-dark-gray">Sign in to your account</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
              {/* User Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Login as
                </label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="facebook-input"
                >
                  <option value="officer">Officer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="facebook-input text-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="facebook-input text-lg"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="facebook-button w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            
            <div className="text-center mt-4">
              <button className="text-facebook-blue hover:underline text-sm bg-transparent border-none cursor-pointer">
                Forgotten password?
              </button>
            </div>
            
            <hr className="my-6 border-facebook-border" />
            
            {/* Quick Login Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => handleQuickLogin("officer")}
                className="w-full bg-facebook-green hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Quick Login as Officer
              </button>
              <button
                onClick={() => handleQuickLogin("admin")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Quick Login as Admin
              </button>
            </div>

            {/* Demo Credentials Info */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>Demo Credentials:</strong><br/>
                <strong>Admin:</strong> admin / 12345<br/>
                <strong>Officer:</strong> John Doe / 12345
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
