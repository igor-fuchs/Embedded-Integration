import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Contact from '../Contact'

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock do window.open
    vi.stubGlobal('open', vi.fn())
  })

  describe('Renderização', () => {
    it('renderiza o título da seção', () => {
      render(<Contact />)
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    it('renderiza o subtítulo', () => {
      render(<Contact />)
      expect(screen.getByText('Get in touch with me')).toBeInTheDocument()
    })

    it('renderiza os botões de ação', () => {
      render(<Contact />)
      expect(screen.getByRole('button', { name: /view repository/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /contact me/i })).toBeInTheDocument()
    })

    it('renderiza o card de colaboração', () => {
      render(<Contact />)
      expect(screen.getByText('Let\'s Connect & Collaborate')).toBeInTheDocument()
      expect(screen.getByText('I\'m always open to new opportunities')).toBeInTheDocument()
    })
  })

  describe('Interações', () => {
    it('abre o GitHub em nova aba ao clicar no botão', async () => {
      const user = userEvent.setup()
      const openSpy = vi.spyOn(window, 'open')
      
      render(<Contact />)
      
      const githubButton = screen.getByRole('button', { name: /view repository/i })
      await user.click(githubButton)
      
      expect(openSpy).toHaveBeenCalledWith(
        'https://github.com/igor-fuchs',
        '_blank'
      )
    })

    it('botão de contato é clicável', async () => {
      const user = userEvent.setup()
      render(<Contact />)
      
      const contactButton = screen.getByRole('button', { name: /contact me/i })
      await user.click(contactButton)
      
      // Se tiver lógica no futuro, adicione expect aqui
      expect(contactButton).toBeInTheDocument()
    })
  })

  describe('Acessibilidade', () => {
    it('link do LinkedIn tem aria-label', () => {
      render(<Contact />)
      const linkedinLink = screen.getByLabelText('LinkedIn')
      expect(linkedinLink).toBeInTheDocument()
    })

    it('link do LinkedIn abre em nova aba', () => {
      render(<Contact />)
      const linkedinLink = screen.getByLabelText('LinkedIn')
      expect(linkedinLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/igor-fuchs-pereira/')
    })

    it('imagens têm texto alternativo', () => {
      render(<Contact />)
      expect(screen.getByAltText('GitHub Repository')).toBeInTheDocument()
      expect(screen.getByAltText('Contact Icon')).toBeInTheDocument()
    })

    it('tem um id para navegação', () => {
      const { container } = render(<Contact />)
      const section = container.querySelector('#Contact')
      expect(section).toBeInTheDocument()
    })
  })

  describe('Estrutura', () => {
    it('renderiza dentro do StyleContact', () => {
      const { container } = render(<Contact />)
      expect(container.querySelector('#Contact')).toBeInTheDocument()
    })

    it('renderiza o container de contato', () => {
      const { container } = render(<Contact />)
      expect(container.querySelector('.contact-container')).toBeInTheDocument()
    })
  })
})