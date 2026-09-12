import { describe, expect, it } from 'vitest'
import { navItems, teamMembers, directionsData, universityStats, profile } from './siteData'

describe('siteData for UrDU Yoshlar Ittifoqi', () => {
  it('has valid profile and organization info', () => {
    expect(profile.brand).toContain('UrDU')
    expect(profile.university).toBe('Urganch Davlat Universiteti')
    expect(profile.city).toBe('Urganch')
  })

  it('contains valid navigation items', () => {
    expect(Array.isArray(navItems)).toBe(true)
    expect(navItems.length).toBeGreaterThanOrEqual(4)
    expect(navItems.some((item) => item.id === 'team')).toBe(true)
    expect(navItems.some((item) => item.id === 'directions')).toBe(true)
  })

  it('contains team members with required attributes', () => {
    expect(Array.isArray(teamMembers)).toBe(true)
    expect(teamMembers.length).toBeGreaterThan(0)

    teamMembers.forEach((member) => {
      expect(member.id).toBeTruthy()
      expect(member.name).toBeTruthy()
      expect(member.role).toBeTruthy()
      expect(member.faculty).toBeTruthy()
      expect(member.telegram).toBeTruthy()
    })
  })

  it('has unique team member ids', () => {
    const ids = teamMembers.map((m) => m.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('contains directions and stats', () => {
    expect(directionsData.length).toBeGreaterThanOrEqual(4)
    expect(universityStats.length).toBeGreaterThanOrEqual(3)
  })
})
