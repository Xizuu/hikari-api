import { animasu } from "yaoi";
import { Request, Response } from 'express';

export async function getAnimes (req: Request, res: Response) {
    const genre: string | undefined = req.query.genre as string;
    const page: number = req.query.page ? parseInt(req.query.page as string, 10) : 1;

    if (!genre) {
        res.status(400).json({
            status: 400,
            message: 'Parameter "genre" is required'
        });
    }

    try {
        const animes = await animasu.getAnimes({
            genres: [genre],
            page: page,
            sort: "update"
        });

        res.status(200).json({
            status: 200,
            data: animes.data,
            hasNext: animes.hasNext
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                status: 500,
                message: error.message || "An error occurred",
            });
        } else {
            res.status(500).json({
                status: 500,
                message: "An unknown error occurred",
            });
        }
    }
}

export async function getAnimeBySlug(req: Request, res: Response) {
    const { slug } = req.params;

    try {
        const anime = await animasu.getAnime(slug);

        if (!anime) {
            res.status(400).json({
                status: 400,
                message: `Anime with slug "${slug}" not found`
            });
        }

        res.status(200).json({
            status: 200,
            data: anime
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                status: 500,
                message: error.message || "An error occurred",
            });
        } else {
            res.status(500).json({
                status: 500,
                message: "An unknown error occurred",
            });
        }
    }
}

export async function getAnimeStream(req: Request, res: Response) {
    const { watchId } = req.params

    try {
        const streams = await animasu.getStreams(watchId)

        if (streams.length === 0) {
            res.status(400).json({
                status: 400,
                message: "Anime not found"
            })
        }

        res.status(200).json({
            status: 200,
            data: streams
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                status: 500,
                message: error.message || "An error occurred",
            });
        } else {
            res.status(500).json({
                status: 500,
                message: "An unknown error occurred",
            });
        }
    }
}