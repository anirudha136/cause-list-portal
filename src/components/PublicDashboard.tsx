import { useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function PublicDashboard() {
  const [caseId, setCaseId] = useState("");
  const [caseData, setCaseData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const fetchCase = async () => {
    if (!caseId.trim()) {
      alert("Please enter a Case ID / ARN");
      return;
    }
    
    setIsSearching(true);
    try {
      const docRef = doc(db, "cases", caseId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCaseData(docSnap.data());
      } else {
        alert("Case not found!");
        setCaseData(null);
      }
    } catch (error) {
      alert("Error fetching case data");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-facebook-gray">
      {/* Facebook-style Header */}
      <header className="bg-white shadow-sm border-b border-facebook-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="text-facebook-blue text-2xl font-bold">
                cause-list-portal
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-facebook-dark-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search cases..."
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  className="facebook-input pl-10 bg-facebook-gray border-0 focus:bg-white"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <Link to="/login" className="facebook-button">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block space-y-4">
            <div className="facebook-card">
              <h3 className="font-semibold text-lg mb-3">Quick Actions</h3>
              <ul className="space-y-2">
                <li>
                  <button className="w-full text-left p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                    🔍 Search Cases
                  </button>
                </li>
                <li>
                  <button className="w-full text-left p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                    📅 Today's Hearings
                  </button>
                </li>
                <li>
                  <button className="w-full text-left p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                    📋 Case Status
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search Post */}
            <div className="facebook-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-facebook-blue rounded-full flex items-center justify-center text-white font-bold">
                  CL
                </div>
                <div>
                  <div className="font-semibold">Case Search</div>
                  <div className="text-sm text-facebook-dark-gray">Search for case information</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter Case ID / ARN"
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  className="facebook-input"
                />
                <button
                  onClick={fetchCase}
                  disabled={isSearching}
                  className="facebook-button w-full disabled:opacity-50"
                >
                  {isSearching ? "Searching..." : "Search Case"}
                </button>
              </div>
            </div>

            {/* Case Results */}
            {caseData && (
              <div className="facebook-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-facebook-green rounded-full flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold">Case Found</div>
                    <div className="text-sm text-facebook-dark-gray">Case ID: {caseId}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-facebook-gray rounded-lg">
                      <div className="text-sm text-facebook-dark-gray">Petitioner</div>
                      <div className="font-semibold">{caseData.petitioner}</div>
                    </div>
                    <div className="p-3 bg-facebook-gray rounded-lg">
                      <div className="text-sm text-facebook-dark-gray">Respondent</div>
                      <div className="font-semibold">{caseData.respondent}</div>
                    </div>
                    <div className="p-3 bg-facebook-gray rounded-lg">
                      <div className="text-sm text-facebook-dark-gray">Status</div>
                      <div className="font-semibold">{caseData.status}</div>
                    </div>
                    <div className="p-3 bg-facebook-gray rounded-lg">
                      <div className="text-sm text-facebook-dark-gray">Next Hearing</div>
                      <div className="font-semibold">{caseData.nextHearing}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Welcome Post */}
            <div className="facebook-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-facebook-blue rounded-full flex items-center justify-center text-white font-bold">
                  CL
                </div>
                <div>
                  <div className="font-semibold">Welcome to Cause List Portal</div>
                  <div className="text-sm text-facebook-dark-gray">Your gateway to legal case information</div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                Search for cases using their unique Case ID or ARN number. Get instant access to case details, 
                hearing schedules, and status updates.
              </p>
              
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-facebook-gray transition-colors">
                  <span>👍</span>
                  <span className="text-sm text-facebook-dark-gray">Like</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-facebook-gray transition-colors">
                  <span>💬</span>
                  <span className="text-sm text-facebook-dark-gray">Comment</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-facebook-gray transition-colors">
                  <span>↗️</span>
                  <span className="text-sm text-facebook-dark-gray">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block space-y-4">
            <div className="facebook-card">
              <h3 className="font-semibold text-lg mb-3">Recent Searches</h3>
              <div className="space-y-2 text-sm text-facebook-dark-gray">
                <div>No recent searches</div>
              </div>
            </div>
            
            <div className="facebook-card">
              <h3 className="font-semibold text-lg mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Cases Today:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Cases:</span>
                  <span className="font-semibold">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
