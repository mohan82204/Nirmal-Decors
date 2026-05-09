import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Sparkles, 
  Environment, 
  PerspectiveCamera, 
  ContactShadows, 
  Float,
  MeshDistortMaterial
} from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const eio = (t) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
const lerp = THREE.MathUtils.lerp;

/* ── Scroll ── */
function useScroll() {
  const [s,setS] = useState(0);
  useEffect(()=>{
    const el=document.getElementById('home');
    const fn=()=>{ if(!el)return; const r=el.getBoundingClientRect(); setS(clamp(-r.top/(r.height-window.innerHeight||1),0,1)); };
    window.addEventListener('scroll',fn,{passive:true}); fn();
    return()=>window.removeEventListener('scroll',fn);
  },[]);
  return s;
}

/* ── Colours ── */
const C = {
  gold: '#d4af37',
  champagne: '#f7e7ce',
  ivory: '#fffff0',
  rose: '#e6a8d7',
  deepRose: '#c0392b',
  skin_b: '#f5cba0',
  skin_g: '#c4834a',
  saree: '#fdf3e3',
  blouse: '#c0392b',
  sherwani: '#fefefe',
  leaf: '#1e4d2b',
};

/* ── Silk Drapes ── */
function SilkDrapes() {
  return (
    <group position={[0, 4, -6]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-7, 0, 0]} rotation={[0, 0.4, 0]}>
          <planeGeometry args={[5, 15, 32, 32]} />
          <MeshDistortMaterial
            color={C.ivory}
            speed={2}
            distort={0.4}
            radius={1}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            sheen={1}
            sheenColor={C.champagne}
          />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <mesh position={[7, 0, 0]} rotation={[0, -0.4, 0]}>
          <planeGeometry args={[5, 15, 32, 32]} />
          <MeshDistortMaterial
            color={C.ivory}
            speed={1.8}
            distort={0.35}
            radius={1}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            sheen={1}
            sheenColor={C.champagne}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ── Floating Petals ── */
function Petals() {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const N = 120;
  const dat = useMemo(() => Array.from({ length: N }, () => ({
    x: (Math.random() - 0.5) * 30,
    y: Math.random() * 25 + 5,
    z: (Math.random() - 0.5) * 20,
    s: Math.random() * 0.015 + 0.005,
    r: (Math.random() - 0.5) * 0.05,
    o: Math.random() * Math.PI * 2,
    c: Math.random() > 0.6 ? C.rose : C.ivory
  })), []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    dat.forEach((p, i) => {
      p.y -= p.s;
      if (p.y < -8) p.y = 20;
      dummy.position.set(p.x + Math.sin(t * 0.4 + p.o) * 0.8, p.y, p.z + Math.cos(t * 0.3 + p.o) * 0.5);
      dummy.rotation.set(t * p.r, t * p.r * 1.2, p.o + t * 0.1);
      dummy.scale.setScalar(0.06);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, N]}>
      <sphereGeometry args={[1, 6, 4]} />
      <meshStandardMaterial 
        roughness={0.4} 
        metalness={0.1} 
        transparent 
        opacity={0.8}
      />
    </instancedMesh>
  );
}

/* ── Garland ── */
function Garland({ handL, handR, neckTarget, phase, visible, flip = false }) {
  const tubeRef = useRef(), roseRef = useRef(), jasRef = useRef(), gldRef = useRef();
  const N = 110;
  const curve = useMemo(() => new THREE.CatmullRomCurve3(Array.from({ length: 6 }, () => new THREE.Vector3()), true), []);
  const geo = {
    rose: useMemo(() => new THREE.SphereGeometry(0.085, 12, 10), []),
    jas: useMemo(() => new THREE.IcosahedronGeometry(0.048, 1), []),
    gld: useMemo(() => new THREE.TorusGeometry(0.072, 0.012, 8, 14), [])
  };
  const mat = {
    rose: useMemo(() => new THREE.MeshStandardMaterial({ color: C.deepRose, roughness: 0.55, emissive: '#3a0000', emissiveIntensity: 0.25 }), []),
    jas: useMemo(() => new THREE.MeshStandardMaterial({ color: C.ivory, roughness: 0.4 }), []),
    gld: useMemo(() => new THREE.MeshStandardMaterial({ color: C.gold, metalness: 0.92, roughness: 0.08 }), [])
  };

  useFrame(({ clock }) => {
    if (!visible) return;
    const t = clock.getElapsedTime();
    const L = handL.clone(), R = handR.clone(), NT = neckTarget.clone().add(new THREE.Vector3(0, 0.05, 0.14));

    const np = clamp((phase - 0.4) / 0.3, 0, 1);
    const top = new THREE.Vector3().addVectors(L, R).multiplyScalar(0.5).add(new THREE.Vector3(0, 0.3, 0));
    const curTop = top.clone().lerp(NT, eio(np));
    const aL = L.clone().lerp(NT.clone().add(new THREE.Vector3(-0.15, -0.04, 0)), np);
    const aR = R.clone().lerp(NT.clone().add(new THREE.Vector3(0.15, -0.04, 0)), np);
    const bot = new THREE.Vector3().addVectors(aL, aR).multiplyScalar(0.5);
    bot.y -= 0.55; bot.z += 0.22;

    curve.points[0].copy(curTop);
    curve.points[1].copy(aL);
    curve.points[2].copy(aL).lerp(bot, 0.5).add(new THREE.Vector3(-0.14, 0, 0.22));
    curve.points[3].copy(bot).add(new THREE.Vector3(0, Math.sin(t + (!flip ? 0 : Math.PI)) * 0.06, 0.1));
    curve.points[4].copy(aR).lerp(bot, 0.5).add(new THREE.Vector3(0.14, 0, 0.22));
    curve.points[5].copy(aR);

    if (tubeRef.current) {
      tubeRef.current.geometry.dispose();
      tubeRef.current.geometry = new THREE.TubeGeometry(curve, 80, 0.016, 8, true);
    }
    if (roseRef.current && jasRef.current && gldRef.current) {
      const d = new THREE.Object3D(); let ri = 0, ji = 0, gi = 0;
      for (let i = 0; i < N; i++) {
        const u = i / (N - 1), p = curve.getPoint(u);
        d.position.copy(p); d.lookAt(p.clone().add(curve.getTangent(u)));
        const m = i % 10;
        if (m === 3 || m === 6) { d.scale.setScalar(1.25); d.updateMatrix(); gldRef.current.setMatrixAt(gi++, d.matrix); }
        else if (m >= 4 && m <= 5) { d.scale.setScalar(1.1 + Math.sin(t * 2 + i) * 0.1); d.updateMatrix(); jasRef.current.setMatrixAt(ji++, d.matrix); }
        else { d.scale.setScalar(1.65 + Math.sin(t * 2.5 + i) * 0.18); d.updateMatrix(); roseRef.current.setMatrixAt(ri++, d.matrix); }
      }
      roseRef.current.instanceMatrix.needsUpdate = true;
      jasRef.current.instanceMatrix.needsUpdate = true;
      gldRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group visible={visible}>
      <mesh ref={tubeRef}><meshStandardMaterial color={C.leaf} roughness={0.9} /></mesh>
      <instancedMesh ref={roseRef} args={[geo.rose, mat.rose, N]} castShadow />
      <instancedMesh ref={jasRef} args={[geo.jas, mat.jas, N]} castShadow />
      <instancedMesh ref={gldRef} args={[geo.gld, mat.gld, N]} castShadow />
    </group>
  );
}

/* ── Arm ── */
function Arm({ side, phase, handRef, skinCol, sleeveCol }) {
  const sh = useRef(), fa = useRef(), ha = useRef();
  const s = side;
  useFrame(() => {
    if (!sh.current || !fa.current) return;
    let p = phase <= 0.5 ? eio(phase * 2) : 1 - eio((phase - 0.5) * 2);
    sh.current.rotation.x = lerp(-0.08, -Math.PI * 0.78, p);
    sh.current.rotation.z = lerp(s * 0.28, s * 0.62, p);
    fa.current.rotation.x = lerp(0.35, Math.PI * 0.68, p);
    fa.current.rotation.y = lerp(0, -s * 0.5, p);
    if (ha.current && handRef) ha.current.getWorldPosition(handRef);
  });
  return (
    <group ref={sh} position={[s * 0.33, 0.38, 0]}>
      <mesh position={[0, -0.21, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.065, 0.42, 14]} />
        <meshStandardMaterial color={sleeveCol} roughness={0.65} />
      </mesh>
      <group ref={fa} position={[0, -0.42, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.058, 0.4, 14]} />
          <meshStandardMaterial color={skinCol} roughness={0.6} />
        </mesh>
        <mesh ref={ha} position={[0, -0.42, 0]} castShadow>
          <sphereGeometry args={[0.072, 14, 14]} />
          <meshStandardMaterial color={skinCol} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Figure ── */
function Figure({ isBride, sp, lhRef, rhRef, neckRef, startX }) {
  const root = useRef(), torso = useRef(), head = useRef(), neck = useRef();
  const sign = isBride ? 1 : -1;

  const walkP = clamp(sp / 0.18, 0, 1);
  const giveP = isBride ? clamp((sp - 0.18) / 0.35, 0, 1) : clamp((sp - 0.53) / 0.35, 0, 1);
  const receiveP = isBride ? clamp((sp - 0.53) / 0.35, 0, 1) : clamp((sp - 0.18) / 0.35, 0, 1);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!root.current) return;
    root.current.position.x = lerp(startX, sign * -0.55, eio(walkP));
    root.current.position.y = -0.8 + Math.sin(t * 1.4) * 0.013;
    const tgt = walkP > 0.45 ? Math.PI * 0.5 * sign : sign * 0.15;
    root.current.rotation.y = lerp(root.current.rotation.y, tgt, 0.055);
    if (head.current) {
      const bow = (receiveP > 0.05 && receiveP < 0.78) ? eio(Math.sin(receiveP * Math.PI)) * 0.55 : 0;
      head.current.rotation.x = Math.sin(t * 0.3) * 0.02 + bow;
      head.current.rotation.y = walkP > 0.35 ? -sign * 0.18 : 0;
    }
    if (neck.current && neckRef) neck.current.getWorldPosition(neckRef);
  });

  const sk = isBride ? C.skin_b : C.skin_g;
  const oc = isBride ? C.saree : C.sherwani;
  const bc = isBride ? C.blouse : C.sherwani;

  return (
    <group ref={root} position={[startX, -0.8, 0]}>
      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={isBride ? [0.34, 0.62, 1.44, 32] : [0.28, 0.38, 1.44, 32]} />
        <meshStandardMaterial 
          color={oc} 
          roughness={0.2} 
          sheen={1} 
          sheenColor={C.ivory} 
          sheenRoughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <torusGeometry args={[isBride ? 0.6 : 0.39, 0.016, 8, 40]} />
        <meshStandardMaterial color={C.gold} metalness={0.95} roughness={0.06} />
      </mesh>
      <group ref={torso} position={[0, 1.82, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.23, 0.34, 0.92, 32]} />
          <meshStandardMaterial color={isBride ? bc : oc} roughness={0.3} />
        </mesh>
        <group ref={head} position={[0, 0.82, 0]}>
          <group ref={neck} position={[0, -0.18, 0]} />
          <mesh castShadow>
            <sphereGeometry args={[0.24, 32, 32]} />
            <meshStandardMaterial color={sk} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.04, -0.04]}>
            <sphereGeometry args={[0.255, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
            <meshStandardMaterial color="#1a0800" roughness={0.9} />
          </mesh>
          {isBride ? (
            <mesh position={[0, 0.22, 0.06]}>
              <sphereGeometry args={[0.038, 8, 8]} />
              <meshStandardMaterial color={C.gold} metalness={0.95} emissive={C.gold} emissiveIntensity={1} />
            </mesh>
          ) : (
            <group position={[0, 0.19, 0]}>
              <mesh rotation={[0.12, 0, 0]}>
                <cylinderGeometry args={[0.27, 0.3, 0.14, 28]} />
                <meshStandardMaterial color="#7a0000" roughness={0.5} />
              </mesh>
              <mesh position={[0, 0.09, 0]}>
                <sphereGeometry args={[0.048, 8, 8]} />
                <meshStandardMaterial color={C.gold} metalness={0.95} />
              </mesh>
            </group>
          )}
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.22, 16]} />
            <meshStandardMaterial color={sk} roughness={0.65} />
          </mesh>
        </group>
        <Arm side={-1} phase={giveP} handRef={lhRef} skinCol={sk} sleeveCol={isBride ? bc : oc} />
        <Arm side={1} phase={giveP} handRef={rhRef} skinCol={sk} sleeveCol={isBride ? bc : oc} />
      </group>
    </group>
  );
}

