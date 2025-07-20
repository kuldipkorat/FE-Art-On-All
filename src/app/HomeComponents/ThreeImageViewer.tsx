"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

const getGLBPath = (material: string) => {
  switch (material) {
    case "Acrylic":
      return "/GLB/acrylic.glb";
    case "Wood":
      return "/GLB/wood.glb";
    case "Metal":
      return "/GLB/metal.glb";
    case "Canvas":
      return "/GLB/canvas.glb";
    default:
      return "/GLB/acrylic.glb";
  }
};

const TARGET_SIZE = 2;

const Model = ({
  imageUrl,
  material,
  onLoaded,
}: {
  imageUrl: string;
  material: string;
  onLoaded: (scene: THREE.Group) => void;
}) => {
  const glbPath = getGLBPath(material);
  const { scene } = useGLTF(glbPath);
  const texture = useTexture(imageUrl);
  texture.flipY = false;

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        const mat = new THREE.MeshStandardMaterial({
          map: texture,
          metalness: 0.2,
          roughness: 0.8,
        });

        if (material === "Acrylic") {
          texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.repeat.set(1, 1);
          texture.offset.set(0, 0);
          texture.flipY = false;
        }

        child.material = mat;
      }
    });

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = TARGET_SIZE / maxDimension;
    scene.scale.setScalar(scale);

    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    if (onLoaded) onLoaded(scene);
  }, [scene, texture]);

  return <primitive object={scene} />;
};

const ViewerCanvas = ({ imageUrl, selectedMaterial }: { imageUrl: string; selectedMaterial: string }) => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  const handleModelLoaded = (scene: THREE.Group) => {
    camera.position.set(0, 0, 3);

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);

    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    }
  };

  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[2, 2, 2]} intensity={1.5} />
      <Suspense fallback={null}>
        <Model imageUrl={imageUrl} material={selectedMaterial} onLoaded={handleModelLoaded} />
      </Suspense>
      <OrbitControls ref={controlsRef} enableZoom />
    </>
  );
};

const ThreeImageViewer = ({ imageUrl, selectedMaterial }: { imageUrl: string; selectedMaterial: string }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ViewerCanvas imageUrl={imageUrl} selectedMaterial={selectedMaterial} />
      </Canvas>
    </div>
  );
};

export default ThreeImageViewer;
