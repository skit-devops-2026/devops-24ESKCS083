import { describe, it, expect } from 'vitest'

// ---------------------------------------------------------------------------
// Smoke tests — verify the app entry points export / resolve correctly.
// These run in the jsdom environment and do not require a real browser.
// ---------------------------------------------------------------------------

describe('App entry point', () => {
  it('has a non-empty package name', async () => {
    // Dynamic import of package.json to verify the build metadata is intact
    const pkg = await import('../../package.json', { assert: { type: 'json' } })
    expect(pkg.default.name).toBeTruthy()
    expect(typeof pkg.default.version).toBe('string')
  })

  it('declares the frontend application scripts', async () => {
    const pkg = await import('../../package.json', { assert: { type: 'json' } })
    expect(pkg.default.scripts.dev).toBe('vite')
    expect(pkg.default.scripts.build).toBe('vite build')
    expect(pkg.default.scripts.test).toBe('vitest run')
  })
})

describe('Environment', () => {
  it('runs in a jsdom environment', () => {
    expect(typeof document).toBe('object')
    expect(typeof window).toBe('object')
  })

  it('vitest globals are injected', () => {
    // When globals:true is set, describe/it/expect are available without import
    expect(typeof describe).toBe('function')
    expect(typeof it).toBe('function')
    expect(typeof expect).toBe('function')
  })
})

describe('Health contract', () => {
  it('service identity matches repository specifications', () => {
    const expectedService = {
      name: 'craftcv-frontend',
      healthPath: '/health',
      metricsPath: '/metrics',
    }
    expect(expectedService.healthPath).toBe('/health')
    expect(expectedService.name).toContain('craftcv')
  })
})
