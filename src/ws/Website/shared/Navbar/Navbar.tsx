import { useState } from 'react'
import { TfiAlignJustify } from 'react-icons/tfi'

import { useIsMobile } from '../../../../helpers/MobileHelper'
import { sanitizeUrl } from '../../../../helpers/sanitizer'
import './Navbar.css'

export interface NavbarProps {
    personalWebsite: string;
    url: string;
}

const Navbar = ({ personalWebsite, url }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useIsMobile();

    function toggleMenu() {
        setIsMenuOpen((prev) => !prev);
    }

    // animación manual: evita que el SO fuerce scroll instantáneo vía prefers-reduced-motion
    function smoothScrollTo(targetY: number, duration = 600) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();

        function step(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            window.scrollTo(0, startY + distance * ease);
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
        if (!href.startsWith('#')) return; // deja pasar links externos (ej. personalWebsite)

        const target = document.querySelector<HTMLElement>(href);
        if (!target) return;

        event.preventDefault();
        const scrollMarginTop = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        const targetY = target.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
        smoothScrollTo(targetY);
        setIsMenuOpen(false);
    }

    return (
        <>
            <section id="menu" className={`${isMobile ? '' : 'menu-fixed'}`}>
                <nav id="navbar">
                    <div className="options">
                        <div className={`btn-container ${isMobile ? '' : 'hide'}`}>
                            <button type="button" className="btn btn-dark" onClick={toggleMenu}><TfiAlignJustify /></button>
                        </div>
                        <ul id="menu-list" className={isMobile ? (isMenuOpen ? 'open' : 'close') : 'list-open'}>
                            <li><a href="#profile" onClick={(e) => handleNavClick(e, '#profile')}>Profile</a></li>
                            <li><a href="#proyects" onClick={(e) => handleNavClick(e, '#proyects')}>Projects</a></li>
                            <li><a href="#social" onClick={(e) => handleNavClick(e, '#social')}>Social Networks</a></li>
                            <li>
                                <a href={sanitizeUrl(url)} target="_blank" rel="noopener noreferrer">
                                    {personalWebsite}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </section>
        </>
    );
};

export default Navbar;