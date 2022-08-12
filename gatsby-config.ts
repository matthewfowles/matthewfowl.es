import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Matt Fowles`,
    siteUrl: `https://mattfowl.es`,
    description: "Software Engineer",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-splitbee`,
      options: {
        includeInDevelopment: false,
        delayTimeout: 0,
        disableCookie: true,
      },
    },
    {
      resolve: `gatsby-source-notion-api`,
      options: {
        token: `secret_Br0TIgiTIgD0F8NBjcHofbf12kdRIfMZwHTK20ZVE0l`,
        databaseId: `51030677d2b04c0fbe787e96e47e5f0a`,
        propsToFrontmatter: true,
        lowerTitleLevel: true,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Matt Fowles",
        short_name: "Matt Fowles",
        icon: "src/images/icon.png",
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#444444`,
        display: `standalone`,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          quality: 70,
          formats: ["webp", "avif"],
          placeholder: "tracedSVG",
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-netlify`,
    "gatsby-plugin-robots-txt",
  ],
};

export default config;
