import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, Float, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { getProject, val } from '@theatre/core';
import { SheetProvider, PerspectiveCamera, editable as e } from '@theatre/r3f';

const project = getProject('LuxeProject', { 
  state: {
    "definitionVersion": "0.4.0",
    "sheetsById": {
      "Scene": {
        "staticOverrides": { "byObjectKey": {} },
        "sequence": {
          "subUnitsByObjectKey": {},
          "length": 10,
          "type": "PositionalSequence"
        }
      }
    }
  }
});
const sheet = project.sheet('Scene');

const Scene3D = ({ progress, filter }) => {
  // Sync scroll progress to theatre timeline (sequenced)
  useEffect(() => {
    if (sheet.sequence.position !== progress) {
      // Map progress 0.5 - 1.0 to timeline 0 - 6s
      const theatreProgress = Math.max(0, (progress - 0.5) / 0.5);
      sheet.sequence.position = theatreProgress * 6;
    }
  }, [progress]);

  return (
    <motion.div className="three-container" style={{ 
      opacity: progress > 0.5 ? 1 : 0,
      pointerEvents: progress > 0.9 ? 'auto' : 'none',
      filter: filter
    }}>
      <Canvas>
        <SheetProvider sheet={sheet}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} theatreKey="Camera" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            {/* Phrase 1: Elegant Weddings */}
            <e.group theatreKey="Phrase1">
              <Text 
                fontSize={0.6} 
                color="#d4af37" 
                anchorY="bottom"
                fillOpacity={progress > 0.55 && progress < 0.78 ? 1 : 0}
              >
                ELEGANT
              </Text>
              <Text 
                fontSize={0.6} 
                color="#fff" 
                position={[0, -0.7, 0]}
                anchorY="top"
                fillOpacity={progress > 0.55 && progress < 0.78 ? 1 : 0}
              >
                WEDDINGS
              </Text>
            </e.group>
            
            {/* Phrase 2: Unforgettable Memories */}
            <e.group theatreKey="Phrase2">
              <Text 
                fontSize={0.5} 
                color="#d4af37" 
                anchorY="bottom"
                fillOpacity={progress > 0.8 ? 1 : 0}
              >
                UNFORGETTABLE
              </Text>
              <Text 
                fontSize={0.5} 
                color="#fff" 
                position={[0, -0.6, 0]}
                anchorY="top"
                fillOpacity={progress > 0.8 ? 1 : 0}
              >
                MEMORIES
              </Text>
            </e.group>
          </Float>
          
          <Environment preset="city" />
        </SheetProvider>
      </Canvas>
    </motion.div>
  );
};

export default Scene3D;
