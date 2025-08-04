"use client";
import "@google/model-viewer";

const ARMetalView = () => {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <model-viewer
        src="/GLB/metal.glb"
        ar
        ar-modes="scene-viewer"
        camera-controls
        auto-rotate
        alt="Metal Frame"
        style={{ width: "100%", height: "100%" }}
      >
        <button slot="ar-button" className="bg-red-900 text-white px-4 py-2 rounded">
          View in AR
        </button>
      </model-viewer>
    </div>
  );
};

export default ARMetalView;
