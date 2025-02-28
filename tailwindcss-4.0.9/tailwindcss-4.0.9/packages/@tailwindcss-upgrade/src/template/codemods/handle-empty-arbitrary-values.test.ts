import { __unstable__loadDesignSystem } from '@tailwindcss/node'
import { expect, test } from 'vitest'
import { handleEmptyArbitraryValues } from './handle-empty-arbitrary-values'
import { prefix } from './prefix'

test.each([
  ['group-[]:flex', 'group-[&]:flex'],
  ['group-[]/name:flex', 'group-[&]/name:flex'],

  ['peer-[]:flex', 'peer-[&]:flex'],
  ['peer-[]/name:flex', 'peer-[&]/name:flex'],
])('%s => %s (%#)', async (candidate, result) => {
  let designSystem = await __unstable__loadDesignSystem('@import "tailwindcss";', {
    base: __dirname,
  })

  expect(handleEmptyArbitraryValues(designSystem, {}, candidate)).toEqual(result)
})

test.each([
  ['group-[]:tw-flex', 'tw:group-[&]:flex'],
  ['group-[]/name:tw-flex', 'tw:group-[&]/name:flex'],

  ['peer-[]:tw-flex', 'tw:peer-[&]:flex'],
  ['peer-[]/name:tw-flex', 'tw:peer-[&]/name:flex'],
])('%s => %s (%#)', async (candidate, result) => {
  let designSystem = await __unstable__loadDesignSystem('@import "tailwindcss" prefix(tw);', {
    base: __dirname,
  })

  expect(
    [handleEmptyArbitraryValues, prefix].reduce(
      (acc, step) => step(designSystem, { prefix: 'tw-' }, acc),
      candidate,
    ),
  ).toEqual(result)
})
