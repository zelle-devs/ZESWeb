'use client';

import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import {
  ArrowRight,
  Clock,
  Plus,
  ChevronDown,
  Search,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
} from 'lucide-react';
import {
  COUNTRIES,
  DEFAULT_COUNTRY_ISO,
  FAQS,
  getCountryByIso,
  extractDigits,
  stripDialCode,
  formatPhoneNumber,
  isPhoneComplete,
  getFullPhoneNumber,
} from './ContactUsFormQuickSection.js';
import './ContactUsFormQuickSection.css';

const SERVICE_OPTIONS = [
  { value: 'sales', label: 'Sales Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership' },
];

/* ---------- Right side contact cards ---------- */
const CONTACT_CARDS = [
  {
    id: 'email',
    icon: Mail,
    title: 'Email Us',
    text: 'For general inquiries and support.',
    value: 'hello@zescloud.com',
    href: 'mailto:hello@zescloud.com',
    copy: 'hello@zescloud.com',
  },
  {
    id: 'phone',
    icon: Phone,
    title: 'Call Us',
    text: 'Mon - Fri, 9AM - 6PM (EST)',
    value: '+1 (302) 555-0179',
    href: 'tel:+13025550179',
    copy: '+1 (302) 555-0179',
  },
  {
    id: 'office',
    icon: MapPin,
    title: 'Our Office',
    address: ['8 The Green, Suite A', 'Dover, DE 19901', 'United States'],
    linkLabel: 'Get Directions',
    href: 'https://www.google.com/maps/search/?api=1&query=8+The+Green+Suite+A+Dover+DE+19901',
  },
];

async function copyTextContactUsFormQuickSection(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    /* falls back below */
  }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch (err) {
    return false;
  }
}

function Flag({ country }) {
  const code = country.iso.toLowerCase();
  return (
    <img
      className="flagImgContactUsFormQuickSection"
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      alt=""
      width="20"
      height="15"
      loading="lazy"
      draggable="false"
      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
    />
  );
}

