import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const LuxurySilkShader = {
  uniforms: {
    uTime: { value: 0 },
    uColorGold: { value: new THREE.Color('#d4af37') },
    uColorDeep: { value: new THREE.Color('#2a1b0a') },
    uResolution: { value: new THREE.Vector2() },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vNoise;
    uniform float uTime;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 a0 = x - floor(x + 0.5);
      vec3 m0 = 1.0 - 1.5 * (a0*a0 + h*h);
      vec3 g = a0 * vec3(m0.x, m0.y, m0.z) + h * vec3(m0.x, m0.y, m0.z);
      vec3 ox = floor(g * 7.0);
      vec3 oy = g - ox * 7.0;
      vec3 res = oy * 1.2 + ox;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Multi-layered noise for organic silk movement
      float n1 = snoise(pos.xy * 0.5 + uTime * 0.2);
      float n2 = snoise(pos.xy * 1.2 - uTime * 0.3);
      vNoise = n1 * 0.6 + n2 * 0.4;
      
      pos.z += vNoise * 1.5;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying float vNoise;
    uniform vec3 uColorGold;
    uniform vec3 uColorDeep;
    uniform float uTime;

    void main() {
      // Dynamic color blending based on noise and position
      float intensity = vNoise * 0.5 + 0.5;
      
      // Add a metallic "sheen" effect
      float sheen = pow(1.0 - abs(vNoise), 4.0) * 0.5;
      
      vec3 color = mix(uColorDeep, uColorGold, intensity);
      color += sheen * vec3(1.0, 0.95, 0.8); // Specular highlight
      
      // Subtle vignette
      float dist = distance(vUv, vec2(0.5));
      color *= smoothstep(1.2, 0.2, dist);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

const SilkBackground = () => {
  const meshRef = useRef();
  const { size } = useThree();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorGold: { value: new THREE.Color('#c5a059') }, // Premium muted gold
    uColorDeep: { value: new THREE.Color('#0a0a0a') }, // Deep luxury black/brown
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), [size]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[20, 12, 128, 128]} />
      <shaderMaterial 
        args={[LuxurySilkShader]}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

const Background3D = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      background: '#000',
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <SilkBackground />
      </Canvas>
      {/* Premium grain overlay for texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.03,
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")',
      }} />
    </div>
  );
};

export default Background3D;
