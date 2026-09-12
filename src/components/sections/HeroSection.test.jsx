import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import HeroSection from './HeroSection'

describe('HeroSection', () => {
  it('renders primary navigation actions for UrDU Youth Union', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /yetakchilar kengashi/i })).toHaveAttribute('href', '/tuzilma')
    expect(screen.getByRole('link', { name: /safimizga qo‘shiling/i })).toHaveAttribute('href', '/boglanish')
  })
})
