import { getServerSideSitemap, getServerSideSitemapLegacy } from 'next-sitemap';
import { API } from '../../../config';
import slugify from 'slugify';

export const getServerSideProps = async (ctx) => {
  const response = await fetch(`${API}/recipe/foodTags`);
  const recipes = await response.json();

  const fields = recipes?.map((tag) => ({
    loc: `https://www.ketofoodgenerator.com/categories/recipes/${slugify(
      tag
    ).toLowerCase()}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: '0.7',
  }));

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Site() {}
