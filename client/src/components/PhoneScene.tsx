import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function PhoneModel() {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.5;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={mesh} castShadow>
                <boxGeometry args={[2.5, 5, 0.2]} />
                <MeshDistortMaterial
                    color="#3b82f6"
                    speed={2}
                    distort={0.2}
                    radius={1}
                    metalness={0.8}
                    roughness={0.2}
                />
                {/* Screen */}
                <mesh position={[0, 0, 0.11]}>
                    <planeGeometry args={[2.3, 4.8]} />
                    <meshStandardMaterial color="#000000" metalness={1} roughness={0} emissive="#000000" />
                </mesh>
            </mesh>
        </Float>
    );
}

export default function PhoneScene() {
    return (
        <div className="w-full h-[500px] cursor-grab active:cursor-grabbing">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <PhoneModel />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
