/* ==========================================================
   ContactUsFormQuickSection.js
   Country list, dial codes and phone number formats.

   Format masks:  "#" = one digit, any other character = fixed separator.
   Masks describe the NATIONAL number WITHOUT the dial code and WITHOUT
   the trunk prefix (the leading 0 / 8 that is only dialled locally).
   The FIRST mask of each country is the primary one (used as placeholder).
   If a country has several valid lengths, list one mask per length.
   ========================================================== */

const NANP = '(###) ###-####'; // US, Canada & Caribbean (+1)

// [ISO code, Country name, Dial code, "mask1|mask2|..."]
const RAW_COUNTRIES = [
  ['AF', 'Afghanistan', '+93', '## ### ####'],
  ['AL', 'Albania', '+355', '## ### ####'],
  ['DZ', 'Algeria', '+213', '### ## ## ##'],
  ['AS', 'American Samoa', '+1', NANP],
  ['AD', 'Andorra', '+376', '### ###'],
  ['AO', 'Angola', '+244', '### ### ###'],
  ['AI', 'Anguilla', '+1', NANP],
  ['AG', 'Antigua and Barbuda', '+1', NANP],
  ['AR', 'Argentina', '+54', '## ####-####|9 ## ####-####'],
  ['AM', 'Armenia', '+374', '## ######'],
  ['AW', 'Aruba', '+297', '### ####'],
  ['AU', 'Australia', '+61', '### ### ###'],
  ['AT', 'Austria', '+43', '### #######|### ########'],
  ['AZ', 'Azerbaijan', '+994', '## ### ## ##'],
  ['BS', 'Bahamas', '+1', NANP],
  ['BH', 'Bahrain', '+973', '#### ####'],
  ['BD', 'Bangladesh', '+880', '#### ######'],
  ['BB', 'Barbados', '+1', NANP],
  ['BY', 'Belarus', '+375', '## ###-##-##'],
  ['BE', 'Belgium', '+32', '### ## ## ##|# ### ## ##'],
  ['BZ', 'Belize', '+501', '###-####'],
  ['BJ', 'Benin', '+229', '## ## ## ## ##'],
  ['BM', 'Bermuda', '+1', NANP],
  ['BT', 'Bhutan', '+975', '## ## ## ##'],
  ['BO', 'Bolivia', '+591', '# ### ####'],
  ['BQ', 'Bonaire, Sint Eustatius and Saba', '+599', '### ####'],
  ['BA', 'Bosnia and Herzegovina', '+387', '## ###-###'],
  ['BW', 'Botswana', '+267', '## ### ###'],
  ['BR', 'Brazil', '+55', '## #####-####|## ####-####'],
  ['VG', 'British Virgin Islands', '+1', NANP],
  ['BN', 'Brunei', '+673', '### ####'],
  ['BG', 'Bulgaria', '+359', '## ### ####'],
  ['BF', 'Burkina Faso', '+226', '## ## ## ##'],
  ['BI', 'Burundi', '+257', '## ## ## ##'],
  ['KH', 'Cambodia', '+855', '## ### ###|## ### ####'],
  ['CM', 'Cameroon', '+237', '# ## ## ## ##'],
  ['CA', 'Canada', '+1', NANP],
  ['CV', 'Cape Verde', '+238', '### ## ##'],
  ['KY', 'Cayman Islands', '+1', NANP],
  ['CF', 'Central African Republic', '+236', '## ## ## ##'],
  ['TD', 'Chad', '+235', '## ## ## ##'],
  ['CL', 'Chile', '+56', '# #### ####'],
  ['CN', 'China', '+86', '### #### ####'],
  ['CO', 'Colombia', '+57', '### ### ####'],
  ['KM', 'Comoros', '+269', '### ## ##'],
  ['CG', 'Congo', '+242', '## ### ####'],
  ['CD', 'Congo (DR)', '+243', '### ### ###'],
  ['CK', 'Cook Islands', '+682', '## ###'],
  ['CR', 'Costa Rica', '+506', '#### ####'],
  ['CI', "C\u00f4te d'Ivoire", '+225', '## ## ## ## ##'],
  ['HR', 'Croatia', '+385', '## ### ####|## ### ###'],
  ['CU', 'Cuba', '+53', '# ### ####'],
  ['CW', 'Cura\u00e7ao', '+599', '# ### ####'],
  ['CY', 'Cyprus', '+357', '## ######'],
  ['CZ', 'Czechia', '+420', '### ### ###'],
  ['DK', 'Denmark', '+45', '## ## ## ##'],
  ['DJ', 'Djibouti', '+253', '## ## ## ##'],
  ['DM', 'Dominica', '+1', NANP],
  ['DO', 'Dominican Republic', '+1', NANP],
  ['EC', 'Ecuador', '+593', '## ### ####'],
  ['EG', 'Egypt', '+20', '### ### ####'],
  ['SV', 'El Salvador', '+503', '#### ####'],
  ['GQ', 'Equatorial Guinea', '+240', '### ### ###'],
  ['ER', 'Eritrea', '+291', '# ### ###'],
  ['EE', 'Estonia', '+372', '#### ####|### ####'],
  ['SZ', 'Eswatini', '+268', '#### ####'],
  ['ET', 'Ethiopia', '+251', '## ### ####'],
  ['FK', 'Falkland Islands', '+500', '#####'],
  ['FO', 'Faroe Islands', '+298', '######'],
  ['FJ', 'Fiji', '+679', '### ####'],
  ['FI', 'Finland', '+358', '## ### ####|## #### ####'],
  ['FR', 'France', '+33', '# ## ## ## ##'],
  ['GF', 'French Guiana', '+594', '### ## ## ##'],
  ['PF', 'French Polynesia', '+689', '## ## ## ##'],
  ['GA', 'Gabon', '+241', '# ## ## ##|## ## ## ##'],
  ['GM', 'Gambia', '+220', '### ####'],
  ['GE', 'Georgia', '+995', '### ## ## ##'],
  ['DE', 'Germany', '+49', '### #######|### ########'],
  ['GH', 'Ghana', '+233', '## ### ####'],
  ['GI', 'Gibraltar', '+350', '### #####'],
  ['GR', 'Greece', '+30', '### ### ####'],
  ['GL', 'Greenland', '+299', '## ## ##'],
  ['GD', 'Grenada', '+1', NANP],
  ['GP', 'Guadeloupe', '+590', '### ## ## ##'],
  ['GU', 'Guam', '+1', NANP],
  ['GT', 'Guatemala', '+502', '#### ####'],
  ['GG', 'Guernsey', '+44', '#### ######'],
  ['GN', 'Guinea', '+224', '### ## ## ##'],
  ['GW', 'Guinea-Bissau', '+245', '### ####'],
  ['GY', 'Guyana', '+592', '### ####'],
  ['HT', 'Haiti', '+509', '## ## ####'],
  ['HN', 'Honduras', '+504', '####-####'],
  ['HK', 'Hong Kong', '+852', '#### ####'],
  ['HU', 'Hungary', '+36', '## ### ####'],
  ['IS', 'Iceland', '+354', '### ####'],
  ['IN', 'India', '+91', '##### #####'],
  ['ID', 'Indonesia', '+62', '### ####-####|### ###-####|### ####-#####'],
  ['IR', 'Iran', '+98', '### ### ####'],
  ['IQ', 'Iraq', '+964', '### ### ####'],
  ['IE', 'Ireland', '+353', '## ### ####|## ### ###'],
  ['IM', 'Isle of Man', '+44', '#### ######'],
  ['IL', 'Israel', '+972', '##-###-####'],
  ['IT', 'Italy', '+39', '### ### ####|### ### ###'],
  ['JM', 'Jamaica', '+1', NANP],
  ['JP', 'Japan', '+81', '## ####-####'],
  ['JE', 'Jersey', '+44', '#### ######'],
  ['JO', 'Jordan', '+962', '# #### ####'],
  ['KZ', 'Kazakhstan', '+7', '### ### ## ##'],
  ['KE', 'Kenya', '+254', '### ######'],
  ['KI', 'Kiribati', '+686', '#### ####'],
  ['XK', 'Kosovo', '+383', '## ### ###'],
  ['KW', 'Kuwait', '+965', '#### ####'],
  ['KG', 'Kyrgyzstan', '+996', '### ### ###'],
  ['LA', 'Laos', '+856', '## ## ### ###'],
  ['LV', 'Latvia', '+371', '#### ####'],
  ['LB', 'Lebanon', '+961', '## ### ###|# ### ###'],
  ['LS', 'Lesotho', '+266', '#### ####'],
  ['LR', 'Liberia', '+231', '## ### ####|## ### ###'],
  ['LY', 'Libya', '+218', '## #######'],
  ['LI', 'Liechtenstein', '+423', '### ### ###|### ####'],
  ['LT', 'Lithuania', '+370', '### #####'],
  ['LU', 'Luxembourg', '+352', '### ### ###'],
  ['MO', 'Macau', '+853', '#### ####'],
  ['MG', 'Madagascar', '+261', '## ## ### ##'],
  ['MW', 'Malawi', '+265', '### ## ## ##'],
  ['MY', 'Malaysia', '+60', '## ### ####|## #### ####'],
  ['MV', 'Maldives', '+960', '### ####'],
  ['ML', 'Mali', '+223', '## ## ## ##'],
  ['MT', 'Malta', '+356', '#### ####'],
  ['MH', 'Marshall Islands', '+692', '### ####'],
  ['MQ', 'Martinique', '+596', '### ## ## ##'],
  ['MR', 'Mauritania', '+222', '## ## ## ##'],
  ['MU', 'Mauritius', '+230', '#### ####'],
  ['YT', 'Mayotte', '+262', '### ## ## ##'],
  ['MX', 'Mexico', '+52', '## #### ####'],
  ['FM', 'Micronesia', '+691', '### ####'],
  ['MD', 'Moldova', '+373', '#### ####'],
  ['MC', 'Monaco', '+377', '## ## ## ##'],
  ['MN', 'Mongolia', '+976', '#### ####'],
  ['ME', 'Montenegro', '+382', '## ### ###'],
  ['MS', 'Montserrat', '+1', NANP],
  ['MA', 'Morocco', '+212', '### ######'],
  ['MZ', 'Mozambique', '+258', '## ### ####'],
  ['MM', 'Myanmar', '+95', '## ### ####'],
  ['NA', 'Namibia', '+264', '## ### ####'],
  ['NR', 'Nauru', '+674', '### ####'],
  ['NP', 'Nepal', '+977', '###-#######'],
  ['NL', 'Netherlands', '+31', '# ## ## ## ##'],
  ['NC', 'New Caledonia', '+687', '## ## ##'],
  ['NZ', 'New Zealand', '+64', '## ### ####|## ### ###|## #### ####'],
  ['NI', 'Nicaragua', '+505', '#### ####'],
  ['NE', 'Niger', '+227', '## ## ## ##'],
  ['NG', 'Nigeria', '+234', '### ### ####'],
  ['NU', 'Niue', '+683', '####'],
  ['NF', 'Norfolk Island', '+672', '# #####'],
  ['KP', 'North Korea', '+850', '### ### ####'],
  ['MK', 'North Macedonia', '+389', '## ### ###'],
  ['MP', 'Northern Mariana Islands', '+1', NANP],
  ['NO', 'Norway', '+47', '### ## ###'],
  ['OM', 'Oman', '+968', '#### ####'],
  ['PK', 'Pakistan', '+92', '### #######'],
  ['PW', 'Palau', '+680', '### ####'],
  ['PS', 'Palestine', '+970', '### ### ###'],
  ['PA', 'Panama', '+507', '####-####'],
  ['PG', 'Papua New Guinea', '+675', '#### ####'],
  ['PY', 'Paraguay', '+595', '### ### ###'],
  ['PE', 'Peru', '+51', '### ### ###'],
  ['PH', 'Philippines', '+63', '### ### ####'],
  ['PL', 'Poland', '+48', '### ### ###'],
  ['PT', 'Portugal', '+351', '### ### ###'],
  ['PR', 'Puerto Rico', '+1', NANP],
  ['QA', 'Qatar', '+974', '#### ####'],
  ['RE', 'R\u00e9union', '+262', '### ## ## ##'],
  ['RO', 'Romania', '+40', '### ### ###'],
  ['RU', 'Russia', '+7', '### ###-##-##'],
  ['RW', 'Rwanda', '+250', '### ### ###'],
  ['BL', 'Saint Barth\u00e9lemy', '+590', '### ## ## ##'],
  ['SH', 'Saint Helena', '+290', '#####'],
  ['KN', 'Saint Kitts and Nevis', '+1', NANP],
  ['LC', 'Saint Lucia', '+1', NANP],
  ['MF', 'Saint Martin', '+590', '### ## ## ##'],
  ['PM', 'Saint Pierre and Miquelon', '+508', '## ## ##'],
  ['VC', 'Saint Vincent and the Grenadines', '+1', NANP],
  ['WS', 'Samoa', '+685', '## #####|## ####'],
  ['SM', 'San Marino', '+378', '#### ######'],
  ['ST', 'S\u00e3o Tom\u00e9 and Pr\u00edncipe', '+239', '### ####'],
  ['SA', 'Saudi Arabia', '+966', '## ### ####'],
  ['SN', 'Senegal', '+221', '## ### ## ##'],
  ['RS', 'Serbia', '+381', '## ### ####|## ### ###'],
  ['SC', 'Seychelles', '+248', '# ### ###'],
  ['SL', 'Sierra Leone', '+232', '## ######'],
  ['SG', 'Singapore', '+65', '#### ####'],
  ['SX', 'Sint Maarten', '+1', NANP],
  ['SK', 'Slovakia', '+421', '### ### ###'],
  ['SI', 'Slovenia', '+386', '## ### ###'],
  ['SB', 'Solomon Islands', '+677', '## #####'],
  ['SO', 'Somalia', '+252', '## ### ###|# ### ###'],
  ['ZA', 'South Africa', '+27', '## ### ####'],
  ['KR', 'South Korea', '+82', '## #### ####|## ### ####'],
  ['SS', 'South Sudan', '+211', '### ### ###'],
  ['ES', 'Spain', '+34', '### ## ## ##'],
  ['LK', 'Sri Lanka', '+94', '## ### ####'],
  ['SD', 'Sudan', '+249', '## ### ####'],
  ['SR', 'Suriname', '+597', '###-####'],
  ['SJ', 'Svalbard and Jan Mayen', '+47', '### ## ###'],
  ['SE', 'Sweden', '+46', '## ### ## ##'],
  ['CH', 'Switzerland', '+41', '## ### ## ##'],
  ['SY', 'Syria', '+963', '### ### ###'],
  ['TW', 'Taiwan', '+886', '### ### ###'],
  ['TJ', 'Tajikistan', '+992', '## ### ####'],
  ['TZ', 'Tanzania', '+255', '### ### ###'],
  ['TH', 'Thailand', '+66', '## ### ####'],
  ['TL', 'Timor-Leste', '+670', '#### ####'],
  ['TG', 'Togo', '+228', '## ## ## ##'],
  ['TK', 'Tokelau', '+690', '####'],
  ['TO', 'Tonga', '+676', '### ####'],
  ['TT', 'Trinidad and Tobago', '+1', NANP],
  ['TN', 'Tunisia', '+216', '## ### ###'],
  ['TR', 'Turkey', '+90', '### ### ## ##'],
  ['TM', 'Turkmenistan', '+993', '## ######'],
  ['TC', 'Turks and Caicos Islands', '+1', NANP],
  ['TV', 'Tuvalu', '+688', '## ####'],
  ['UG', 'Uganda', '+256', '### ######'],
  ['UA', 'Ukraine', '+380', '## ### ####'],
  ['AE', 'United Arab Emirates', '+971', '## ### ####'],
  ['GB', 'United Kingdom', '+44', '#### ######'],
  ['US', 'United States', '+1', NANP],
  ['VI', 'U.S. Virgin Islands', '+1', NANP],
  ['UY', 'Uruguay', '+598', '## ### ###'],
  ['UZ', 'Uzbekistan', '+998', '## ### ## ##'],
  ['VU', 'Vanuatu', '+678', '## #####'],
  ['VE', 'Venezuela', '+58', '### ### ####'],
  ['VN', 'Vietnam', '+84', '### ### ###'],
  ['WF', 'Wallis and Futuna', '+681', '## ## ##'],
  ['EH', 'Western Sahara', '+212', '### ######'],
  ['YE', 'Yemen', '+967', '### ### ###'],
  ['ZM', 'Zambia', '+260', '## ### ####'],
  ['ZW', 'Zimbabwe', '+263', '## ### ####'],
];

