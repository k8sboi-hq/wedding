"use client";

import { useState, useEffect } from "react";
import { encodeGuestName } from "@/lib/guestUtils";

interface Guest {
  id: string;
  name: string;
  party: "1" | "2";
  link: string;
  sent: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestName, setGuestName] = useState("");
  const [selectedParty, setSelectedParty] = useState<"1" | "2">("1");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load guests from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const stored = localStorage.getItem("wedding-guests");
      if (stored) {
        try {
          setGuests(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to load guests:", e);
        }
      }
    }
  }, [isAuthenticated]);

  // Save guests to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && guests.length > 0) {
      localStorage.setItem("wedding-guests", JSON.stringify(guests));
    }
  }, [guests, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side password check
    // Change this password to something secure!
    if (password === "wedding-2026-chu-b@o") {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const encoded = encodeGuestName(guestName);
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://wedding.khoahuynh.dev";
    const link = `${baseUrl}/?party=${selectedParty}&guest=${encoded}`;

    const newGuest: Guest = {
      id: Date.now().toString(),
      name: guestName,
      party: selectedParty,
      link,
      sent: false,
      createdAt: new Date().toISOString(),
    };

    setGuests([newGuest, ...guests]);
    setGuestName("");
  };

  const handleCopyLink = (guest: Guest) => {
    navigator.clipboard.writeText(guest.link);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSent = (id: string) => {
    setGuests(guests.map((g) => (g.id === id ? { ...g, sent: !g.sent } : g)));
  };

  const handleDeleteGuest = (id: string) => {
    if (confirm("Are you sure you want to delete this guest?")) {
      setGuests(guests.filter((g) => g.id !== id));
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(guests, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `wedding-guests-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          setGuests(imported);
          alert(`Imported ${imported.length} guests`);
        }
      } catch (error) {
        alert("Failed to import file. Please check the format.");
      }
    };
    reader.readAsText(file);
  };

  const stats = {
    total: guests.length,
    sent: guests.filter((g) => g.sent).length,
    pending: guests.filter((g) => !g.sent).length,
    party1: guests.filter((g) => g.party === "1").length,
    party2: guests.filter((g) => g.party === "2").length,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="font-serif text-3xl font-bold text-primary mb-6 text-center">
            Wedding Admin
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
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
                autoFocus
              />
            </div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-serif text-3xl font-bold text-primary mb-2">
                Wedding Guest Manager
              </h1>
              <p className="text-gray-600">
                Generate and track personalized invitation links
              </p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Guests</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.sent}
            </div>
            <div className="text-sm text-gray-600">Sent</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
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

        <div className="grid md:grid-cols-3 gap-6">
          {/* Add Guest Form */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="font-serif text-xl font-bold text-primary mb-4">
                Add New Guest
              </h2>
              <form onSubmit={handleAddGuest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guest Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Party
                  </label>
                  <select
                    value={selectedParty}
                    onChange={(e) =>
                      setSelectedParty(e.target.value as "1" | "2")
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="1">Party 1 - Tiệc Nhà Gái (Jan 18)</option>
                    <option value="2">Party 2 - Tiệc Nhà Trai (Jan 25)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Generate Link
                </button>
              </form>

              <div className="mt-6 pt-6 border-t space-y-2">
                <button
                  onClick={handleExportData}
                  className="w-full text-sm bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  📥 Export Guest List
                </button>
                <label className="block">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                  <span className="block w-full text-sm text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                    📤 Import Guest List
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Guest List */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="font-serif text-xl font-bold text-primary mb-4">
                Guest List ({guests.length})
              </h2>

              {guests.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-2">No guests added yet</p>
                  <p className="text-sm">
                    Add your first guest using the form →
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {guests.map((guest) => (
                    <div
                      key={guest.id}
                      className={`border rounded-lg p-4 transition-all ${
                        guest.sent
                          ? "bg-green-50 border-green-200"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {guest.name}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              guest.party === "1"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            Party {guest.party} -{" "}
                            {guest.party === "1" ? "Nhà Gái" : "Nhà Trai"}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="bg-gray-50 rounded p-2 mb-2">
                        <input
                          type="text"
                          value={guest.link}
                          readOnly
                          className="w-full bg-transparent text-xs text-gray-600 outline-none"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopyLink(guest)}
                          className={`flex-1 text-sm py-2 px-3 rounded transition-colors ${
                            copiedId === guest.id
                              ? "bg-green-500 text-white"
                              : "bg-primary text-white hover:bg-primary/90"
                          }`}
                        >
                          {copiedId === guest.id ? "✓ Copied!" : "Copy Link"}
                        </button>
                        <button
                          onClick={() => handleToggleSent(guest.id)}
                          className={`flex-1 text-sm py-2 px-3 rounded transition-colors ${
                            guest.sent
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {guest.sent ? "✓ Sent" : "Mark as Sent"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
