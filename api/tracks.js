import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/queries/tracks";
import { getPlaylistByTrackId } from "#db/queries/playlists";
import requireUser from "#middleware/requireUser";

router.use(requireUser);

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.route("/:id").get(async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  res.send(track);
});
router.route("/:id/playlists").get(async (req, res) => {
  const track = await getTrackById(req.params.id);
  if (!track) return res.status(404).send("Track not found.");
  const playlists = await getPlaylistByTrackId(track.id, req.user.id);
  res.send(playlists);
});
