"use client";

import { useState, useEffect } from "react";

interface RSVP {
  id: number;
  guestName: string;
  party: "1" | "2";
  status: "yes" | "no" | "maybe";
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface RSVPStats {
  total: number;
  yes: number;
  no: number;
  maybe: number;
  party1: number;
  party2: number;
}

export default function AdminRSVPPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [stats, setStats] = useState<RSVPStats | null>(null);
  const [loading, setLoading] = useState(false);

  const [partyFilter, setPartyFilter] = useState<"" | "1" | "2">("");
  const [statusFilter, setStatusFilter] = useState<"" | "yes" | "no" | "maybe">("");
  const [searchQuery, setSearchQuery] = useState("");

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch RSVPs when authenticated or filters change
  useEffect(() => {
    if (isAuthenticated) {
      fetchRSVPs();
    }
  }, [isAuthenticated, partyFilter, statusFilter, searchQuery]);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/verify");
      const data = await response.json();
      setIsAuthenticated(data.authenticated || false);
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setLoginError(data.error || "Login failed");
      }
    } catch (error) {
      setLoginError("Network error. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
      setRsvps([]);
      setStats(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const fetchRSVPs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (partyFilter) params.set("party", partyFilter);
      if (statusFilter) params.set("status", statusFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());

      const response = await fetch(`/api/admin/rsvps?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setRsvps(data.rsvps);
        setStats(data.stats);
      } else if (response.status === 401) {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to fetch RSVPs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this RSVP?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/rsvps/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        fetchRSVPs(); // Refresh list
      } else {
        alert(data.error || "Failed to delete RSVP");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch("/api/admin/rsvps/export");

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `wedding-rsvps-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        alert("Failed to export RSVPs");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="font-serif text-3xl font-bold text-primary mb-6 text-center">
            RSVP Admin
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter password"
                required
              />
            </div>
            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">{loginError}</p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                RSVP Management
              </h1>
              <p className="text-gray-600">
                View and manage wedding guest responses
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.yes}</div>
              <div className="text-sm text-gray-600">Yes</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.no}</div>
              <div className="text-sm text-gray-600">No</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{stats.maybe}</div>
              <div className="text-sm text-gray-600">Maybe</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.party1}</div>
              <div className="text-sm text-gray-600">Party 1</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.party2}</div>
              <div className="text-sm text-gray-600">Party 2</div>
            </div>
          </div>
        )}

        {/* Filters and Export */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Party Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Party
              </label>
              <select
                value={partyFilter}
                onChange={(e) => setPartyFilter(e.target.value as "" | "1" | "2")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All Parties</option>
                <option value="1">Party 1 (Bride)</option>
                <option value="2">Party 2 (Groom)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "" | "yes" | "no" | "maybe")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All Statuses</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="maybe">Maybe</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Guest Name
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end">
            <button
              onClick={handleExport}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2"
            >
              <span>📥</span>
              Export CSV
            </button>
          </div>
        </div>

        {/* RSVP List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="font-serif text-xl font-bold text-primary mb-4">
            RSVPs ({rsvps.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading RSVPs...</p>
            </div>
          ) : rsvps.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-2">No RSVPs found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-serif text-sm">Guest Name</th>
                    <th className="text-left py-3 px-4 font-serif text-sm">Party</th>
                    <th className="text-left py-3 px-4 font-serif text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-serif text-sm">Notes</th>
                    <th className="text-left py-3 px-4 font-serif text-sm">Updated</th>
                    <th className="text-center py-3 px-4 font-serif text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{rsvp.guestName}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            rsvp.party === "1"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {rsvp.party === "1" ? "Party 1" : "Party 2"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${
                            rsvp.status === "yes"
                              ? "bg-green-100 text-green-700"
                              : rsvp.status === "no"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {rsvp.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate text-sm text-gray-600">
                        {rsvp.notes || "-"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDate(rsvp.updatedAt)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDelete(rsvp.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
