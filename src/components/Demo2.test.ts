// Counter.spec.ts
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import Counter from './Demo.vue'

describe('Counter (Vue Testing Library)', () => {
  it('renders initial state', () => {
    render(Counter)

    // Heading shows the current value
    expect(
      screen.getByRole('heading', { name: /counter:\s*0/i })
    ).toBeInTheDocument()

    const inc = screen.getByRole('button', { name: /increase counter by 1/i })
    const dec = screen.getByRole('button', { name: /decrease counter by 1/i })

    expect(inc).toBeEnabled()
    expect(dec).toBeDisabled()
  })

  it('increments when "+1" is clicked', async () => {
    const user = userEvent.setup()
    render(Counter)

    const inc = screen.getByRole('button', { name: /increase counter by 1/i })
    await user.click(inc)

    expect(
      screen.getByRole('heading', { name: /counter:\s*1/i })
    ).toBeInTheDocument()
  })

  it('does not decrement below 0 and keeps "-1" disabled at 0', async () => {
    const user = userEvent.setup()
    render(Counter)

    const dec = screen.getByRole('button', { name: /decrease counter by 1/i })
    expect(dec).toBeDisabled()

    // Clicking a disabled button should not change anything
    await user.click(dec)

    expect(
      screen.getByRole('heading', { name: /counter:\s*0/i })
    ).toBeInTheDocument()
    expect(dec).toBeDisabled()
  })

  it('decrements when "-1" is clicked above 0', async () => {
    const user = userEvent.setup()
    render(Counter)

    const inc = screen.getByRole('button', { name: /increase counter by 1/i })
    const dec = screen.getByRole('button', { name: /decrease counter by 1/i })

    await user.click(inc)
    expect(
      screen.getByRole('heading', { name: /counter:\s*1/i })
    ).toBeInTheDocument()

    expect(dec).toBeEnabled()
    await user.click(dec)

    expect(
      screen.getByRole('heading', { name: /counter:\s*0/i })
    ).toBeInTheDocument()
    expect(dec).toBeDisabled()
  })

  it('disables "+1" at 20 and prevents going above 20', async () => {
    const user = userEvent.setup()
    render(Counter)

    const inc = screen.getByRole('button', { name: /increase counter by 1/i })

    // Click up to 20
    for (let i = 0; i < 20; i++) {
      await user.click(inc)
    }

    expect(
      screen.getByRole('heading', { name: /counter:\s*20/i })
    ).toBeInTheDocument()
    expect(inc).toBeDisabled()

    // Extra click shouldn't change
    await user.click(inc)
    expect(
      screen.getByRole('heading', { name: /counter:\s*20/i })
    ).toBeInTheDocument()
  })

  it('has a11y-friendly structure (controls are grouped and heading is live)', () => {
    render(Counter)

    // group container (role="group" + accessible name)
    expect(
      screen.getByRole('group', { name: /counter controls/i })
    ).toBeInTheDocument()

    // heading live region attributes
    const heading = screen.getByRole('heading', { name: /counter:/i })
    expect(heading).toHaveAttribute('aria-live', 'polite')
    expect(heading).toHaveAttribute('aria-atomic', 'true')
  })
})
