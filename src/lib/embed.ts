// Turns the links you'd normally copy out of Spotify / YouTube into player embed urls,
// so nobody editing src/data/*.yaml has to deal with embed codes.

const SPOTIFY = /open\.spotify\.com\/(?:intl-[a-z]{2}\/)?(track|album|playlist|artist)\/([A-Za-z0-9]+)/;
const YOUTUBE = /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/;

/** Spotify share link -> player url, or null if it isn't one. */
export function spotifyEmbed(url: string | undefined): string | null {
	const m = url?.match(SPOTIFY);
	return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}` : null;
}

/** Any YouTube link -> nocookie player url, or null if it isn't one. */
export function youtubeEmbed(url: string | undefined): string | null {
	const m = url?.match(YOUTUBE);
	return m ? `https://www.youtube-nocookie.com/embed/${m[1]}` : null;
}

/** `album=123` / `track=123` from releases.yaml -> Bandcamp player url. */
export function bandcampEmbed(id: string | undefined): string | null {
	if (!id || !/^(album|track)=\d+$/.test(id)) return null;
	return `https://bandcamp.com/EmbeddedPlayer/${id}/size=large/bgcol=ffffff/linkcol=ff00ff/tracklist=false/transparent=true/`;
}
