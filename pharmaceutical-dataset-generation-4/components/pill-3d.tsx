"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

function Pill({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <capsuleGeometry args={[0.3, 0.8, 16, 32]} />
        <MeshDistortMaterial color={color} roughness={0.2} metalness={0.8} distort={0.1} speed={2} />
      </mesh>
    </Float>
  )
}

function Capsule({
  position,
  color1,
  color2,
  scale = 1,
}: { position: [number, number, number]; color1: string; color2: string; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={scale}>
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.25, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={color1} roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.5, 32]} />
          <meshStandardMaterial color={color1} roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.25, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <meshStandardMaterial color={color2} roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.5, 32]} />
          <meshStandardMaterial color={color2} roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, -0.75, 0]}>
          <sphereGeometry args={[0.25, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={color2} roughness={0.3} metalness={0.6} />
        </mesh>
      </group>
    </Float>
  )
}

function Tablet({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.2
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <cylinderGeometry args={[0.4, 0.4, 0.15, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
      </mesh>
    </Float>
  )
}

function DNAHelix({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  const spheres = []
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 4
    const y = (i - 10) * 0.2
    const x1 = Math.cos(angle) * 0.5
    const z1 = Math.sin(angle) * 0.5
    const x2 = Math.cos(angle + Math.PI) * 0.5
    const z2 = Math.sin(angle + Math.PI) * 0.5

    spheres.push(
      <mesh key={`s1-${i}`} position={[x1, y, z1]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.3} />
      </mesh>,
      <mesh key={`s2-${i}`} position={[x2, y, z2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.3} />
      </mesh>,
    )

    if (i % 2 === 0) {
      spheres.push(
        <mesh key={`conn-${i}`} position={[0, y, 0]} rotation={[0, angle, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
          <meshStandardMaterial color="#60a5fa" opacity={0.6} transparent />
        </mesh>,
      )
    }
  }

  return (
    <group ref={groupRef} position={position}>
      {spheres}
    </group>
  )
}

function Molecule({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.5, 0.3, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[-0.4, 0.4, 0.2]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.2, -0.5, 0.1]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[-0.3, -0.3, -0.3]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  )
}

export function Pills3DScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ade80" />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={0.8} color="#a78bfa" />

        <Pill position={[-4, 2, -2]} color="#4ade80" scale={1.2} />
        <Pill position={[4, -1, -3]} color="#f472b6" scale={0.8} />
        <Pill position={[-3, -2, -1]} color="#60a5fa" scale={1} />

        <Capsule position={[3, 2, -2]} color1="#4ade80" color2="#fbbf24" scale={0.9} />
        <Capsule position={[-2, 0, -4]} color1="#a78bfa" color2="#f472b6" scale={0.7} />
        <Capsule position={[0, -3, -2]} color1="#60a5fa" color2="#4ade80" scale={1.1} />

        <Tablet position={[2, 0, -1]} color="#a78bfa" scale={1} />
        <Tablet position={[-4, -1, -3]} color="#fbbf24" scale={0.8} />

        <DNAHelix position={[5, 0, -5]} />
        <Molecule position={[-5, 1, -4]} />

        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

export function FloatingPills3D() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />

          <Pill position={[-2, 1, 0]} color="#4ade80" scale={0.6} />
          <Capsule position={[2, -1, -1]} color1="#a78bfa" color2="#f472b6" scale={0.5} />
          <Tablet position={[0, 2, -2]} color="#60a5fa" scale={0.5} />

          <Environment preset="night" />
        </Canvas>
      </div>
    </div>
  )
}
