import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";
import { Button } from "@/components/ui/button";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

interface ModelProps {
  path: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// Car model component
function CarModel({ path, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: ModelProps) {
  // This is a placeholder as we don't have actual GLTF models
  // In a real implementation, you'd use actual car models
  const group = useRef<Mesh>(null);
  
  useFrame((_state, delta) => {
    if (group.current) {
      // Gentle auto-rotation
      group.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={group} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[3, 1, 6]} />
      <meshStandardMaterial color="#1C3879" metalness={0.8} roughness={0.2} />
      
      {/* Car body parts - simplified representation */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.5, 0.8, 4]} />
        <meshStandardMaterial color="#1E56A0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[1.2, -0.4, 1.8]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-1.2, -0.4, 1.8]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[1.2, -0.4, -1.8]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-1.2, -0.4, -1.8]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Windows */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[2.2, 0.5, 3]} />
        <meshStandardMaterial color="#D4F1F9" metalness={0.3} roughness={0.1} transparent opacity={0.5} />
      </mesh>
      
      {/* Lights */}
      <mesh position={[0, 0.2, 3]}>
        <boxGeometry args={[2, 0.3, 0.1]} />
        <meshStandardMaterial color="#FFF" emissive="#FFCC00" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.2, -3]}>
        <boxGeometry args={[2, 0.3, 0.1]} />
        <meshStandardMaterial color="#F00" emissive="#F00" emissiveIntensity={0.5} />
      </mesh>
    </mesh>
  );
}

// Scene setup with controls
function Scene() {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  
  // Reset camera position
  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[6, 3, 8]} />
      <OrbitControls 
        ref={controlsRef} 
        minDistance={5} 
        maxDistance={15} 
        enableDamping 
        dampingFactor={0.1}
        rotateSpeed={0.5}
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[1024, 1024]} 
      />
      <directionalLight 
        position={[-10, 10, 5]} 
        intensity={0.5} 
        castShadow 
      />
      
      <CarModel 
        path="/models/car.glb" 
        scale={1.2}
        position={[0, 0, 0]}
      />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.8} metalness={0.2} />
      </mesh>
      
      <Environment preset="sunset" />
    </>
  );
}

// Main component with controls
export default function Car3DView() {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border">
      <Canvas shadows>
        <Scene />
      </Canvas>
      
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}