/* ---------- helpers ---------- */

const countDigits = (mask) => (mask.match(/#/g) || []).length;

// Flag emoji built from the ISO code (regional indicator symbols)
const isoToFlag = (iso) =>
  String.fromCodePoint(...[...iso.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)));

// Example number shown as placeholder, e.g. "(555) 123-4567"
const maskToPlaceholder = (mask) => {
  const sample = '5551234567890123456789';
  let i = 0;
  return mask.replace(/#/g, () => sample[i++]);
};

export const DEFAULT_COUNTRY_ISO = 'US';

export const COUNTRIES = RAW_COUNTRIES.map(([iso, name, dial, masks]) => {
  const list = masks.split('|');
  const formats = list
    .map((mask) => ({ mask, digits: countDigits(mask) }))
    .sort((a, b) => a.digits - b.digits);
  return {
    iso,
    name,
    dial,
    flag: isoToFlag(iso),
    formats,
    placeholder: maskToPlaceholder(list[0]), // primary mask = first listed
    minDigits: formats[0].digits,
    maxDigits: formats[formats.length - 1].digits,
  };
}).sort((a, b) => a.name.localeCompare(b.name));

export const getCountryByIso = (iso) =>
  COUNTRIES.find((c) => c.iso === iso) || COUNTRIES.find((c) => c.iso === DEFAULT_COUNTRY_ISO);

/* ---------- phone helpers ---------- */

export const extractDigits = (value) => (value || '').replace(/\D/g, '');

export const getMaxDigits = (country) => country.maxDigits;
export const getMinDigits = (country) => country.minDigits;

// Removes the dial code if the user pastes a number such as "+92 300 1234567"
export const stripDialCode = (rawValue, country) => {
  const trimmed = (rawValue || '').trim();
  if (!trimmed.startsWith('+')) return extractDigits(rawValue);
  const digits = extractDigits(trimmed);
  const dialDigits = extractDigits(country.dial);
  return digits.startsWith(dialDigits) ? digits.slice(dialDigits.length) : digits;
};

// Applies the right mask for the number of digits typed so far
export const formatPhoneNumber = (digits, country) => {
  const clean = extractDigits(digits).slice(0, country.maxDigits);
  if (!clean) return '';
  const format = country.formats.find((f) => f.digits >= clean.length) || country.formats[country.formats.length - 1];
  let out = '';
  let i = 0;
  for (const ch of format.mask) {
    if (i >= clean.length) break;
    if (ch === '#') out += clean[i++];
    else out += ch; // separator only added when more digits follow
  }
  return out;
};

export const isPhoneComplete = (digits, country) =>
  country.formats.some((f) => f.digits === extractDigits(digits).length);

// e.g. "+923001234567"
export const getFullPhoneNumber = (digits, country) =>
  digits ? `${country.dial}${extractDigits(digits)}` : '';

export const FAQS = [
  {
    id: 'response-time',
    question: 'How quickly will I get a response?',
    answer:
      'We reply to every message within 24 hours on business days. Technical support requests are prioritised, so you will often hear back much sooner.',
  },
  {
    id: 'request-demo',
    question: 'Can I request a demo for my team?',
    answer:
      'Absolutely. Choose "Sales Inquiry" in the form and mention your team size. We will arrange a live walkthrough tailored to how your team works.',
  },
  {
    id: 'custom-solutions',
    question: 'Do you offer custom solutions for large businesses?',
    answer:
      'Yes. For larger organisations we build tailored setups, including custom integrations, dedicated onboarding and priority support. Tell us about your requirements and we will put together a proposal.',
  },
];