'use client'

/**
 * Character Avatars Playground
 *
 * Displays character avatar headshots fetched from TMDB credits.
 * Live-action characters show actor headshots; anime characters
 * fall back to origin poster thumbnails.
 *
 * Route: /playground/character-avatars
 */

import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import type { CharacterAvatarsConfig, CharacterEntry } from './config/types'
import { DEFAULT_CONFIG, PRESETS } from './config/presets'
import { CHARACTERS, getCharacterAvatarPath } from './config/characters'
import { buildPanelConfig } from './panels/panel-config'

// =============================================================================
// REALM BADGE COLORS
// =============================================================================

const REALM_COLORS: Record<string, string> = {
  marvel: 'bg-red-500/20 text-red-400',
  anime: 'bg-violet-500/20 text-violet-400',
  westeros: 'bg-amber-500/20 text-amber-400',
}

// =============================================================================
// AVATAR CARD
// =============================================================================

function AvatarCard({
  character,
  config,
}: {
  character: CharacterEntry
  config: CharacterAvatarsConfig
}) {
  const [errored, setErrored] = useState(false)
  const { width, height, borderRadius, shape, showLabel, showBadge } = config
  const src = getCharacterAvatarPath(character.slug)
  const radius = shape === 'circle' ? '50%' : borderRadius

  return (
    <div className="flex flex-col items-center" style={{ gap: config.labelGap }}>
      {/* Avatar */}
      {errored ? (
        <div
          className="bg-tertiary text-tertiary flex shrink-0 items-center justify-center text-[10px] font-medium"
          style={{ width, height, borderRadius: radius }}
        >
          ?
        </div>
      ) : (
        <Image
          src={src}
          alt={character.name}
          width={width}
          height={height}
          className="shrink-0 object-cover"
          style={{ width, height, borderRadius: radius }}
          onError={() => setErrored(true)}
        />
      )}

      {/* Label */}
      {showLabel && (
        <span
          className="text-secondary truncate text-center text-[11px] font-medium leading-tight"
          style={{ maxWidth: width + 16 }}
        >
          {character.name}
        </span>
      )}

      {/* Badge */}
      {showBadge && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium leading-tight ${REALM_COLORS[character.realm] ?? 'bg-tertiary text-tertiary'}`}
        >
          {character.factionLabel}
        </span>
      )}
    </div>
  )
}

// =============================================================================
// PAGE
// =============================================================================

export default function CharacterAvatarsPlayground() {
  const [config, setConfig] = useState<CharacterAvatarsConfig>(DEFAULT_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('headshot-grid')

  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => ({ ...prev, [event.controlId]: event.value }))
    setActivePresetId(null)
  }, [])

  const handlePresetChange = useCallback((presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG)
    setActivePresetId('headshot-grid')
  }, [])

  const panelConfig = useMemo(
    () => buildPanelConfig(config, PRESETS, activePresetId),
    [config, activePresetId],
  )

  const filteredCharacters = useMemo(
    () =>
      config.realmFilter === 'all'
        ? CHARACTERS
        : CHARACTERS.filter((c) => c.realm === config.realmFilter),
    [config.realmFilter],
  )

  return (
    <div className="relative min-h-screen bg-primary">
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleChange}
        onPresetChange={handlePresetChange}
        onReset={handleReset}
        getConfigForCopy={() => config}
      />

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-lg font-semibold text-primary">Character Avatars</h1>
          <p className="mt-1 text-sm text-secondary">
            {filteredCharacters.length} character headshots from TMDB credits.
            {config.realmFilter !== 'all' && ` Filtered to ${config.realmFilter}.`}
          </p>
        </div>

        {/* Realm legend */}
        <div className="mb-6 flex items-center gap-4">
          {['marvel', 'anime', 'westeros'].map((realm) => {
            const count = CHARACTERS.filter((c) => c.realm === realm).length
            return (
              <span key={realm} className="flex items-center gap-1.5">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    realm === 'marvel'
                      ? 'bg-red-400'
                      : realm === 'anime'
                        ? 'bg-violet-400'
                        : 'bg-amber-400'
                  }`}
                />
                <span className="text-xs text-secondary capitalize">
                  {realm} ({count})
                </span>
              </span>
            )
          })}
        </div>

        {/* Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))`,
            gap: config.gap,
            paddingInline: config.paddingX,
            paddingBlock: config.paddingY,
          }}
        >
          {filteredCharacters.map((character) => (
            <AvatarCard key={character.slug} character={character} config={config} />
          ))}
        </div>
      </div>
    </div>
  )
}
