import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [cases, setCases] = useState<any[]>([]);
  const navigate = useNavigate();

  // Sample data for demonstration - loads immediately
  const sampleCases = [
    { caseId: "CASE001", petitioner: "ABC Corporation", respondent: "XYZ Ltd", status: "Pending", nextHearing: "2024-01-15", officerID: "OFF001", filingDate: "2024-01-01" },
    { caseId: "CASE002", petitioner: "John Smith", respondent: "City Council", status: "Active", nextHearing: "2024-01-20", officerID: "OFF002", filingDate: "2024-01-02" },
    { caseId: "CASE003", petitioner: "Mary Johnson", respondent: "State Bank", status: "Disposed", nextHearing: "2024-01-10", officerID: "OFF001", filingDate: "2024-01-03" },
    { caseId: "CASE004", petitioner: "Tech Solutions Inc", respondent: "Patent Office", status: "Pending", nextHearing: "2024-01-25", officerID: "OFF003", filingDate: "2024-01-04" },
    { caseId: "CASE005", petitioner: "Green Energy Co", respondent: "Environmental Agency", status: "Active", nextHearing: "2024-01-30", officerID: "OFF002", filingDate: "2024-01-05" },
    { caseId: "CASE006", petitioner: "Local Restaurant", respondent: "Health Department", status: "Disposed", nextHearing: "2024-01-05", officerID: "OFF001", filingDate: "2024-01-06" },
    { caseId: "CASE007", petitioner: "Real Estate Corp", respondent: "Zoning Board", status: "Pending", nextHearing: "2024-02-01", officerID: "OFF003", filingDate: "2024-01-07" },
    { caseId: "CASE008", petitioner: "Transport Ltd", respondent: "Traffic Authority", status: "Active", nextHearing: "2024-01-28", officerID: "OFF002", filingDate: "2024-01-08" },
    { caseId: "CASE009", petitioner: "Healthcare Plus", respondent: "Insurance Co", status: "Pending", nextHearing: "2024-02-05", officerID: "OFF001", filingDate: "2024-01-09" },
    { caseId: "CASE010", petitioner: "Education First", respondent: "School Board", status: "Active", nextHearing: "2024-02-10", officerID: "OFF003", filingDate: "2024-01-10" },
    { caseId: "CASE011", petitioner: "Manufacturing Corp", respondent: "Labor Union", status: "Disposed", nextHearing: "2024-01-12", officerID: "OFF002", filingDate: "2024-01-11" },
    { caseId: "CASE012", petitioner: "Digital Media Ltd", respondent: "Copyright Office", status: "Pending", nextHearing: "2024-02-15", officerID: "OFF001", filingDate: "2024-01-12" }
  ];

  const sampleUsers = [
    { id: "USR001", name: "John Doe", role: "Officer", status: "Active", lastLogin: "2024-01-10", casesAssigned: 4 },
    { id: "USR002", name: "Jane Smith", role: "Officer", status: "Active", lastLogin: "2024-01-09", casesAssigned: 3 },
    { id: "USR003", name: "Mike Johnson", role: "Officer", status: "Inactive", lastLogin: "2024-01-05", casesAssigned: 2 },
    { id: "USR004", name: "Sarah Wilson", role: "Admin", status: "Active", lastLogin: "2024-01-10", casesAssigned: 0 },
    { id: "USR005", name: "David Brown", role: "Officer", status: "Active", lastLogin: "2024-01-08", casesAssigned: 3 }
  ];

  // Load data immediately on component mount
  useEffect(() => {
    setCases(sampleCases);
  }, []);

  const pending = cases.filter(c => c.status === "Pending").length;
  const disposed = cases.filter(c => c.status === "Disposed").length;
  const active = cases.filter(c => c.status === "Active").length;

  const pieData = [
    { name: "Pending", value: pending, color: "#FF6B6B" },
    { name: "Disposed", value: disposed, color: "#4ECDC4" },
    { name: "Active", value: active, color: "#45B7D1" }
  ];

  const monthlyData = [
    { month: "Jan", cases: 12, hearings: 8, disposed: 5, pending: 7 },
    { month: "Feb", cases: 19, hearings: 15, disposed: 12, pending: 7 },
    { month: "Mar", cases: 15, hearings: 12, disposed: 8, pending: 7 },
    { month: "Apr", cases: 22, hearings: 18, disposed: 15, pending: 7 },
    { month: "May", cases: 18, hearings: 14, disposed: 10, pending: 8 },
    { month: "Jun", cases: 25, hearings: 20, disposed: 18, pending: 7 }
  ];

  const caseTypeData = [
    { type: "Civil", count: 8, percentage: 67 },
    { type: "Criminal", count: 2, percentage: 17 },
    { type: "Commercial", count: 1, percentage: 8 },
    { type: "Family", count: 1, percentage: 8 }
  ];

  const officerPerformance = [
    { officer: "John Doe", cases: 4, pending: 2, active: 1, disposed: 1, efficiency: 85 },
    { officer: "Jane Smith", cases: 3, pending: 1, active: 1, disposed: 1, efficiency: 90 },
    { officer: "Mike Johnson", cases: 2, pending: 0, active: 0, disposed: 2, efficiency: 100 },
    { officer: "David Brown", cases: 3, pending: 1, active: 2, disposed: 0, efficiency: 75 }
  ];

  const recentActivity = [
    { id: 1, type: "user", action: "New user registered", time: "2 minutes ago", icon: "👤", color: "facebook-blue" },
    { id: 2, type: "case", action: "Case status updated", time: "15 minutes ago", icon: "📝", color: "facebook-green" },
    { id: 3, type: "system", action: "System backup completed", time: "1 hour ago", icon: "⚠️", color: "yellow-500" },
    { id: 4, type: "hearing", action: "New hearing scheduled", time: "2 hours ago", icon: "📅", color: "facebook-blue" },
    { id: 5, type: "case", action: "Case document uploaded", time: "3 hours ago", icon: "📎", color: "facebook-green" },
    { id: 6, type: "user", action: "User permissions updated", time: "4 hours ago", icon: "🔐", color: "purple-500" }
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
              <span className="text-facebook-dark-gray">Admin Dashboard</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                <span className="text-2xl">🔔</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                <span className="text-2xl">💬</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                <span className="text-2xl">⚙️</span>
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
              <h3 className="font-semibold text-lg mb-3">Admin Tools</h3>
              <ul className="space-y-2">
                <li>
                  <button className="w-full text-left p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                    👥 User Management
                  </button>
                </li>
                <li>
                  <button className="w-full text-left p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                    📊 Analytics
                  </button>
                </li>
                <li>
                  <button className="w-full text-left p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                    🔐 Permissions
                  </button>
                </li>
                <li>
                  <button className="w-full text-left p-2 rounded-lg hover:bg-facebook-gray transition-colors">
                    📝 System Logs
                  </button>
                </li>
              </ul>
            </div>

            <div className="facebook-card">
              <h3 className="font-semibold text-lg mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Users:</span>
                  <span className="font-semibold">{sampleUsers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Sessions:</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span>System Status:</span>
                  <span className="font-semibold text-green-600">Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Cases:</span>
                  <span className="font-semibold">{cases.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="facebook-card">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{cases.length}</div>
                    <div className="text-facebook-dark-gray">Total Cases</div>
                  </div>
                </div>
              </div>

              <div className="facebook-card">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⏳</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{pending}</div>
                    <div className="text-facebook-dark-gray">Pending Cases</div>
                  </div>
                </div>
              </div>

              <div className="facebook-card">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{active}</div>
                    <div className="text-facebook-dark-gray">Active Cases</div>
                  </div>
                </div>
              </div>

              <div className="facebook-card">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{disposed}</div>
                    <div className="text-facebook-dark-gray">Disposed Cases</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="facebook-card">
                <h3 className="font-semibold text-lg mb-4">Case Status Distribution</h3>
                <div className="flex justify-center">
                  <PieChart width={300} height={250}>
                    <Pie 
                      data={pieData} 
                      dataKey="value" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={80}
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </div>

              {/* Case Types Chart */}
              <div className="facebook-card">
                <h3 className="font-semibold text-lg mb-4">Case Types Distribution</h3>
                <div className="space-y-3">
                  {caseTypeData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-facebook-blue h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-facebook-dark-gray w-8">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="facebook-card">
                <h3 className="font-semibold text-lg mb-4">Monthly Case Volume</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cases" fill="#1877F2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Officer Performance */}
              <div className="facebook-card">
                <h3 className="font-semibold text-lg mb-4">Officer Performance</h3>
                <div className="space-y-3">
                  {officerPerformance.map((officer, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-facebook-gray rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{officer.officer}</div>
                        <div className="text-xs text-facebook-dark-gray">
                          Cases: {officer.cases} | Efficiency: {officer.efficiency}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{officer.cases}</div>
                        <div className="text-xs text-facebook-dark-gray">Total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="facebook-card">
              <h3 className="font-semibold text-lg mb-4">Recent System Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 bg-facebook-gray rounded-lg">
                    <div className={`w-8 h-8 bg-${activity.color} rounded-full flex items-center justify-center text-white text-sm`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-facebook-dark-gray">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Management Preview */}
            <div className="facebook-card">
              <h3 className="font-semibold text-lg mb-4">User Management</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-facebook-border">
                      <th className="text-left py-2 px-3">User ID</th>
                      <th className="text-left py-2 px-3">Name</th>
                      <th className="text-left py-2 px-3">Role</th>
                      <th className="text-left py-2 px-3">Status</th>
                      <th className="text-left py-2 px-3">Cases Assigned</th>
                      <th className="text-left py-2 px-3">Last Login</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleUsers.map((user) => (
                      <tr key={user.id} className="border-b border-facebook-border hover:bg-facebook-gray">
                        <td className="py-2 px-3">{user.id}</td>
                        <td className="py-2 px-3">{user.name}</td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">{user.casesAssigned}</td>
                        <td className="py-2 px-3 text-sm text-facebook-dark-gray">{user.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
