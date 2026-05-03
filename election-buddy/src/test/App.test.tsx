import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

const renderWithRouter = () =>
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )

describe('App - Election Buddy', () => {
  it('renders without crashing', () => {
    renderWithRouter()
    expect(document.body).toBeInTheDocument()
  })

  it('renders main heading or title', () => {
    renderWithRouter()
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })
})