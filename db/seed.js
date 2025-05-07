import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " + i, i * 50000);
  }
  const user1 = await createUser("heartseeker@lo.ve", "cupid123");
  for (let i = 1; i <= 5; i++) {
    await createPlaylist(
      "Playlist " + i,
      "Description for playlist " + i,
      user1.id
    );
  }

  const user2 = await createUser("druid@forest.tree", "bear!");
  for (let i = 3; i <= 8; i++) {
    await createPlaylist(
      "Playlist " + i,
      "Description for playlist " + i,
      user2.id
    );
  }

  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(i / 2);
    await createPlaylistTrack(playlistId, i);
  }
}