/* ── Ornate Mandap ── */
function Mandap() {
  return (
    <group position={[0, -0.9, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[10, 64]} />
        <meshStandardMaterial color="#050505" roughness={0.05} metalness={0.9} />
      </mesh>
      {[9.5, 9, 6, 4].map((r, i) => (
        <mesh key={i} position={[0, 0.01 + (i * 0.005), 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.08, r, 64]} />
          <meshStandardMaterial color={C.gold} emissive={C.gold} emissiveIntensity={1.5 - (i * 0.3)} />
        </mesh>
      ))}
      {/* Premium Pillars */}
      {[[-7, -6], [7, -6], [-7, 6], [7, 6]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 5, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.28, 10, 32]} />
            <meshStandardMaterial color={C.gold} metalness={1} roughness={0.1} />
          </mesh>
          <mesh position={[0, 10, 0]}>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial color={C.gold} metalness={1} emissive={C.gold} emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Scene ── */
function Scene({ scrollProgress }) {
  const bL = useRef(new THREE.Vector3()), bR = useRef(new THREE.Vector3()), bN = useRef(new THREE.Vector3());
  const gL = useRef(new THREE.Vector3()), gR = useRef(new THREE.Vector3()), gN = useRef(new THREE.Vector3());
  const smooth = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const [sp, setSp] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ camera, clock }) => {
    smooth.current = lerp(smooth.current, scrollProgress, 0.05);
    setSp(smooth.current);
    const t = clock.getElapsedTime();
    
    // Premium camera movement
    const targetZ = lerp(16, 9, smooth.current);
    const targetY = lerp(3.5, 4.5, smooth.current);
    
    camera.position.x = lerp(camera.position.x, mouse.current.x * 0.6 + Math.sin(t * 0.15) * 0.1, 0.05);
    camera.position.y = lerp(camera.position.y, targetY + mouse.current.y * 0.3, 0.05);
    camera.position.z = lerp(camera.position.z, targetZ, 0.05);
    camera.lookAt(0, 2.5, 0);
  });

  const m1P = clamp((sp - 0.18) / 0.35, 0, 1);
  const m2P = clamp((sp - 0.53) / 0.35, 0, 1);

  return (
    <>
      <PerspectiveCamera makeDefault fov={35} />
      <Environment preset="sunset" />
      
      <ambientLight intensity={0.4} />
      <spotLight 
        position={[15, 25, 15]} 
        intensity={6} 
        angle={0.3} 
        penumbra={1} 
        castShadow 
        color={C.ivory} 
      />
      <pointLight position={[-12, 6, 6]} intensity={3} color={C.champagne} />
      <pointLight position={[12, 6, 6]} intensity={3} color={C.rose} />
      
      <Sparkles count={450} scale={[35, 25, 30]} size={6} speed={0.8} color={C.gold} />
      <Petals />
      <SilkDrapes />
      <Mandap />

      <Figure isBride={true} sp={sp} lhRef={bL.current} rhRef={bR.current} neckRef={bN.current} startX={-7} />
      <Figure isBride={false} sp={sp} lhRef={gL.current} rhRef={gR.current} neckRef={gN.current} startX={7} />

      <Garland handL={bL.current} handR={bR.current} neckTarget={gN.current} phase={m1P} visible={sp > 0.15} />
      <Garland handL={gL.current} handR={gR.current} neckTarget={bN.current} phase={m2P} visible={sp > 0.5} flip />

      <ContactShadows position={[0, -0.89, 0]} opacity={0.5} scale={50} blur={3} far={10} color="#3b2315" />
      
      <EffectComposer disableNormalPass>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={4} height={480} />
        <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} intensity={2} />
        <Noise opacity={0.04} />
        <Vignette eskil={false} offset={0.1} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

export default function WeddingScene3D() {
  const scroll = useScroll();
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
      background: 'radial-gradient(circle at 50% 50%, #fffbf5 0%, #fef9f0 40%, #fdf3e3 100%)'
    }}>
      <Canvas shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3 }} dpr={[1, 2]}>
        <Scene scrollProgress={scroll} />
      </Canvas>
      
      {/* SVG Grain Filter */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: 0.04, mixBlendMode: 'overlay'
      }} />
    </div>
  );
}
