"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";

interface ModelViewerProps {
  modelPath: string;
  frameImage?: string;
}

const Model = ({ modelPath, frameImage }: ModelViewerProps) => {
  const { scene } = useGLTF(modelPath);

  return (
    <>
      {/* 3D Model */}
      <primitive object={scene} scale={1} />

      {/* Frame Image (optional) */}
      {frameImage && (
        <Html position={[0, 1.5, 0]} distanceFactor={1.5} zIndexRange={[1, 10]}>
          <div
            style={{
              width: "300px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={frameImage}
              alt="Frame Image"
              style={{
                width: "100%",
                display: "block",
              }}
            />
          </div>
        </Html>
      )}
    </>
  );
};

const ModelViewer = ({ modelPath, frameImage }: ModelViewerProps) => {
  return (
    <div className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden border border-gray-300 bg-[#E1E2E6]">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Model modelPath={modelPath} frameImage={frameImage} />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
