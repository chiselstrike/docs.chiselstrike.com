/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  aboutSidebar: [
    {
      type: 'doc',
      label: 'Welcome',
      id: 'index',
    },
    {
      type: 'link',
      label: 'Tutorials',
      href: '/tutorials/'
    },
    {
      type: 'link',
      label: 'Examples',
      href: '/examples/'
    },
    {
      type: 'link',
      label: 'Reference',
      href: '/reference/'
    },
    "ongoing-work",
    "community",
  ],
};
  
module.exports = sidebars;
