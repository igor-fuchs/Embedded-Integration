import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock of react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}))
