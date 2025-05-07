"use client";

import React, { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminUploadPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch images from bucket
  const fetchImages = async () => {
    const { data: files, error } = await supabase.storage
      .from("gallery")
      .list("images");
    
    if (error) {
      console.error("Error fetching images:", error);
      return;
    }

    const imageUrls = files
      .filter(file => file.name.match(/\.(jpg|jpeg|png|gif)$/i))
      .map(file => `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/images/${file.name}`);
    
    setImages(imageUrls);
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.user) {
      setLoginError("Invalid email or password");
      return;
    }
    setUser(data.user);
    fetchImages();
  };

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setImages([]);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) {
      setMessage("No files dropped");
      return;
    }

    setUploading(true);
    setMessage("");
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setMessage(`Skipped ${file.name}: Not an image file`);
        continue;
      }
      const { error } = await supabase.storage
        .from("gallery")
        .upload(`images/${file.name}`, file, { upsert: true });
      if (error) {
        setMessage(`Error uploading ${file.name}: ${error.message}`);
        setUploading(false);
        return;
      }
    }
    setUploading(false);
    setMessage("Upload successful!");
    fetchImages();
  };

  // Upload handler
  const handleUpload = async () => {
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) {
      setMessage("No files selected");
      return;
    }
    setUploading(true);
    setMessage("");
    for (const file of files) {
      const { error } = await supabase.storage
        .from("gallery")
        .upload(`images/${file.name}`, file, { upsert: true });
      if (error) {
        setMessage(`Error uploading ${file.name}: ${error.message}`);
        setUploading(false);
        return;
      }
    }
    setUploading(false);
    setMessage("Upload successful!");
    if (fileInputRef.current) fileInputRef.current.value = "";
    fetchImages(); // Refresh the image list after upload
  };

  // Delete handler
  const handleDelete = async (imageUrl: string) => {
    const fileName = imageUrl.split("/").pop();
    if (!fileName) return;

    try {
      // First, download the file from the images folder
      const { data: fileData, error: downloadError } = await supabase.storage
        .from("gallery")
        .download(`images/${fileName}`);

      if (downloadError) {
        setMessage(`Error preparing ${fileName} for archive: ${downloadError.message}`);
        return;
      }

      // Upload the file to the archive folder
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(`archive/${fileName}`, fileData, { upsert: true });

      if (uploadError) {
        setMessage(`Error archiving ${fileName}: ${uploadError.message}`);
        return;
      }

      // If upload to archive was successful, remove from images folder
      const { error: removeError } = await supabase.storage
        .from("gallery")
        .remove([`images/${fileName}`]);

      if (removeError) {
        setMessage(`Error removing ${fileName} from gallery: ${removeError.message}`);
        return;
      }

      setMessage(`Successfully archived ${fileName}`);
      fetchImages(); // Refresh the image list after move
    } catch (error) {
      setMessage(`Error processing ${fileName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  if (!user) {
    return (
      <div className="max-w-sm mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border px-2 py-1 text-black bg-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border px-2 py-1 text-black bg-white"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Login
          </button>
          {loginError && <div className="text-red-600">{loginError}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Image Upload</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>
      <div className="mb-8">
        <div
          className={`w-full max-w-md aspect-square mb-4 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
            isDragging 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center p-6">
            <p className="text-gray-600 mb-2">Drag and drop images here</p>
            <p className="text-sm text-gray-500">or click to select files</p>
          </div>
        </div>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleUpload}
        />
        {message && <div className="mt-4">{message}</div>}
      </div>

      <h2 className="text-xl font-bold mb-4">Gallery Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((imageUrl, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={imageUrl}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <button
              onClick={() => handleDelete(imageUrl)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Archive
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 