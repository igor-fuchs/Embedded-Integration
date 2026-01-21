import Contact, { LINKS } from './Contact'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('Contact Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<Contact />);
  })

  describe('Render', () => {
    it('Rendering title', () => {
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('Rendering subtitle', () => {
      expect(screen.getByText('ContactSubtitle')).toBeInTheDocument();
    });

    it('Rendering collaboration card', () => {
      expect(screen.getByText('ConnectCollaborate')).toBeInTheDocument();
      expect(screen.getByText('ConnectCollaborateDescription')).toBeInTheDocument();
    });

    it('Rendering action buttons', () => {
      expect(screen.getByTestId('btn-repository')).toBeInTheDocument();
      expect(screen.getByTestId('btn-contact')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    beforeEach(() => {
      vi.stubGlobal('open', vi.fn());
    });

    it('Open the GitHub repository in a new tab', async () => {
      const user = userEvent.setup();

      const githubButton = screen.getByTestId('btn-repository');
      await user.click(githubButton);

      expect(window.open).toHaveBeenCalledWith(
        LINKS.GITHUB,
        "_blank"
      );
    });

    it('Open contact me in a new tab', async () => {
      const user = userEvent.setup();

      const contactButton = screen.getByTestId('btn-contact');
      await user.click(contactButton);

      expect(window.open).toHaveBeenCalledWith(
        LINKS.EMAIL,
        "_blank"
      );
    });

    it('Open LinkedIn link in a new tab', async () => {
      const user = userEvent.setup();

      const linkedinButton = screen.getByTestId('btn-linkedin');
      await user.click(linkedinButton);

      expect(window.open).toHaveBeenCalledWith(
        LINKS.LINKEDIN,
        "_blank"
      );
    });
  });

  describe('Accessibility', () => {
    it('Repository button has accessible name', () => {
      expect(
        screen.getByRole('button', { name: /ViewRepository/i })
      ).toBeInTheDocument()
    });

    it('Contact button has accessible name', () => {
      expect(
        screen.getByRole('button', { name: /ContactMe/i })
      ).toBeInTheDocument()
    });

    it('LinkedIn button has accessible name', () => {
      expect(
        screen.getByRole('button', { name: /Open LinkedIn/i })
      ).toBeInTheDocument()
    });

    it('Section has an id to scroll to', () => {
      const section = screen.getByTestId('contact-section');
      expect(section).toHaveAttribute('id', 'Contact');
    });
  });
})