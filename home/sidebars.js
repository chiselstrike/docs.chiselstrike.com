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
    {
      type: 'category',
      label: 'Community',
      items: [ 'community/feedback', 'community/known-issues', 'community/discord' ]
    },
  ],
};
  
module.exports = sidebars;
