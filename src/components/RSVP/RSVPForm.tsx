"use client";

import { useState, useEffect } from "react";

interface RSVPFormProps {
  guestName: string;
  party: "1" | "2";
}

interface RSVPData {
  id?: number;
  guestName: string;
  party: "1" | "2";
  status: "yes" | "no" | "maybe";
  notes?: string;
}

export default function RSVPForm({ guestName, party }: RSVPFormProps) {
  const [status, setStatus] = useState<"yes" | "no" | "maybe" | "">("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [existingRSVP, setExistingRSVP] = useState<RSVPData | null>(null);

  // Fetch existing RSVP on mount
  useEffect(() => {
    async function fetchExistingRSVP() {
      try {
        setLoading(true);
        const guestParam = btoa(unescape(encodeURIComponent(guestName)));
        const response = await fetch(
          `/api/rsvp?guest=${guestParam}&party=${party}`,
        );
        const data = await response.json();

        if (data.success && data.rsvp) {
          setExistingRSVP(data.rsvp);
          setStatus(data.rsvp.status);
          setNotes(data.rsvp.notes || "");
        }
      } catch (err) {
        console.error("Failed to fetch existing RSVP:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchExistingRSVP();
  }, [guestName, party]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!status) {
      setError("Vui lòng chọn Yes, No hoặc Maybe");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guestName,
          party,
          status,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setExistingRSVP(data.rsvp);
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.error || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Không thể kết nối. Vui lòng kiểm tra internet và thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Selection */}
      <div>
        <label className="block font-serif text-lg text-foreground mb-4 text-center">
          Bạn sẽ tham dự tiệc của tụi mình chứ?
        </label>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => setStatus("yes")}
            className={`flex-1 sm:flex-none px-8 py-3 rounded-lg font-serif text-lg transition-all ${
              status === "yes"
                ? "bg-green-500 text-white shadow-lg scale-105"
                : "bg-white/50 text-foreground border-2 border-accent/30 hover:border-accent hover:bg-accent/10"
            }`}
          >
            ✓ Yes
          </button>
          <button
            type="button"
            onClick={() => setStatus("maybe")}
            className={`flex-1 sm:flex-none px-8 py-3 rounded-lg font-serif text-lg transition-all ${
              status === "maybe"
                ? "bg-amber-500 text-white shadow-lg scale-105"
                : "bg-white/50 text-foreground border-2 border-accent/30 hover:border-accent hover:bg-accent/10"
            }`}
          >
            ? Maybe
          </button>
          <button
            type="button"
            onClick={() => setStatus("no")}
            className={`flex-1 sm:flex-none px-8 py-3 rounded-lg font-serif text-lg transition-all ${
              status === "no"
                ? "bg-gray-500 text-white shadow-lg scale-105"
                : "bg-white/50 text-foreground border-2 border-accent/30 hover:border-accent hover:bg-accent/10"
            }`}
          >
            ✗ No
          </button>
        </div>
      </div>

      {/* Notes Field */}
      <div>
        <label
          htmlFor="notes"
          className="block font-serif text-base text-muted-foreground mb-2 text-center"
        >
          Để lại lời nhắn cho tụi mình nhé (không bắt buộc)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-accent/30 focus:border-accent focus:outline-none bg-white/50 font-serif resize-none"
          rows={3}
          maxLength={1000}
          placeholder="Gửi lời chúc phúc hoặc thông tin ..."
        />
        <p className="text-xs text-muted-foreground text-right mt-1">
          {notes.length}/1000
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 text-center">
          <p className="text-red-700 font-serif">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-green-700 font-serif text-lg">
            ✨ Cảm ơn bạn đã phản hồi! 💝
          </p>
          {existingRSVP && (
            <p className="text-sm text-green-600 mt-1">
              {existingRSVP.id
                ? "RSVP của bạn đã được cập nhật"
                : "RSVP của bạn đã được lưu"}
            </p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={submitting || !status}
          className={`cursor-pointer px-10 py-4 bg-gradient-to-r from-primary via-accent to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-serif text-lg font-semibold rounded-full shadow-xl transition-all duration-500 ${
            submitting || !status
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-2xl hover:scale-105"
          }`}
          style={{ backgroundSize: "200% 100%" }}
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              Đang gửi...
            </span>
          ) : existingRSVP ? (
            "Cập Nhật RSVP"
          ) : (
            "Gửi RSVP"
          )}
        </button>
      </div>

      {/* Existing RSVP Info */}
      {existingRSVP && !success && (
        <p className="text-sm text-center text-muted-foreground italic">
          Bạn đã RSVP trước đó. Bạn có thể cập nhật phản hồi bất cứ lúc nào.
        </p>
      )}
    </form>
  );
}
