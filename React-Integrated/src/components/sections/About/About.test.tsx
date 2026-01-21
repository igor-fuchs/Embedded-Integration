import About from './About'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'

describe('About Component', () => {
    describe('Render', () => {
        beforeEach(() => {
            render(<About />)
        });

        it('Rendering title', () => {
            expect(screen.getByText('AboutTheProject')).toBeInTheDocument()
        });

        it('Rendering description', () => {
            expect(screen.getByText('AboutDescription')).toBeInTheDocument();
        });

        it('Rendering Industrial Integration card', () => {
            expect(screen.getByText('IndustrialIntegration')).toBeInTheDocument();
            expect(screen.getByText('IndustrialIntegrationDescription')).toBeInTheDocument();
        });

        it('Rendering Web Interface card', () => {
            expect(screen.getByText('WebInterface')).toBeInTheDocument();
            expect(screen.getByText('WebInterfaceDescription')).toBeInTheDocument();
        });

        it('Rendering diagram card', () => {
            expect(screen.getByText('Factory IO')).toBeInTheDocument();
            expect(screen.getByText('React')).toBeInTheDocument();
            expect(screen.getByText('TIA Portal')).toBeInTheDocument();
            expect(screen.getByText('Simulation')).toBeInTheDocument();
            expect(screen.getByText('Processing')).toBeInTheDocument();
            expect(screen.getByText('Interface')).toBeInTheDocument();
        });
    })

    describe('Animation', () => {
        it('Left side is animated', async () => {
            const { container } = render(<About />)
            const featuresColumn = container.querySelector('.features-column')
            
            // Initially should not have animate class
            expect(featuresColumn).toHaveClass('features-column')
            expect(featuresColumn).not.toHaveClass('animate')
            
            // Wait for IntersectionObserver to trigger and add animate class
            await waitFor(
                () => {
                    expect(featuresColumn).toHaveClass('animate')
                },
                { timeout: 200 }
            )
        })

        it('Right side is animated', async () => {
            const { container } = render(<About />)
            const diagramColumn = container.querySelector('.diagram-column')
            
            // Initially should not have animate class
            expect(diagramColumn).toHaveClass('diagram-column')
            expect(diagramColumn).not.toHaveClass('animate')
            
            // Wait for IntersectionObserver to trigger and add animate class
            await waitFor(
                () => {
                    expect(diagramColumn).toHaveClass('animate')
                },
                { timeout: 200 }
            )
        })
    })

    describe('Accessibility', () => {
        it('Industrial Icon image has alt text', () => {
            render(<About />)
            expect(screen.getByAltText('Industrial Icon')).toBeInTheDocument();
            expect(screen.getByAltText('Web Interface Icon')).toBeInTheDocument();
            expect(screen.getByAltText('Logo Embedded Integration')).toBeInTheDocument();
        })

        it('Section should have id attribute for scroll', () => {
            const { container } = render(<About />)
            const aboutSection = container.querySelector('[id="About"]')
            expect(aboutSection).toBeInTheDocument()
        })
    })
})