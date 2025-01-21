import { Router } from "express";
import { getAnimeBySlug, getAnimes, getAnimeStream } from "../controller/AnimeController";

const router = Router();

router.get("/animes", getAnimes)
router.get("/anime/:slug", getAnimeBySlug)
router.get("/stream/:watchId", getAnimeStream)

export default router;