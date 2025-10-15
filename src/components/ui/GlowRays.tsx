// src/components/ui/GlowRays.tsx
"use client";

// src/components/ui/GlowRays.tsx (Line 5)

import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Side = "left" | "right" | "both";

interface GlowRaysProps {
  /** The side(s) from which the glow rays should emanate. */
  side?: Side;
  /** The number of ray elements to generate. */
  rayCount?: number;
  /** The base animation duration in seconds. */
  baseDur?: number;
}

// Custom simple random number generator for consistent server/client render
// This helps prevent hydration issues for static decorative values.
function simpleRandom(seed: number) {
  let t = seed;
  return function () {
    t = (t * 9301 + 49297) % 233280;
    return t / 233280;
  };
}

export default function GlowRays({
  side = "both",
  rayCount = 10,
  baseDur = 45,
}: GlowRaysProps) {
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true once mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate random data for rays using a seed
  const rayData = useMemo(() => {
    // We use a fixed seed here, but we ensure the rendering only happens on the client
    // if using this component outside of the strict rules of useMemo
    const rng = simpleRandom(1234); 
    const data = [];
    
    // Total rays is calculated to ensure even distribution if side is 'both'
    const totalRays = side === "both" ? rayCount * 2 : rayCount;

    for (let i = 0; i < totalRays; i++) {
      // Determines which side the ray comes from (alternates if side === 'both')
      const sourceSide = (side === "both" && i % 2 === 0) ? "left" : "right";
      
      data.push({
        key: i,
        // Random width between 0.5% and 1.5% of the viewport width
        width: `${(rng() * 1 + 0.5).toFixed(2)}vw`, 
        // Random horizontal offset
        offset: `${(rng() * 95).toFixed(2)}%`, 
        // Random animation duration
        duration: `${(baseDur + rng() * 15 - 7.5).toFixed(2)}s`,
        // Random animation delay
        delay: `${(rng() * baseDur * -1).toFixed(2)}s`,
        // Source side
        side: sourceSide,
      });
    }
    return data;
  }, [side, rayCount, baseDur]);

  if (!isClient) {
      // Renders nothing on the server
      return null; 
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {rayData.map((ray) => {
        // Only render rays that match the requested side prop
        if (side !== "both" && ray.side !== side) {
          return null;
        }

        const isLeft = ray.side === "left";

        return (
          <motion.div
            key={ray.key}
            className="glow-ray absolute h-full z-0 opacity-10"
            // Start position (left or right)
            style={{
              width: ray.width,
              // Use left/right CSS properties based on side
              [isLeft ? 'left' : 'right']: ray.offset,
              // Start animation from the top (off-screen)
              top: "-100%", 
              // Set the glow color/style
              background: `linear-gradient(to bottom, ${isLeft ? 'rgba(6, 182, 212, 0.4)' : 'rgba(16, 185, 129, 0.4)'}, transparent)`,
            }}
            // Framer Motion animation properties (replaces CSS keyframes)
            initial={{ y: 0 }}
            animate={{ 
                // Animate Y position from top to far bottom (200% of height)
                y: "200vh", 
                // Animate opacity up and down (subtle flicker)
                opacity: [0.1, 0.2, 0.08, 0.15, 0.1],
            }}
            transition={{
              duration: parseFloat(ray.duration),
              delay: parseFloat(ray.delay),
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}