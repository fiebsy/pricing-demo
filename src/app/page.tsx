'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'

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
const GREETINGS = ['hi', 'sup', 'yo', 'ciao', 'hey', 'hola', 'oi', 'howdy', 'ahoy']
const OUCH_WORDS = ['ouch', 'oof', 'egh', 'ow', 'yikes', 'ack', 'oops', 'hey!']
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
const DEFAULT_TOOLTIP_COLOR = '#1a1a1a' // Matches bg-primary-solid

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
  const [greeting, setGreeting] = useState('hi')
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const config = isHovered ? PARTICLE_CONFIG.hovered : PARTICLE_CONFIG.normal
      const newParticles = Array.from({ length: config.count }, (_, i) =>
        createParticle(e.clientX, e.clientY, i, config)
      )
      const newParticleIds = new Set(newParticles.map((p) => p.id))

      setParticles((prev) => [...prev, ...newParticles])

      // Show ouch word on click
      setGreeting(randomFrom(OUCH_WORDS))

      setTextColor(randomFrom(COLORS))
      setTimeout(() => setTextColor(null), TEXT_FLASH_DURATION)

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticleIds.has(p.id)))
      }, PARTICLE_LIFETIME)
    },
    [isHovered]
  )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <BaseTooltip.Provider delay={0} closeDelay={0}>
        <BaseTooltip.Root open={tooltipOpen}>
          <BaseTooltip.Trigger
            onClick={handleClick}
            onMouseEnter={() => {
              setIsHovered(true)
              setGreeting(randomFrom(GREETINGS))
              setTooltipOpen(true)
            }}
            onMouseLeave={() => {
              setIsHovered(false)
              setTooltipOpen(false)
            }}
            className="cursor-pointer"
          >
            <div className="rounded-3xl corner-squircle bg-primary p-1 shine-3 transition-all duration-150 scale-100 active:scale-90 hover:shine-3-intense">
              <div className="overflow-hidden rounded-[20px] corner-squircle">
                <Image
                  src="/skwircle-kid.jpg"
                  alt="i like skwircles"
                  height={80}
                  width={142}
                  draggable={false}
                  className="pointer-events-none select-none"
                />
              </div>
            </div>
          </BaseTooltip.Trigger>

          {/* Tooltip disabled for now
          <AnimatePresence>
            {tooltipOpen && (
              <BaseTooltip.Portal keepMounted>
                <BaseTooltip.Positioner side="top" sideOffset={12} className="z-40">
                  <BaseTooltip.Popup
                    render={
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.1, ease: 'easeOut' }}
                      />
                    }
                    className="relative overflow-hidden rounded-lg corner-squircle px-2 pb-1 shine-1-shadow-lg transition-[width,background-color] duration-200 ease-out"
                    style={{ backgroundColor: textColor || DEFAULT_TOOLTIP_COLOR }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-lg"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.06) 100%)',
                      }}
                    />
                    <span className="relative text-xs font-semibold text-white whitespace-nowrap">
                      {greeting}
                    </span>
                  </BaseTooltip.Popup>
                </BaseTooltip.Positioner>
              </BaseTooltip.Portal>
            )}
          </AnimatePresence>
          */}
        </BaseTooltip.Root>
      </BaseTooltip.Provider>

      <p
        className="text-xl font-medium text-primary transition-colors duration-300"
        style={{
          opacity: isHovered ? 1 : 0.5,
          color: textColor || undefined
        }}
      >
        i like skwircles
      </p>

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
    </div>
  )
}
