// Counter.spec.ts
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from './Demo.vue'

const getHeadingText = (wrapper: ReturnType<typeof mount>) =>
  wrapper.get('h2').text()

describe('Counter', () => {
  it('renders initial state', () => {
    const wrapper = mount(Counter)

    expect(getHeadingText(wrapper)).toBe('Counter: 0')

    const inc = wrapper.get('button[aria-label="Increase counter by 1"]')
    const dec = wrapper.get('button[aria-label="Decrease counter by 1"]')

    expect(inc.attributes('disabled')).toBeUndefined()
    expect(dec.attributes('disabled')).toBeDefined()
  })

  it('increments when "+1" is clicked', async () => {
    const wrapper = mount(Counter)

    const inc = wrapper.get('button[aria-label="Increase counter by 1"]')
    await inc.trigger('click')

    expect(getHeadingText(wrapper)).toBe('Counter: 1')
  })

  it('does not decrement below 0 and disables "-1" at 0', async () => {
    const wrapper = mount(Counter)

    const dec = wrapper.get('button[aria-label="Decrease counter by 1"]')

    // disabled at 0
    expect(dec.attributes('disabled')).toBeDefined()

    // even if a click is triggered, state should not change
    await dec.trigger('click')
    expect(getHeadingText(wrapper)).toBe('Counter: 0')
  })

  it('decrements when "-1" is clicked above 0', async () => {
    const wrapper = mount(Counter)

    const inc = wrapper.get('button[aria-label="Increase counter by 1"]')
    const dec = wrapper.get('button[aria-label="Decrease counter by 1"]')

    await inc.trigger('click') // 1
    expect(getHeadingText(wrapper)).toBe('Counter: 1')

    expect(dec.attributes('disabled')).toBeUndefined()
    await dec.trigger('click') // back to 0
    expect(getHeadingText(wrapper)).toBe('Counter: 0')
    expect(dec.attributes('disabled')).toBeDefined()
  })

  it('disables "+1" at 20 and prevents going above 20', async () => {
    const wrapper = mount(Counter)

    const inc = wrapper.get('button[aria-label="Increase counter by 1"]')

    // click up to 20
    for (let i = 0; i < 20; i++) {
      await inc.trigger('click')
    }

    expect(getHeadingText(wrapper)).toBe('Counter: 20')
    expect(inc.attributes('disabled')).toBeDefined()

    // even if we try clicking again, it should stay at 20
    await inc.trigger('click')
    expect(getHeadingText(wrapper)).toBe('Counter: 20')
  })
})
