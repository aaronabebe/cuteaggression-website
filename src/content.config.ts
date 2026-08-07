import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const linkList = z.array(z.object({ text: z.string(), url: z.url() }));

const news = defineCollection({
	loader: file('src/data/news.yaml'),
	schema: z.object({
		date: z.coerce.date(),
		// shown instead of the date, for jokes like "a long long time ago"
		dateLabel: z.string().optional(),
		kind: z.enum(['concert', 'single', 'album', 'video', 'press', 'charts', 'award']),
		title: z.string(),
		// a press item with both of these gets pulled out as the big quote on the front page
		quote: z.string().optional(),
		outlet: z.string().optional(),
		links: linkList.default([]),
	}),
});

const releases = defineCollection({
	loader: file('src/data/releases.yaml'),
	schema: z.object({
		date: z.coerce.date(),
		title: z.string(),
		kind: z.enum(['single', 'album', 'ep']),
		// paste the normal share link; the embed url is derived from it
		spotify: z.url().optional(),
		// bandcamp needs the numeric id from its own embed code, see src/data/releases.yaml
		bandcampId: z.string().optional(),
		bandcampUrl: z.url().optional(),
		// path to the artwork in public/, e.g. /covers/make-us-crash.jpg
		cover: z.string().optional(),
		links: linkList.default([]),
	}),
});

const videos = defineCollection({
	loader: file('src/data/videos.yaml'),
	schema: z.object({
		date: z.coerce.date(),
		title: z.string(),
		youtube: z.url(),
	}),
});

const links = defineCollection({
	loader: file('src/data/links.yaml'),
	schema: z.object({
		text: z.string(),
		url: z.string(),
		// low numbers first — entries are otherwise returned sorted by id, not file order
		order: z.number().default(99),
		// featured links get top billing on /links
		featured: z.boolean().default(false),
		// emoji or a path like /flame.gif, shown on the button
		icon: z.string().optional(),
		// small second line under the button text
		note: z.string().optional(),
		// a share link (spotify / youtube / `album=123`) -> inline player under the button
		embed: z.string().optional(),
	}),
});

export const collections = { news, releases, videos, links };
