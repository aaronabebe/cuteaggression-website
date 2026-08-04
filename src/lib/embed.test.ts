// Run with: pnpm test
import assert from 'node:assert/strict';
import { spotifyEmbed, youtubeEmbed, bandcampEmbed } from './embed.ts';

// the exact link shapes that show up in src/data/*.yaml
assert.equal(
	spotifyEmbed('https://open.spotify.com/intl-de/track/12YdT889x0AIBx4TFfe6El?si=5d580128c64c406d'),
	'https://open.spotify.com/embed/track/12YdT889x0AIBx4TFfe6El',
);
assert.equal(
	spotifyEmbed('https://open.spotify.com/album/3rbniHDRignIfH40jqg491'),
	'https://open.spotify.com/embed/album/3rbniHDRignIfH40jqg491',
);
assert.equal(spotifyEmbed('https://cuteaggressionmusic.bandcamp.com'), null);
assert.equal(spotifyEmbed(undefined), null);

const player = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ';
assert.equal(youtubeEmbed('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), player);
assert.equal(youtubeEmbed('https://www.youtube.com/watch?list=PL1&v=dQw4w9WgXcQ'), player);
assert.equal(youtubeEmbed('https://youtu.be/dQw4w9WgXcQ?t=30'), player);
assert.equal(youtubeEmbed('https://www.youtube.com/shorts/dQw4w9WgXcQ'), player);
assert.equal(youtubeEmbed('https://vimeo.com/12345678'), null);

assert.ok(bandcampEmbed('album=1234567890')?.includes('/EmbeddedPlayer/album=1234567890/'));
assert.ok(bandcampEmbed('track=1234567890')?.includes('/EmbeddedPlayer/track=1234567890/'));
// the raw number alone is the likely copy-paste mistake — must not build a broken player
assert.equal(bandcampEmbed('1234567890'), null);
assert.equal(bandcampEmbed(undefined), null);

console.log('embed: ok');
