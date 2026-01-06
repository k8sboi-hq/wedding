"use client";

import { useState, useEffect } from "react";
import { encodeGuestName } from "@/lib/guestUtils";

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

interface GuestLink {
  id: number;
  guestName: string;
  party: "1" | "2";
  link: string;
  sent: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminRSVPPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // RSVP viewing state
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [stats, setStats] = useState<RSVPStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [partyFilter, setPartyFilter] = useState<"" | "1" | "2">("");
  const [statusFilter, setStatusFilter] = useState<"" | "yes" | "no" | "maybe">(
    "",
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Guest link generation state
  const [guestLinks, setGuestLinks] = useState<GuestLink[]>([]);
  const [guestName, setGuestName] = useState("");
  const [selectedParty, setSelectedParty] = useState<"1" | "2">("1");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"rsvps" | "links">("rsvps");
  const [guestLinksLoading, setGuestLinksLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch guest links when authenticated or tab changes
  useEffect(() => {
    if (isAuthenticated && activeTab === "links") {
      fetchGuestLinks();
    }
  }, [isAuthenticated, activeTab]);

  // Fetch RSVPs when authenticated or filters change
  useEffect(() => {
    if (isAuthenticated && activeTab === "rsvps") {
      fetchRSVPs();
    }
  }, [isAuthenticated, activeTab, partyFilter, statusFilter, searchQuery]);

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

  // Guest link management functions
  const fetchGuestLinks = async () => {
    try {
      setGuestLinksLoading(true);
      const response = await fetch("/api/admin/guest-links");
      const data = await response.json();

      if (data.success) {
        setGuestLinks(data.guestLinks);
      } else {
        console.error("Failed to fetch guest links:", data.error);
      }
    } catch (error) {
      console.error("Error fetching guest links:", error);
    } finally {
      setGuestLinksLoading(false);
    }
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const encoded = encodeGuestName(guestName);
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://wedding.khoahuynh.dev";
    const link = `${baseUrl}/?party=${selectedParty}&guest=${encoded}`;

    try {
      setIsGenerating(true);
      const response = await fetch("/api/admin/guest-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: guestName.trim(),
          party: selectedParty,
          link,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGuestName("");
        fetchGuestLinks(); // Refresh list
      } else {
        alert(data.error || "Failed to create guest link");
      }
    } catch (error) {
      console.error("Failed to create guest link:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = (guestLink: GuestLink) => {
    navigator.clipboard.writeText(guestLink.link);
    setCopiedId(guestLink.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSent = async (id: number, currentSent: boolean) => {
    try {
      const response = await fetch(`/api/admin/guest-links/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sent: !currentSent }),
      });

      const data = await response.json();

      if (data.success) {
        fetchGuestLinks(); // Refresh list
      } else {
        alert(data.error || "Failed to update guest link");
      }
    } catch (error) {
      console.error("Failed to update guest link:", error);
      alert("Network error. Please try again.");
    }
  };

  const handleDeleteGuest = async (id: number) => {
    if (!confirm("Are you sure you want to delete this guest link?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/guest-links/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        fetchGuestLinks(); // Refresh list
      } else {
        alert(data.error || "Failed to delete guest link");
      }
    } catch (error) {
      console.error("Failed to delete guest link:", error);
      alert("Network error. Please try again.");
    }
  };

  const handleExportGuestData = () => {
    const exportData = guestLinks.map((link) => ({
      id: link.id,
      guestName: link.guestName,
      party: link.party,
      link: link.link,
      sent: link.sent,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    }));

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wedding-guest-links-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const guestStats = {
    total: guestLinks.length,
    sent: guestLinks.filter((g) => g.sent).length,
    pending: guestLinks.filter((g) => !g.sent).length,
    party1: guestLinks.filter((g) => g.party === "1").length,
    party2: guestLinks.filter((g) => g.party === "2").length,
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage guest invitations and RSVP responses
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("rsvps")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "rsvps"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              RSVP Responses
            </button>
            <button
              onClick={() => setActiveTab("links")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "links"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Guest Links
            </button>
          </div>
        </div>

        {/* RSVP Responses Tab */}
        {activeTab === "rsvps" && (
          <>
            {/* Statistics */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stats.total}
                  </div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {stats.yes}
                  </div>
                  <div className="text-sm text-gray-600">Yes</div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {stats.no}
                  </div>
                  <div className="text-sm text-gray-600">No</div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    {stats.maybe}
                  </div>
                  <div className="text-sm text-gray-600">Maybe</div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.party1}
                  </div>
                  <div className="text-sm text-gray-600">Party 1</div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.party2}
                  </div>
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
                    onChange={(e) =>
                      setPartyFilter(e.target.value as "" | "1" | "2")
                    }
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
                    onChange={(e) =>
                      setStatusFilter(
                        e.target.value as "" | "yes" | "no" | "maybe",
                      )
                    }
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
                  className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2 cursor-pointer"
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
                        <th className="text-left py-3 px-4 font-serif text-sm">
                          Guest Name
                        </th>
                        <th className="text-left py-3 px-4 font-serif text-sm">
                          Party
                        </th>
                        <th className="text-left py-3 px-4 font-serif text-sm">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-serif text-sm">
                          Notes
                        </th>
                        <th className="text-left py-3 px-4 font-serif text-sm">
                          Updated
                        </th>
                        <th className="text-center py-3 px-4 font-serif text-sm">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rsvps.map((rsvp) => (
                        <tr key={rsvp.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">
                            {rsvp.guestName}
                          </td>
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
                              className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
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
          </>
        )}

        {/* Guest Links Tab */}
        {activeTab === "links" && (
          <>
            {/* Guest Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow p-4 text-center border-t-4 border-primary">
                <div className="text-2xl font-bold text-primary">
                  {guestStats.total}
                </div>
                <div className="text-sm text-gray-600">Total Guests</div>
              </div>
              <div className="bg-white rounded-xl shadow p-4 text-center border-t-4 border-green-600">
                <div className="text-2xl font-bold text-green-600">
                  {guestStats.sent}
                </div>
                <div className="text-sm text-gray-600">Sent</div>
              </div>
              <div className="bg-white rounded-xl shadow p-4 text-center border-t-4 border-amber-600">
                <div className="text-2xl font-bold text-amber-600">
                  {guestStats.pending}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="bg-white rounded-xl shadow p-4 text-center border-t-4 border-blue-600">
                <div className="text-2xl font-bold text-blue-600">
                  {guestStats.party1}
                </div>
                <div className="text-sm text-gray-600">Party 1</div>
              </div>
              <div className="bg-white rounded-xl shadow p-4 text-center border-t-4 border-purple-600">
                <div className="text-2xl font-bold text-purple-600">
                  {guestStats.party2}
                </div>
                <div className="text-sm text-gray-600">Party 2</div>
              </div>
            </div>

            {/* Add Guest Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="font-serif text-xl font-bold text-primary mb-4">
                Generate Guest Invitation Link
              </h2>
              <form onSubmit={handleAddGuest} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="guestName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Guest Name
                    </label>
                    <input
                      id="guestName"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g., Nguyễn Văn A"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                      disabled={isGenerating}
                    />
                  </div>
                  <div className="md:w-48">
                    <label
                      htmlFor="partySelect"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Party
                    </label>
                    <select
                      id="partySelect"
                      value={selectedParty}
                      onChange={(e) =>
                        setSelectedParty(e.target.value as "1" | "2")
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      disabled={isGenerating}
                    >
                      <option value="1">Party 1 (Bride)</option>
                      <option value="2">Party 2 (Groom)</option>
                    </select>
                  </div>
                  <div className="md:w-auto flex items-end">
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full md:w-auto px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isGenerating ? (
                        <>
                          <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                          Generating...
                        </>
                      ) : (
                        "Generate Link"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Guest List Table */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h2 className="font-serif text-xl font-bold text-primary">
                  Guest Links ({guestLinks.length})
                </h2>
                <button
                  onClick={handleExportGuestData}
                  disabled={guestLinks.length === 0}
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  <span>📥</span>
                  Export JSON
                </button>
              </div>
              {guestLinksLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-4 text-gray-500">Loading guest links...</p>
                </div>
              ) : guestLinks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔗</div>
                  <p className="text-gray-500 text-lg mb-2">
                    No guest links yet
                  </p>
                  <p className="text-gray-400 text-sm">
                    Generate your first invitation link using the form above
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            Guest Name
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            Party
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            Invitation Link
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            Status
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {guestLinks.map((guestLink) => (
                          <tr
                            key={guestLink.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4 text-sm">
                              {guestLink.guestName}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                  guestLink.party === "1"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-purple-100 text-purple-700"
                                }`}
                              >
                                Party {guestLink.party}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {guestLink.link.substring(0, 50)}...
                              </code>
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() =>
                                  handleToggleSent(guestLink.id, guestLink.sent)
                                }
                                role="switch"
                                aria-checked={guestLink.sent}
                                aria-label={`Mark ${guestLink.guestName}'s invitation as ${guestLink.sent ? "pending" : "sent"}`}
                                className={`text-xs px-3 py-1 rounded-full transition-colors cursor-pointer ${
                                  guestLink.sent
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                }`}
                              >
                                {guestLink.sent ? "Sent ✓" : "Pending"}
                              </button>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleCopyLink(guestLink)}
                                  className="text-primary hover:text-primary/80 text-sm flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedId === guestLink.id ? (
                                    <>
                                      <span>✓</span>
                                      Copied!
                                    </>
                                  ) : (
                                    <>
                                      <span>📋</span>
                                      Copy Link
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteGuest(guestLink.id)
                                  }
                                  className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {guestLinks.map((guestLink) => (
                      <div
                        key={guestLink.id}
                        className="border border-gray-200 rounded-lg p-4 space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {guestLink.guestName}
                            </h3>
                            <span
                              className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${
                                guestLink.party === "1"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-100 text-purple-700"
                              }`}
                            >
                              Party {guestLink.party}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleToggleSent(guestLink.id, guestLink.sent)
                            }
                            role="switch"
                            aria-checked={guestLink.sent}
                            aria-label={`Mark ${guestLink.guestName}'s invitation as ${guestLink.sent ? "pending" : "sent"}`}
                            className={`text-xs px-3 py-1 rounded-full transition-colors ${
                              guestLink.sent
                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            }`}
                          >
                            {guestLink.sent ? "Sent ✓" : "Pending"}
                          </button>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="text-xs text-gray-500 mb-1">
                            Invitation Link
                          </p>
                          <code className="text-xs text-gray-700 break-all">
                            {guestLink.link}
                          </code>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleCopyLink(guestLink)}
                            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm"
                          >
                            {copiedId === guestLink.id ? (
                              <>
                                <span>✓</span>
                                Copied!
                              </>
                            ) : (
                              <>
                                <span>📋</span>
                                Copy Link
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteGuest(guestLink.id)}
                            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
