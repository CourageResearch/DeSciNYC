"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function EventAddForm() {
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [ytUuid, setYtUuid] = useState("");
  const [lumaUrl, setLumaUrl] = useState("");
  const [lumaId, setLumaId] = useState("");
  const [slides, setSlides] = useState("");
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    // Tell Supabase to use default values when fields are undefined
    const { error } = await supabase.from("events").insert(
      [
        {
          title,
          speaker,
          yt_uuid: ytUuid,
          luma_url: lumaUrl,
          luma_id: lumaId,
          slides: slides || null,
          active,
        },
      ],
      { defaultToNull: false } // This tells Supabase to use default values
    );
    
    setLoading(false);
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Event added successfully!");
      setTitle("");
      setSpeaker("");
      setYtUuid("");
      setLumaUrl("");
      setLumaId("");
      setSlides("");
      setActive(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded mb-8 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2">Add New Event</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border px-2 py-1 text-black"
        required
      />
      <input
        type="text"
        placeholder="Speaker"
        value={speaker}
        onChange={e => setSpeaker(e.target.value)}
        className="border px-2 py-1 text-black"
        required
      />
      <input
        type="text"
        placeholder="YouTube UUID"
        value={ytUuid}
        onChange={e => setYtUuid(e.target.value)}
        className="border px-2 py-1 text-black"
      />
      <input
        type="text"
        placeholder="Luma URL"
        value={lumaUrl}
        onChange={e => setLumaUrl(e.target.value)}
        className="border px-2 py-1 text-black"
      />
      <input
        type="text"
        placeholder="Luma ID"
        value={lumaId}
        onChange={e => setLumaId(e.target.value)}
        className="border px-2 py-1 text-black"
      />
      <input
        type="text"
        placeholder="Slides URL (optional)"
        value={slides}
        onChange={e => setSlides(e.target.value)}
        className="border px-2 py-1 text-black"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={active}
          onChange={e => setActive(e.target.checked)}
        />
        Active
      </label>
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Event"}
      </button>
      {message && <div className="mt-2 text-center">{message}</div>}
    </form>
  );
} 