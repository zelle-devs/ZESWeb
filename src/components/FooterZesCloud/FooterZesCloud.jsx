'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowUp } from 'lucide-react';
import './FooterZesCloud.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
// import { usePageTransition } from '@/app/TransitionContext';
import { footerLinkGroups } from '@/app/navData'; // shared with Header

function FooterZesCloud() {
  const [openSectionId, setOpenSectionId] = useState(null);
  const [isInView, setIsInView] = useState(false);
  // Fallback year for the prerendered HTML; updated to the real year on mount
  const [year, setYear] = useState(2026);
  const footerRef = useRef(null);
  // const { navigate } = usePageTransition();

  // Read the current year on the client (avoids the prerender `new Date()` error)
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Plays the entrance animation once, when the footer scrolls into view
  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    // Fallback for very old browsers without IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggleSection = (id) => {
    setOpenSectionId((prev) => (prev === id ? null : id));
  };

  const handleNav = (e, href, label) => {
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className={`footerWrapperzescloudMainFooter ${isInView ? 'isInViewzescloudMainFooter' : ''
        }`}
    >
      {/* ---------- Decorative background layers (non-interactive) ---------- */}
      <div className="bgLayerszescloudMainFooter" aria-hidden="true">
        <div className="glowzescloudMainFooter" />

        <div className="bgImageWrapzescloudMainFooter">
          <img
            src="/main_logoFav.png"
            alt=""
            className="bgImagezescloudMainFooter"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </div>

        <div className="gridzescloudMainFooter" />
        <div className="overlayzescloudMainFooter" />
        <span className="topLinezescloudMainFooter" />
      </div>

      {/* ---------- Main content ---------- */}
      <div className="containerzescloudMainFooter">
        <div
          className="brandColzescloudMainFooter revealzescloudMainFooter"
          style={{ '--delay': '0.1s' }}
        >
          <div className='MainFooterLogoMainDivzescloudMain'>
            <Link href="/" onClick={(e) => handleNav(e, '/', 'Home')}>
              <img
                src="/main_logo.png"
                alt="zescloud"
                className="logozescloudMainFooter"
              />
            </Link>
            <p className="taglinezescloudMainFooter">Ecommerce Without Limits</p>
          </div>

          <div className="socialszescloudMainFooter">
            <a href="#" className="socialLinkzescloudMainFooter" aria-label="Facebook">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="socialLinkzescloudMainFooter" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            {/* <a href="#" className="socialLinkzescloudMainFooter" aria-label="Twitter">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="socialLinkzescloudMainFooter" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </a>
            <a href="#" className="socialLinkzescloudMainFooter" aria-label="YouTube">
              <FaYoutube size={18} />
            </a> */}
          </div>
        </div>

        <div className="linksColGroupzescloudMainFooter">
          {footerLinkGroups.map((group, index) => {
            const isOpen = openSectionId === group.id;

            return (
              <div
                className="linkColzescloudMainFooter revealzescloudMainFooter"
                key={group.id}
                style={{ '--delay': `${0.2 + index * 0.1}s` }}
              >
                <button
                  type="button"
                  className={`colHeadingzescloudMainFooter ${isOpen ? 'isOpenzescloudMainFooter' : ''
                    }`}
                  onClick={() => toggleSection(group.id)}
                  aria-expanded={isOpen}
                >
                  {group.heading}
                  <ChevronDown
                    size={16}
                    className="colHeadingIconzescloudMainFooter"
                  />
                </button>

                <ul
                  className={`linkListzescloudMainFooter ${isOpen ? 'isOpenzescloudMainFooter' : ''
                    }`}
                >
                  {group.links.map((link) => (
                    <li className="linkItemzescloudMainFooter" key={link.label}>
                      <Link
                        href={link.href}
                        className="linkzescloudMainFooter"
                        onClick={(e) => handleNav(e, link.href, link.label)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="bottomBarzescloudMainFooter">
        <div className="bottomInnerzescloudMainFooter">
          <p className="copyrightzescloudMainFooter">
            © {year} zescloud. All rights reserved.
          </p>
          <button
            type="button"
            className="backToTopzescloudMainFooter"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default FooterZesCloud;