import { getServerSideSitemap, getServerSideSitemapLegacy } from 'next-sitemap';
import { API } from '../../../config';

export const getServerSideProps = async (ctx) => {
  const response = await fetch(`${API}/tag`);
  const recipes = await response.json();

  const fields = recipes?.map((recipe) => ({
    loc: `https://www.ketofoodgenerator.com/categories/recipes/${recipe.slug}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '0.7',
  }));

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Site() {}
