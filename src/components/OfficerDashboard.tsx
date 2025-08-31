import CaseForm from "./CaseForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OfficerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");

  // Sample data for demonstration
  const sampleCases = [
    { caseId: "CASE001", petitioner: "ABC Corporation", respondent: "XYZ Ltd", status: "Pending", nextHearing: "2024-01-15", remarks: "Initial filing completed" },
    { caseId: "CASE002", petitioner: "John Smith", respondent: "City Council", status: "Active", nextHearing: "2024-01-20", remarks: "Documents submitted" },
    { caseId: "CASE003", petitioner: "Mary Johnson", respondent: "State Bank", status: "Disposed", nextHearing: "2024-01-10", remarks: "Case resolved" }
  ];

  const handleLogout = () => {
    navigate("/");
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
              <span className="text-facebook-dark-gray">Officer Dashboard</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                <span className="text-2xl">🔔</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                <span className="text-2xl">💬</span>
              </button>
              <button 
                onClick={handleLogout}
                className="facebook-button"
              >
                Logout
              </button>
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
                  <button 
                    onClick={() => setActiveTab("create")}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      activeTab === "create" ? "bg-facebook-blue text-white" : "hover:bg-facebook-gray"
                    }`}
                  >
                    📝 Create Case
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab("view")}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      activeTab === "view" ? "bg-facebook-blue text-white" : "hover:bg-facebook-gray"
                    }`}
                  >
                    📋 View Cases
                  </button>
                </li>
                <li>
                  <button className="w-full text-left p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                    📅 Schedule Hearing
                  </button>
                </li>
                <li>
                  <button className="w-full text-left p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                    📊 Reports
                  </button>
                </li>
              </ul>
            </div>

            <div className="facebook-card">
              <h3 className="font-semibold text-lg mb-3">My Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Cases:</span>
                  <span className="font-semibold">{sampleCases.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending:</span>
                  <span className="font-semibold text-yellow-600">
                    {sampleCases.filter(c => c.status === "Pending").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Active:</span>
                  <span className="font-semibold text-blue-600">
                    {sampleCases.filter(c => c.status === "Active").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Disposed:</span>
                  <span className="font-semibold text-green-600">
                    {sampleCases.filter(c => c.status === "Disposed").length}
                  </span>
                </div>
              </div>
            </div>

            <div className="facebook-card">
              <h3 className="font-semibold text-lg mb-3">Recent Activity</h3>
              <div className="space-y-2 text-sm text-facebook-dark-gray">
                <div>Case CASE001 updated</div>
                <div>New hearing scheduled</div>
                <div>Document uploaded</div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === "create" ? (
              <div className="facebook-card">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-facebook-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                    📝
                  </div>
                  <div>
                    <div className="font-semibold text-xl">Case Management</div>
                    <div className="text-facebook-dark-gray">Create and manage legal cases</div>
                  </div>
                </div>
                
                <CaseForm />
              </div>
            ) : (
              <div className="facebook-card">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-facebook-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                    📋
                  </div>
                  <div>
                    <div className="font-semibold text-xl">My Cases</div>
                    <div className="text-facebook-dark-gray">View and manage your assigned cases</div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-facebook-border">
                        <th className="text-left py-2 px-3">Case ID</th>
                        <th className="text-left py-2 px-3">Petitioner</th>
                        <th className="text-left py-2 px-3">Respondent</th>
                        <th className="text-left py-2 px-3">Status</th>
                        <th className="text-left py-2 px-3">Next Hearing</th>
                        <th className="text-left py-2 px-3">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleCases.map((caseItem) => (
                        <tr key={caseItem.caseId} className="border-b border-facebook-border hover:bg-facebook-gray">
                          <td className="py-2 px-3 font-medium">{caseItem.caseId}</td>
                          <td className="py-2 px-3">{caseItem.petitioner}</td>
                          <td className="py-2 px-3">{caseItem.respondent}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              caseItem.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              caseItem.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {caseItem.status}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-sm text-facebook-dark-gray">{caseItem.nextHearing}</td>
                          <td className="py-2 px-3 text-sm text-facebook-dark-gray max-w-xs truncate">
                            {caseItem.remarks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
