"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../lib/api";
import { refreshToken } from "../../../lib/auth";

export default function DashboardPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const router = useRouter();
  const [shareLink, setShareLink] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/admin/login");
  }, [router]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await API.post("/share");
      const token = res.data.shareToken;
      setShareLink(`${window.location.origin}/share/${token}`);
      setMessage("");
    } catch (err) {
      setMessage("Failed to generate link. Try refreshing the token.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefreshToken = async () => {
    setIsRefreshing(true);
    try {
      await refreshToken();
      setMessage(" Token refreshed successfully.");
    } catch (err) {
      setMessage("Refresh failed. Please log in again.");
      router.push("/admin/login");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-stone-200 rounded-2xl shadow-md mt-28">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Generate share link  */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={` cursor-pointer flex items-center gap-2 px-5 py-3 text-white text-sm font-medium rounded-md transition-all
          ${isGenerating
            ? "bg-green-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
          }`}
          >{isGenerating ? (<img src="/loader.svg" alt="loading spinner" className="w-4 h-4 animate-spin" />) : (
            <span>🔗</span>
          )}
          {isGenerating ? "Generating..." : "Generate Share Link"}
        </button>
        
        {/* Refresh button */}
        <button
          onClick={handleRefreshToken}
          disabled={isRefreshing}
          className={` cursor-pointer flex items-center gap-2 px-5 py-3 text-white text-sm font-medium rounded-md transition-all
          ${
          isRefreshing ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700" }`}>
          {isRefreshing ? ( <img src="/loader.svg" alt="loading spinner" className="w-4 h-4 animate-spin" />) : (
            <span>🔄</span>
          )}
          {isRefreshing ? "Refreshing..." : "Refresh Token"}
        </button>
      </div>
      
      {/* Popup messsage */}
      {message && (
        <div className="mb-6 text-sm text-green-800 bg-green-100 px-4 py-3 rounded-md shadow-sm transition-all duration-300">
           {message}
        </div>
      )}

      {/* Share Link */}
      {shareLink && (
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-inner">
          <p className="mb-2 font-semibold text-gray-700"> Shareable Link:</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <a
              href={shareLink}
              className="text-sm text-blue-600 underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shareLink}
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareLink);
                setMessage("Link copied to clipboard ");
              }}
              className=" cursor-pointer text-xs font-medium bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-md transition"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
