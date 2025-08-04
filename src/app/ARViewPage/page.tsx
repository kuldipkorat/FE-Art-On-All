// app/arview/page.jsx
"use client";

import "@google/model-viewer";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ARViewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const modelUrl = searchParams.get("model");

  useEffect(() => {
    if (!modelUrl) return;

    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) {
      // Let AR auto open (Scene Viewer / Quick Look will handle it)
    }
  }, [modelUrl]);

  if (!modelUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        No model provided.
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <model-viewer
        src={modelUrl}
        alt="3D model"
        ar
        ar-modes="webxr scene-viewer quick-look"
        auto-rotate
        camera-controls
        tone-mapping="neutral"
        style={{ width: "100%", height: "100%", background: "transparent" }}
        ios-src={modelUrl} // For iOS Quick Look fallback
      >
      </model-viewer>
    </div>
  );
}
