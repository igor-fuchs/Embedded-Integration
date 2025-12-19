import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Contact from '../Contact'

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('open', vi.fn())

    render(<Contact />)
  })

  describe('Render', () => {
    it('Rendering title', () => {
      expect(screen.getByText('Contact')).toBeInTheDocument()

    })

    it('Rendering subtitle', () => {
      expect(screen.getByText('ContactSubtitle')).toBeInTheDocument()
    })

    it('Rendering collaboration card', () => {
      expect(screen.getByText('ConnectCollaborate')).toBeInTheDocument() // title
      expect(screen.getByText('ConnectCollaborateDescription')).toBeInTheDocument() // description
    })

    it('Rendering action buttons', () => {
      expect(screen.getByTestId('btn-repository')).toBeInTheDocument()
      expect(screen.getByTestId('btn-contact')).toBeInTheDocument()
    })
  })

  describe('Interactions', () => {
    it('Open the GitHub repository in a new tab when clicking the button', async () => {
      const user = userEvent.setup()
      const openSpy = vi.spyOn(window, 'open')

      const githubButton = screen.getByTestId('btn-repository')
      await user.click(githubButton)

      expect(openSpy).toHaveBeenCalledWith( // melhorar verificação da URL
        'https://github.com/igor-fuchs',
        '_blank'
      )
    })

    it('botão de contato é clicável', async () => {
      const user = userEvent.setup()

      const contactButton = screen.getByRole('button', { name: /contact me/i })
      await user.click(contactButton)

      // Se tiver lógica no futuro, adicione expect aqui
      expect(contactButton).toBeInTheDocument()
    })
  })

  describe('Acessibilidade', () => {
    it('link do LinkedIn tem aria-label', () => {
      const linkedinLink = screen.getByLabelText('LinkedIn')
      expect(linkedinLink).toBeInTheDocument()
    })

    it('link do LinkedIn abre em nova aba', () => {
      const linkedinLink = screen.getByLabelText('LinkedIn')
      expect(linkedinLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/igor-fuchs-pereira/')
    })

    it('imagens têm texto alternativo', () => {
      expect(screen.getByAltText('GitHub Repository')).toBeInTheDocument()
      expect(screen.getByAltText('Contact Icon')).toBeInTheDocument()
    })

    it('tem um id para navegação', () => {
      const { container } = render(<Contact />) // melhorar a renderização para este teste
      const section = container.querySelector('#Contact')
      expect(section).toBeInTheDocument()
    })
  })

  describe('Estrutura', () => {
    it('renderiza dentro do StyleContact', () => {
      const { container } = render(<Contact />) // melhorar a renderização para este teste
      expect(container.querySelector('#Contact')).toBeInTheDocument()
    })

    it('renderiza o container de contato', () => {
      const { container } = render(<Contact />) // melhorar a renderização para este teste
      expect(container.querySelector('.contact-container')).toBeInTheDocument()
    })
  })
})