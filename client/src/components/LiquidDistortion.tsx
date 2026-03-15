import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const LiquidMaterial = shaderMaterial(
    {
        uTime: 0,
        uMouse: new THREE.Vector2(0, 0),
        uTexture: null,
        uHover: 0,
    },
    // Vertex Shader
    `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
    // Fragment Shader
    `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform sampler2D uTexture;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    float distortion = sin(uv.y * 10.0 + uTime) * 0.02 * uHover;
    uv.x += distortion;
    
    vec4 tex = texture2D(uTexture, uv);
    gl_FragColor = tex;
  }
  `
);

extend({ LiquidMaterial });

function ImageMesh({ url }: { url: string }) {
    const mesh = useRef<any>(null);
    const { size } = useThree();
    const [hovered, setHovered] = useState(false);
    const texture = useTexture(url);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.uTime = state.clock.getElapsedTime();
            mesh.current.uHover = THREE.MathUtils.lerp(mesh.current.uHover, hovered ? 1 : 0, 0.1);
        }
    });

    return (
        <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
            <planeGeometry args={[4, 5]} />
            {/* @ts-ignore */}
            <liquidMaterial ref={mesh} uTexture={texture} transparent />
        </mesh>
    );
}

export default function LiquidDistortion({ image }: { image: string }) {
    return (
        <div className="w-full h-full">
            <Canvas>
                <ImageMesh url={image} />
            </Canvas>
        </div>
    );
}
