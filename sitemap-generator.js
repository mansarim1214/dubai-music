const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/venues', changefreq: 'monthly', priority: 0.7 },
  { url: '/wedding-vip-packages', changefreq: 'monthly', priority: 0.7 },
  { url: '/music-store', changefreq: 'monthly', priority: 0.7 },
  { url: '/favorites', changefreq: 'monthly', priority: 0.7 },
  { url: '/musicians', changefreq: 'monthly', priority: 0.7 },
];

const sitemap = new SitemapStream({ hostname: 'https://dubaimusic.com' });

links.forEach(link => sitemap.write(link));
sitemap.end();

streamToPromise(sitemap).then(data => {
  fs.writeFileSync('./public/sitemap.xml', data);
  console.log('Sitemap generated successfully!');
});
