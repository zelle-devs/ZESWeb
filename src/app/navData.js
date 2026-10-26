// Single source of truth for Header + Footer links
// Place this file at: app/navData.js
// Abhi sirf 4 pages bane hain: Platforms, Solutions, Integrations, Resources

export const productLinks = [
  { label: 'Platforms', href: '/platforms' },
  { label: 'Integrations', href: '/integrations' },
  // { label: 'Features', href: '/features' },
  // { label: 'Pricing', href: '/pricing' },
];

export const solutionsLinks = [
  { label: 'Solutions', href: '/solutions' },
  // { label: 'For Startups', href: '/for-startups' },
  // { label: 'For Growing Brands', href: '/for-growing-brands' },
  // { label: 'For Enterprises', href: '/global-enterprise' },
  // { label: 'Global Commerce', href: '/global-commerce' },
];

export const resourcesLinks = [
  { label: 'Resources', href: '/resources' },
  // { label: 'Blogs', href: '/blogs' },
  // { label: 'Case Studies', href: '/case-studies' },
];

export const companyLinks = [
  // { label: 'About Us', href: '/about-us' },
  // { label: 'Contact', href: '/contact-us' },
];

// Header navigation — sirf 4 links, koi dropdown nahi
export const navLinks = [
  { href: '/platforms', label: 'Platforms' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/integrations', label: 'Integrations' },
  { href: '/resources', label: 'Resources' },
  // { href: '/pricing', label: 'Pricing' },
  // { href: '/about-us', label: 'About' },
];

// Footer groups — khaali group (Company) comment kar diya hai
export const footerLinkGroups = [
  { id: 'product', heading: 'Product', links: productLinks },
  { id: 'solutions', heading: 'Solutions', links: solutionsLinks },
  { id: 'resources', heading: 'Resources', links: resourcesLinks },
  // { id: 'company', heading: 'Company', links: companyLinks },
];