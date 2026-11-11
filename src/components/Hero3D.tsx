import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function traceTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#0b1530";
  g.fillRect(0, 0, 512, 512);
  g.strokeStyle = "#3d7bff";
  g.lineWidth = 3;
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < 46; i++) {
    let x = 40 + rnd() * 432, y = 40 + rnd() * 432;
    g.beginPath(); g.moveTo(x, y);
    for (let s = 0; s < 4; s++) {
      if (rnd() > 0.5) x += (rnd() - 0.5) * 160; else y += (rnd() - 0.5) * 160;
      g.lineTo(Math.min(490, Math.max(22, x)), Math.min(490, Math.max(22, y)));
    }
    g.stroke();
    g.fillStyle = "#9cc0ff";
    g.beginPath(); g.arc(x, y, 5, 0, Math.PI * 2); g.fill();
  }
  g.fillStyle = "#c9d6f0";
  g.fillRect(176, 176, 160, 160);
  g.fillStyle = "#0b1530";
  g.font = "bold 40px monospace";
  g.textAlign = "center";
  g.fillText("ES-1", 256, 250);
  g.font = "18px monospace";
  g.fillText("GABON", 256, 285);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Chip() {
  const group = useRef<THREE.Group>(null);
  const tex = useMemo(traceTexture, []);
  const pins = useMemo(() => {
    const out: [number, number, number][] = [];
    for (let i = 0; i < 12; i++) {
      const p = -1.65 + i * 0.3;
      out.push([p, 0, 2.05], [p, 0, -2.05], [2.05, 0, p], [-2.05, 0, p]);
    }
    return out;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    const tx = state.pointer.y * 0.35 + 0.55;
    const ty = state.pointer.x * 0.6 + state.clock.elapsedTime * 0.15;
    g.rotation.x += (tx - g.rotation.x) * (1 - Math.exp(-4 * dt));
    g.rotation.y += (ty - g.rotation.y) * (1 - Math.exp(-4 * dt));
  });

  return (
    <group ref={group}>
      <RoundedBox args={[4, 0.35, 4]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color="#1a2340" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.181, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.7, 3.7]} />
        <meshStandardMaterial map={tex} metalness={0.3} roughness={0.5} emissiveMap={tex} emissive="#2a5cff" emissiveIntensity={0.35} />
      </mesh>
      {pins.map((p, i) => (
        <mesh key={i} position={p} rotation={[0, Math.abs(p[0]) > 2 ? Math.PI / 2 : 0, 0]}>
          <boxGeometry args={[0.12, 0.08, 0.3]} />
          <meshStandardMaterial color="#c8cfdb" metalness={1} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function Ring({ r, speed, tilt }: { r: number; speed: number; tilt: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.z += Math.min(d, 0.05) * speed; });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[r, 0.012, 8, 160]} />
      <meshBasicMaterial color="#5b8cff" transparent opacity={0.45} />
    </mesh>
  );
}

function Cubes() {
  const items = useMemo(
    () => Array.from({ length: 9 }, (_, i) => {
      const a = (i / 9) * Math.PI * 2;
      return { pos: [Math.cos(a) * 4.2, Math.sin(a * 2) * 1.2, Math.sin(a) * 4.2] as [number, number, number], s: 0.18 + (i % 3) * 0.08 };
    }),
    [],
  );
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y -= Math.min(d, 0.05) * 0.2; });
  return (
    <group ref={ref}>
      {items.map((it, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
          <mesh position={it.pos}>
            <boxGeometry args={[it.s, it.s, it.s]} />
            <meshStandardMaterial color={i % 3 === 0 ? "#3d7bff" : "#8a97b3"} metalness={0.7} roughness={0.3} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 3.2, 8.5], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.domElement.parentElement?.parentElement?.setAttribute("data-scene-ready", "")}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 3]} intensity={1.6} />
      <pointLight position={[-4, 2, -3]} intensity={30} color="#3d7bff" />
      <Environment resolution={128}>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} rotation-x={Math.PI / 2} />
        <Lightformer intensity={1.2} color="#7aa2ff" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
        <Lightformer intensity={0.8} position={[5, 1, 2]} rotation-y={-Math.PI / 2} scale={[20, 2, 1]} />
      </Environment>
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
        <Chip />
      </Float>
      <Ring r={3.3} speed={0.3} tilt={0.15} />
      <Ring r={3.8} speed={-0.2} tilt={-0.25} />
      <Cubes />
    </Canvas>
  );
}
