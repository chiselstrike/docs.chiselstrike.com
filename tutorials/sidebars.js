/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialsSidebar: [
    {
      type: 'doc',
      label: 'Tutorials',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Getting started',
      link: {
        type: 'doc',
        id: 'getting-started/index',
      },
      items: [
        'getting-started/step-01',
        'getting-started/step-02',
        'getting-started/step-03',
        'getting-started/step-04',
        'getting-started/step-05',
        'getting-started/step-06',
        'getting-started/step-07',
        'getting-started/next-steps',
      ]
    },
  ],
};

module.exports = sidebars;
