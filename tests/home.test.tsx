import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Page from '../src/app/page'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => new Promise((resolve) => resolve({ userId: 'user_2NNNsdsfldl34nkdrISDL222' })),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNNsdsfldl34nkdrISDL222',
        fullName: 'Testodore the Third'
        },
    })
  }
})

test('Home', async () => {
  render(await Page())
  expect(screen.getByText('Get started')).toBeTruthy()
})