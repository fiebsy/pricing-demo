'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { LandingHero } from '@/app/playground/landing-hero/core/landing-hero'
import { DEFAULT_LANDING_HERO_CONFIG } from '@/app/playground/landing-hero/config/presets'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ParticleShape = 'circle' | 'square' | 'star'

interface ParticleConfig {
  count: number
  distance: { min: number; max: number }
  size: { min: number; max: number }
  duration: { min: number; max: number }
}

interface Particle {
  id: number
  x: number
  y: number
  color: string
  size: number
  tx: number
  ty: number
  rotation: number
  duration: number
  shape: ParticleShape
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ec4899', '#10b981', '#f43f5e', '#22c55e', '#eab308']
const PARTICLE_SHAPES: ParticleShape[] = ['circle', 'square', 'star']

const PARTICLE_CONFIG = {
  normal: { count: 16, distance: { min: 40, max: 100 }, size: { min: 4, max: 10 }, duration: { min: 0.4, max: 0.8 } },
  hovered: { count: 32, distance: { min: 80, max: 180 }, size: { min: 6, max: 14 }, duration: { min: 0.6, max: 1.2 } },
} as const

const SHAPE_BORDER_RADIUS: Record<ParticleShape, string> = {
  circle: '50%',
  square: '3px',
  star: '2px',
}

const TEXT_FLASH_DURATION = 300
const PARTICLE_LIFETIME = 1200

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function randomFrom<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function createParticle(x: number, y: number, index: number, config: ParticleConfig): Particle {
  const angle = randomBetween(0, Math.PI * 2)
  const distance = randomBetween(config.distance.min, config.distance.max)

  return {
    id: Date.now() + index,
    x,
    y,
    color: randomFrom(COLORS),
    size: randomBetween(config.size.min, config.size.max),
    tx: Math.cos(angle) * distance,
    ty: Math.sin(angle) * distance - randomBetween(20, 60),
    rotation: randomBetween(-720, 720),
    duration: randomBetween(config.duration.min, config.duration.max),
    shape: randomFrom(PARTICLE_SHAPES),
  }
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function HomePage(): React.ReactElement {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const [textColor, setTextColor] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Force video to load first frame on mount (needed for mobile)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      // Seek slightly to force first frame render
      videoRef.current.currentTime = 0.001
    }
  }, [])

  // Video starts immediately on pointer down (press) for responsiveness
  const handlePointerDown = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }, [])

  // Confetti spawns on click (release) - separate from video
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const config = isHovered ? PARTICLE_CONFIG.hovered : PARTICLE_CONFIG.normal
      const newParticles = Array.from({ length: config.count }, (_, i) =>
        createParticle(e.clientX, e.clientY, i, config)
      )
      const newParticleIds = new Set(newParticles.map((p) => p.id))

      setParticles((prev) => [...prev, ...newParticles])

      setTextColor(randomFrom(COLORS))
      setTimeout(() => setTextColor(null), TEXT_FLASH_DURATION)

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticleIds.has(p.id)))
      }, PARTICLE_LIFETIME)
    },
    [isHovered]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    // Eagerly ensure video is fully loaded for faster playback on click
    if (videoRef.current && videoRef.current.readyState < 4) {
      videoRef.current.load()
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  const handleVideoEnded = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }, [])

  return (
    <>
      <LandingHero
        config={DEFAULT_LANDING_HERO_CONFIG}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        videoRef={videoRef}
        onVideoEnded={handleVideoEnded}
        glowColorOverride={textColor}
      >
        <p
          className="text-xl font-medium text-primary transition-colors duration-300"
          style={{
            opacity: isHovered ? 1 : 0.5,
            color: textColor || undefined,
          }}
        >
          i like skwircles
        </p>
      </LandingHero>

      {/* Confetti particles */}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="confetti-particle pointer-events-none fixed z-50"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: SHAPE_BORDER_RADIUS[particle.shape],
            transform: particle.shape === 'star' ? 'rotate(45deg)' : undefined,
            '--tx': `${particle.tx}px`,
            '--ty': `${particle.ty}px`,
            '--rotation': `${particle.rotation}deg`,
            '--duration': `${particle.duration}s`,
          } as React.CSSProperties}
        />
      ))}

      <style jsx>{`
        .confetti-particle {
          animation: confetti-goofy var(--duration) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes confetti-goofy {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) rotate(var(--rotation)) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
