'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import './HeaderZesCloud.css';
import { navLinks } from '@/app/navData';

function HeaderZesCloud() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const closeDrawer = () => setIsDrawerOpen(false);

  const handleNav = (e, href) => {
    closeDrawer();

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (href.startsWith('#')) return;

    e.preventDefault();
    router.push(href);
  };

  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <svg
        width="0"
        height="0"
        style={{ position: 'absolute' }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter
            id="zescloud-glass-distortion"
            colorInterpolationFilters="sRGB"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.04"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="1.5" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <header
        className={`headerWrapperzescloudHeaderMain ${
          isScrolled ? 'isScrolledzescloudHeaderMain' : ''
        }`}
      >
        <div className="containerzescloudHeaderMain">
          <div className="logoAreazescloudHeaderMain">
            <Link href="/" onClick={(e) => handleNav(e, '/')}>
              <img
                src="/main_logo.png"
                alt="zescloud Logo"
                className="logoImgzescloudHeaderMain"
              />
            </Link>
            <div className="brandDividerzescloudHeaderMain"></div>
            <div className="taglineTextzescloudHeaderMain">
              <span>Ecommerce</span>
              <span>Without Limits</span>
            </div>
          </div>

          <nav className="centerNavzescloudHeaderMain">
            <ul className="navListzescloudHeaderMain">
              {navLinks.map((link) => (
                <li key={link.label} className="navItemzescloudHeaderMain">
                  <Link
                    href={link.href}
                    className={`navLinkzescloudHeaderMain ${
                      isLinkActive(link.href) ? 'activeNavLinkzescloud' : ''
                    }`}
                    onClick={(e) => handleNav(e, link.href)}
                  >
                    {link.label}
                    <span className="navLinkIndicator"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rightActionszescloudHeaderMain">
            <button
              className="drawerCtaBtnzescloudHeaderMain"
              onClick={(e) => handleNav(e, '/consultation')}
            >
              Book a Free Demo <ArrowRight size={16} />
            </button>
          </div>

          <button
            className="menuBtnzescloudHeaderMain"
            aria-label="Open menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div
        className={`drawerOverlayzescloudHeaderMain ${
          isDrawerOpen ? 'isOpenzescloudHeaderMain' : ''
        }`}
        onClick={closeDrawer}
      ></div>

      <aside
        className={`drawerPanelzescloudHeaderMain ${
          isDrawerOpen ? 'isOpenzescloudHeaderMain' : ''
        }`}
      >
        <div className="drawerHeaderzescloudHeaderMain">
          <img
            src="/main_logo.png"
            alt="zescloud Logo"
            className="drawerLogozescloudHeaderMain"
            onClick={(e) => handleNav(e, '/')}
          />
          <button
            className="drawerCloseBtnzescloudHeaderMain"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="drawerNavzescloudHeaderMain">
          <ul className="drawerNavListzescloudHeaderMain">
            {navLinks.map((link) => (
              <li key={link.label} className="drawerNavItemzescloudHeaderMain">
                <div className="drawerRowzescloudHeaderMain">
                  <Link
                    href={link.href}
                    className={isLinkActive(link.href) ? 'activeDrawerNavLinkzescloud' : ''}
                    onClick={(e) => handleNav(e, link.href)}
                  >
                    <span>{link.label}</span>
                    <span className="drawerActiveBadge"></span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawerFooterzescloudHeaderMain">
          <button
            className="drawerCtaBtnzescloudHeaderMain"
            onClick={(e) => handleNav(e, '/consultation')}
          >
            Book a Free Demo <ArrowRight size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}

export default HeaderZesCloud;