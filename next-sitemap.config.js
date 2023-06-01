/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.ketofoodgenerator.com',
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://www.ketofoodgenerator.com/sitemap.xml`,
      `https://www.ketofoodgenerator.com/server-sitemap.xml`,
      `https://www.ketofoodgenerator.com/categories-sitemap.xml`,
    ],
  },
};
