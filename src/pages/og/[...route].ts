import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import { profile } from '../../data/profile';
import { plain } from '../../lib/emphasis';

const work = await getCollection('work');

const pages: Record<string, { title: string; description: string }> = {
  index: { title: profile.name, description: `${profile.role} at ${profile.employer}` },
  about: { title: 'About', description: profile.tagline },
  agents: { title: 'Engineering with agents', description: 'Harnesses, context and the check that makes agent output trustworthy.' },
  experience: { title: 'Experience', description: 'Roles, education and background.' },
  work: { title: 'Work', description: 'Selected engineering work.' },
  ...Object.fromEntries(
    // Canvas draws plain text, so the emphasis markers have to come out.
    work.map((e) => [`work/${e.id}`, { title: e.data.title, description: plain(e.data.summary) }])
  ),
};

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    // Matches the site: near-black ground, amber edge.
    bgGradient: [[11, 12, 14]],
    border: { color: [255, 176, 0], width: 24, side: 'inline-start' },
    padding: 70,
    font: {
      title: { size: 68, weight: 'Bold', color: [217, 213, 205] },
      description: { size: 30, color: [139, 133, 122] },
    },
  }),
});