function ContactUsFormQuickSection() {
  /* ---------- form state ---------- */
  const [service, setService] = useState('');
  const [serviceOpen, setServiceOpen] = useState(false);
  const serviceRef = useRef(null);

  /* ---------- phone state ---------- */
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY_ISO);
  const [phoneDigits, setPhoneDigits] = useState(''); // raw digits only, no dial code
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');

  const phoneRef = useRef(null);
  const pickerRef = useRef(null);
  const searchRef = useRef(null);
  const activeOptionRef = useRef(null);
  const caretDigits = useRef(null);

  /* ---------- FAQ state ---------- */
  const [openFaq, setOpenFaq] = useState(null);

  /* ---------- contact cards: copy state ---------- */
  const [copiedId, setCopiedId] = useState(null);
  const copyTimerRef = useRef(null);

  const handleCopy = async (id, text) => {
    const ok = await copyTextContactUsFormQuickSection(text);
    if (!ok) return;
    setCopiedId(id);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopiedId(null), 1800);
  };

  useEffect(() => () => {
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
  }, []);

  /* ---------- derived phone values ---------- */
  const country = getCountryByIso(countryIso);
  const formattedPhone = formatPhoneNumber(phoneDigits, country);
  const phoneInvalid =
    phoneTouched && phoneDigits.length > 0 && !isPhoneComplete(phoneDigits, country);

  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    const qDigits = q.replace(/^\+/, '');
    const numeric = /^\d+$/.test(qDigits);
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase() === q ||
        (numeric && c.dial.slice(1).startsWith(qDigits))
    );
  }, [query]);

  /* ---------- phone handlers ---------- */
  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const caret = e.target.selectionStart ?? raw.length;

    // Handles typing AND pasting numbers like "+92 300 1234567"
    const digits = stripDialCode(raw, country).slice(0, country.maxDigits);

    caretDigits.current = raw.trim().startsWith('+')
      ? null
      : extractDigits(raw.slice(0, caret)).length;

    setPhoneDigits(digits);
  };

  // Keeps the caret in the right place after the mask re-formats the value
  useLayoutEffect(() => {
    const el = phoneRef.current;
    if (caretDigits.current == null || !el || document.activeElement !== el) return;
    const target = Math.min(caretDigits.current, phoneDigits.length);
    let pos = 0;
    if (target > 0) {
      let count = 0;
      for (let i = 0; i < formattedPhone.length; i++) {
        if (/\d/.test(formattedPhone[i])) count++;
        if (count === target) {
          pos = i + 1;
          break;
        }
      }
    }
    el.setSelectionRange(pos, pos);
    caretDigits.current = null;
  }, [phoneDigits, formattedPhone]);

  const closeDropdown = () => {
    setDropdownOpen(false);
    setQuery('');
  };

  const toggleDropdown = () => {
    if (dropdownOpen) closeDropdown();
    else {
      setServiceOpen(false);
      setDropdownOpen(true);
    }
  };

  const selectCountry = (iso) => {
    const next = getCountryByIso(iso);
    setCountryIso(next.iso);
    setPhoneDigits((d) => d.slice(0, next.maxDigits)); // respect the new country's limit
    closeDropdown();
    requestAnimationFrame(() => phoneRef.current && phoneRef.current.focus());
  };

  // Close on outside click / Escape
  useEffect(() => {
    if (!dropdownOpen) return undefined;
    const onMouseDown = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) closeDropdown();
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeDropdown();
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [dropdownOpen]);

  // Focus search + scroll the selected country into view when opened
  useEffect(() => {
    if (!dropdownOpen) return;
    if (searchRef.current) searchRef.current.focus();
    if (activeOptionRef.current) activeOptionRef.current.scrollIntoView({ block: 'nearest' });
  }, [dropdownOpen]);

  /* ---------- service dropdown ---------- */
  const selectedService = SERVICE_OPTIONS.find((o) => o.value === service);

  const selectService = (value) => {
    setService(value);
    setServiceOpen(false);
  };

  const handleServiceKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const i = SERVICE_OPTIONS.findIndex((o) => o.value === service);
      const next = e.key === 'ArrowDown' ? Math.min(i + 1, SERVICE_OPTIONS.length - 1) : Math.max(i - 1, 0);
      setService(SERVICE_OPTIONS[next].value);
    }
  };

  // Close on outside click / Escape
  useEffect(() => {
    if (!serviceOpen) return undefined;
    const onMouseDown = (e) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target)) setServiceOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setServiceOpen(false);
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [serviceOpen]);

  /* ---------- FAQ handler ---------- */
  const toggleFaq = (index) => setOpenFaq((cur) => (cur === index ? null : index));

  return (
    <section className="sectionWrapperContactUsFormQuickSection">
      <div className="containerContactUsFormQuickSection">
        <div className="layoutGridContactUsFormQuickSection">

        {/* Form Card */}
        <div className="cardContactUsFormQuickSection animFadeUpContactUsFormQuickSection">
          
          <div className="cardHeaderContactUsFormQuickSection">
           <div className="badgeContactUsFormQuickSection">
            <span className="badgeDotContactUsFormQuickSection"></span>
           SEND US A MESSAGE
          </div>
            <h2 className="headingContactUsFormQuickSection">
              We'd Love to Hear From You.
            </h2>
            <p className="descriptionContactUsFormQuickSection">
              Fill out the form and our team will get back to you shortly.
            </p>
          </div>

          <form className="formContactUsFormQuickSection">
            <div className="formGridContactUsFormQuickSection">
              
              <div className="inputGroupContactUsFormQuickSection">
                <label className="labelContactUsFormQuickSection">
                  First Name <span className="requiredContactUsFormQuickSection">*</span>
                </label>
                <input type="text" className="inputContactUsFormQuickSection" placeholder="Richard" />
              </div>

              <div className="inputGroupContactUsFormQuickSection">
                <label className="labelContactUsFormQuickSection">
                  Last Name <span className="requiredContactUsFormQuickSection">*</span>
                </label>
                <input type="text" className="inputContactUsFormQuickSection" placeholder="Anderson" />
              </div>

              <div className="inputGroupContactUsFormQuickSection">
                <label className="labelContactUsFormQuickSection">
                   Email 
                </label>
                <input type="email" className="inputContactUsFormQuickSection" placeholder="richard@company.com" />
              </div>

              <div className="inputGroupContactUsFormQuickSection">
                <label className="labelContactUsFormQuickSection">
                  Company Name <span className="requiredContactUsFormQuickSection">*</span>
                </label>
                <input type="text" className="inputContactUsFormQuickSection" placeholder="Your Company" />
              </div>

            

              {/* <div className="inputGroupContactUsFormQuickSection">
                <label className="labelContactUsFormQuickSection">
                  What can we help you with? <span className="requiredContactUsFormQuickSection">*</span>
                </label>
                <div className="selectWrapperContactUsFormQuickSection" ref={serviceRef}>
                  <button
                    type="button"
                    className={`inputContactUsFormQuickSection selectContactUsFormQuickSection selectTriggerContactUsFormQuickSection${
                      serviceOpen ? ' selectTriggerOpenContactUsFormQuickSection' : ''
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={serviceOpen}
                    onClick={() => {
                      setDropdownOpen(false);
                      setServiceOpen((o) => !o);
                    }}
                    onKeyDown={handleServiceKeyDown}
                  >
                    <span
                      className={`selectTriggerValueContactUsFormQuickSection${
                        selectedService ? '' : ' selectTriggerPlaceholderContactUsFormQuickSection'
                      }`}
                    >
                      {selectedService ? selectedService.label : 'Select an option'}
                    </span>
                  </button>
                  <ChevronDown
                    size={16}
                    className={`selectChevronContactUsFormQuickSection${
                      serviceOpen ? ' selectChevronOpenContactUsFormQuickSection' : ''
                    }`}
                  />
                  <input type="hidden" name="service" value={service} />

                  {serviceOpen && (
                    <div className="countryDropdownContactUsFormQuickSection">
                      <ul className="countryListContactUsFormQuickSection" role="listbox">
                        {SERVICE_OPTIONS.map((opt) => {
                          const isActive = opt.value === service;
                          return (
                            <li
                              key={opt.value}
                              role="option"
                              aria-selected={isActive}
                              className={`countryOptionContactUsFormQuickSection${
                                isActive ? ' countryOptionActiveContactUsFormQuickSection' : ''
                              }`}
                              onClick={() => selectService(opt.value)}
                            >
                              <span className="countryOptionNameContactUsFormQuickSection">{opt.label}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div> */}

            </div>
              {/* ---------- Phone ---------- */}
              <div className="inputGroupContactUsFormQuickSection fullWidthContactUsFormQuickSection">
                <label className="labelContactUsFormQuickSection">Phone Number <span className="requiredContactUsFormQuickSection">*</span></label>
                
                <div className="phoneFieldOuterContactUsFormQuickSection" ref={pickerRef}>
                  <div className="phoneInputWrapperContactUsFormQuickSection">
                    <div
                      className="phonePrefixContactUsFormQuickSection phonePrefixButtonContactUsFormQuickSection"
                      role="button"
                      tabIndex={0}
                      aria-haspopup="listbox"
                      aria-expanded={dropdownOpen}
                      aria-label={`Country: ${country.name} ${country.dial}`}
                      onClick={toggleDropdown}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                          e.preventDefault();
                          if (!dropdownOpen) setDropdownOpen(true);
                          else if (e.key !== 'ArrowDown') closeDropdown();
                        }
                      }}
                    >
                      <span className="flagContactUsFormQuickSection"><Flag country={country} /></span>
                      <span className="codeContactUsFormQuickSection">{country.dial}</span>
                      <ChevronDown
                        size={14}
                        className={`chevronContactUsFormQuickSection${
                          dropdownOpen ? ' chevronOpenContactUsFormQuickSection' : ''
                        }`}
                      />
                    </div>
                    <div className="phoneDividerContactUsFormQuickSection"></div>
                    <input
                      ref={phoneRef}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      className="inputContactUsFormQuickSection phoneFieldContactUsFormQuickSection"
                      placeholder={country.placeholder}
                      value={formattedPhone}
                      onChange={handlePhoneChange}
                      onBlur={() => setPhoneTouched(true)}
                      aria-invalid={phoneInvalid}
                    />
                    {/* Full international number, e.g. +923001234567 */}
                    <input
                      type="hidden"
                      name="phone"
                      value={getFullPhoneNumber(phoneDigits, country)}
                    />
                  </div>

                  {dropdownOpen && (
                    <div className="countryDropdownContactUsFormQuickSection">
                      <div className="countrySearchRowContactUsFormQuickSection">
                        <Search size={15} className="countrySearchIconContactUsFormQuickSection" />
                        <input
                          ref={searchRef}
                          type="text"
                          className="countrySearchInputContactUsFormQuickSection"
                          placeholder="Search country or code"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && filteredCountries.length > 0) {
                              e.preventDefault();
                              selectCountry(filteredCountries[0].iso);
                            }
                          }}
                        />
                      </div>

                      <ul className="countryListContactUsFormQuickSection" role="listbox">
                        {filteredCountries.length === 0 && (
                          <li className="countryEmptyContactUsFormQuickSection">No countries found</li>
                        )}
                        {filteredCountries.map((c) => {
                          const isActive = c.iso === country.iso;
                          return (
                            <li
                              key={c.iso}
                              ref={isActive ? activeOptionRef : null}
                              role="option"
                              aria-selected={isActive}
                              className={`countryOptionContactUsFormQuickSection${
                                isActive ? ' countryOptionActiveContactUsFormQuickSection' : ''
                              }`}
                              onClick={() => selectCountry(c.iso)}
                            >
                              <span className="countryOptionFlagContactUsFormQuickSection"><Flag country={c} /></span>
                              <span className="countryOptionNameContactUsFormQuickSection">{c.name}</span>
                              <span className="countryOptionDialContactUsFormQuickSection">{c.dial}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            <div className="inputGroupContactUsFormQuickSection fullWidthContactUsFormQuickSection">
              <label className="labelContactUsFormQuickSection">Tell us more about your business...</label>
              <textarea 
                className="inputContactUsFormQuickSection textareaContactUsFormQuickSection" 
                placeholder="Share a few details about your goals, current setup, or any specific requirements."
                rows="4"
              ></textarea>
            </div>

            <button type="button" className="btnSubmitContactUsFormQuickSection">
              Send Message <ArrowRight size={18} className="btnIconContactUsFormQuickSection" />
            </button>

            <div className="formFooterContactUsFormQuickSection">
              <Clock size={14} className="clockIconContactUsFormQuickSection" />
              <span>We'll be in touch within 24 hours.</span>
            </div>
          </form>

        </div>

        {/* Contact Info Cards (right side) */}
        <aside className="infoColumnContactUsFormQuickSection" aria-label="Contact information">
          {CONTACT_CARDS.map((card, index) => {
            const Icon = card.icon;
            const isCopied = copiedId === card.id;
            return (
              <div
                key={card.id}
                className="infoCardContactUsFormQuickSection"
                style={{ animationDelay: `${0.25 + index * 0.15}s` }}
              >
                <span className="infoGlowContactUsFormQuickSection" aria-hidden="true" />

                <div className="infoIconBoxContactUsFormQuickSection">
                  <span className="infoIconRingContactUsFormQuickSection" aria-hidden="true" />
                  <Icon size={26} strokeWidth={1.7} className="infoIconContactUsFormQuickSection" />
                </div>

                <div className="infoBodyContactUsFormQuickSection">
                  <h3 className="infoTitleContactUsFormQuickSection">{card.title}</h3>

                  {card.text && (
                    <p className="infoTextContactUsFormQuickSection">{card.text}</p>
                  )}

                  {card.address && (
                    <address className="infoAddressContactUsFormQuickSection">
                      {card.address.map((line) => (
                        <span key={line} className="infoAddressLineContactUsFormQuickSection">{line}</span>
                      ))}
                    </address>
                  )}

                  {card.copy && (
                    <div className="infoValueRowContactUsFormQuickSection">
                      <a href={card.href} className="infoValueContactUsFormQuickSection">
                        {card.value}
                      </a>
                      <button
                        type="button"
                        className={`infoCopyBtnContactUsFormQuickSection${
                          isCopied ? ' infoCopyBtnDoneContactUsFormQuickSection' : ''
                        }`}
                        onClick={() => handleCopy(card.id, card.copy)}
                        aria-label={isCopied ? 'Copied' : `Copy ${card.id === 'email' ? 'email address' : 'phone number'}`}
                      >
                        {isCopied ? <Check size={15} /> : <Copy size={15} />}
                      </button>
                      <span
                        className={`infoCopiedTagContactUsFormQuickSection${
                          isCopied ? ' infoCopiedTagShowContactUsFormQuickSection' : ''
                        }`}
                        aria-live="polite"
                      >
                        {isCopied ? 'Copied!' : ''}
                      </span>
                    </div>
                  )}

                  {card.linkLabel && (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="infoLinkContactUsFormQuickSection"
                    >
                      {card.linkLabel}
                      <ArrowRight size={16} className="infoLinkIconContactUsFormQuickSection" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </aside>

        </div>

        {/* FAQ Card */}
        {/* <div className="cardFaqContactUsFormQuickSection animFadeUpDelay1ContactUsFormQuickSection">
          
          <div className="faqHeaderRowContactUsFormQuickSection">
            <div>
              <div className="badgeContactUsFormQuickSection">
            <span className="badgeDotContactUsFormQuickSection"></span>
           FREQUENTLY ASKED
          </div>
              <h2 className="headingFaqContactUsFormQuickSection">Quick Answers</h2>
            </div>
            <a href="#" className="viewAllLinkContactUsFormQuickSection">
              View All FAQs <ArrowRight size={16} />
            </a>
          </div>

          <div className="faqListContactUsFormQuickSection">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.id}
                  className={`faqItemContactUsFormQuickSection faqItemAccordionContactUsFormQuickSection${
                    isOpen ? ' faqItemOpenContactUsFormQuickSection' : ''
                  }`}
                  onClick={() => toggleFaq(index)}
                >
                  <button
                    type="button"
                    id={`faq-trigger-${faq.id}`}
                    className="faqTriggerContactUsFormQuickSection"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                  >
                    <span className="faqQuestionContactUsFormQuickSection">{faq.question}</span>
                    <Plus size={18} className="faqIconContactUsFormQuickSection" />
                  </button>

                  <div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${faq.id}`}
                    className="faqAnswerWrapContactUsFormQuickSection"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="faqAnswerInnerContactUsFormQuickSection">
                      <p className="faqAnswerTextContactUsFormQuickSection">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div> */}

      </div>
    </section>
  );
}

export default ContactUsFormQuickSection;