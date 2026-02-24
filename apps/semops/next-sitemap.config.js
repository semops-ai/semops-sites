/** @type {import('next-sitemap').IConfig} */
module.exports = {
 siteUrl: process.env.SITE_URL || 'https://timjmitchell.com',
 generateRobotsTxt: true,
 generateIndexSitemap: false,
 // Additional paths to exclude if needed
 exclude: ['/api/*'],
 robotsTxtOptions: {
 policies: [
 {
 userAgent: '*',
 allow: '/',
 },
 ],
 additionalSitemaps: [],
 },
};
