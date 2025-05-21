"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Define Event interface to replace 'any'
interface Event {
  id: number;
  title: string;
  speaker: string;
  yt_uuid?: string;
  luma_url?: string;
  luma_id?: string;
  slides?: string | null;
  created_at?: string;
  updated_at?: string;
  active: boolean;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("events")
        .select("*")
        .order("active", { ascending: false })
        .order("id", { ascending: false });
      if (error) {
        setError(error.message);
        setEvents([]);
      } else {
        setEvents(data || []);
        setError(null);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="overflow-x-auto max-w-full mb-8">
      <h2 className="text-xl font-bold mb-2">All Events</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">Error: {error}</div>
      ) : (
        <>
          <table className="min-w-[800px] border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Title</th>
                <th className="border px-2 py-1">Speaker</th>
                <th className="border px-2 py-1">YouTube UUID</th>
                <th className="border px-2 py-1">Luma URL</th>
                <th className="border px-2 py-1">Luma ID</th>
                <th className="border px-2 py-1">Slides</th>
                <th className="border px-2 py-1">Created At</th>
                <th className="border px-2 py-1">Updated At</th>
                <th className="border px-2 py-1">Active</th>
              </tr>
            </thead>
            <tbody>
              {(showAll ? events : events.slice(0, 5)).map(event => (
                <tr key={event.id}>
                  <td className="border px-2 py-1">{event.id}</td>
                  <td className="border px-2 py-1">{event.title}</td>
                  <td className="border px-2 py-1">{event.speaker}</td>
                  <td className="border px-2 py-1">{event.yt_uuid}</td>
                  <td className="border px-2 py-1 whitespace-nowrap max-w-xs truncate">{event.luma_url}</td>
                  <td className="border px-2 py-1">{event.luma_id}</td>
                  <td className="border px-2 py-1 whitespace-nowrap max-w-xs truncate">{event.slides}</td>
                  <td className="border px-2 py-1 whitespace-nowrap">{event.created_at ? new Date(event.created_at).toLocaleString() : ""}</td>
                  <td className="border px-2 py-1 whitespace-nowrap">{event.updated_at ? new Date(event.updated_at).toLocaleString() : ""}</td>
                  <td className="border px-2 py-1 text-center">{event.active ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {events.length > 5 && (
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowAll(v => !v)}
            >
              {showAll ? "Show Less" : `Show All (${events.length})`}
            </button>
          )}
        </>
      )}
    </div>
  );
} 