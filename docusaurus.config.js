// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/plugin-content-docs').Options} */
const aboutPluginOptions = {
  id: 'home',
  path: 'home',
  routeBasePath: '/',
  sidebarPath: require.resolve('./home/sidebars.js'),
}

/** @type {import('@docusaurus/plugin-content-docs').Options} */
const tutorialsPluginOptions = {
  id: 'tutorials',
  path: 'tutorials',
  routeBasePath: 'tutorials',
  sidebarPath: require.resolve('./tutorials/sidebars.js'),
}

/** @type {import('@docusaurus/plugin-content-docs').Options} */
const examplesPluginOptions = {
  id: 'examples',
  path: 'examples',
  routeBasePath: 'examples',
  sidebarPath: require.resolve('./examples/sidebars.js'),
}

/** @type {import('@docusaurus/plugin-content-docs').Options} */
const referencePluginOptions = {
  id: 'reference',
  path: 'reference',
  routeBasePath: 'reference',
  sidebarPath: require.resolve('./reference/sidebars.js'),
  // includeCurrentVersion: false,  // disables "next", forces version into path
}

/** @type {import('@docusaurus/theme-classic').Options} */
const themeOptions = {
  customCss: require.resolve('./src/css/custom.css'),
}

/** @type {import('@docusaurus/theme-common').UserThemeConfig} */
const themeConfig = {
  navbar: {
    title: 'ChiselStrike',
    logo: {
      alt: 'ChiselStrike documentation',
      src: 'img/logo.svg',
    },
    items: [
      {
        type: 'doc',
        docsPluginId: 'home',
        docId: 'index',
        label: 'Home',
        position: 'left',
      },
      {
        type: 'doc',
        docsPluginId: 'tutorials',
        docId: 'index',
        label: 'Tutorials',
        position: 'left',
      },
      {
        type: 'doc',
        docsPluginId: 'examples',
        docId: 'index',
        label: 'Examples',
        position: 'left',
      },
      {
        type: 'doc',
        docsPluginId: 'reference',
        docId: 'index',
        label: 'Reference',
        position: 'left',
      },
      // {
      //   type: 'docsVersionDropdown',
      //   docsPluginId: 'reference',
      //   position: 'left',
      // },
      {
        href: 'https://chiselstrike.com',
        label: 'Website',
        position: 'right',
      },
      {
        href: 'https://github.com/chiselstrike',
        label: 'GitHub',
        position: 'right',
      },
    ],
  },
  footer: {
    style: 'dark',
    links: [
      {
        title: 'Links',
        items: [
          {
            label: 'Website',
            to: 'https://chiselstrike.com',
          },
          {
            label: 'Documentation',
            to: '/',
          },
        ],
      },
      {
        title: 'Community',
        items: [
          {
            label: 'Discord',
            href: 'https://discord.gg/GHNN9CNAZe',
          },
          {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/company/chiselstrike/',
          },
        ],
      },
      {
        title: 'More',
        items: [
          {
            label: 'GitHub',
            href: 'https://github.com/chiselstrike',
          },
        ],
      },
    ],
    copyright: `Copyright © ${new Date().getFullYear()} ChiselStrike, Inc. Built with Docusaurus.`,
  },
  prism: {
    // @ts-ignore
    theme: lightCodeTheme,
    // @ts-ignore
    darkTheme: darkCodeTheme,
  },
}

const redirectOptions = {
  redirects: [
    { to: '/tutorials/getting-started/', from: '/Intro/first' }
  ]
}

/** @type {import('@docusaurus/types').Config} */
const docusaurusConfig = {
  title: 'ChiselStrike documentation',
  tagline: 'Automated Serverless Backends',
  url: 'https://docs.chiselstrike.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ChiselStrike', // Usually your GitHub org/user name.
  projectName: 'chiselstrike', // Usually your repo name.

  plugins: [
    [ 'content-docs', aboutPluginOptions ],
    [ 'content-docs', tutorialsPluginOptions ],
    [ 'content-docs', examplesPluginOptions ],
    [ 'content-docs', referencePluginOptions ],
    [ '@docusaurus/theme-classic', themeOptions ],
    [ '@docusaurus/plugin-client-redirects', redirectOptions ],
  ],

  themeConfig: themeConfig
};

module.exports = docusaurusConfig;
