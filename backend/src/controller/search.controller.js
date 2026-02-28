import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

export const search = async (req, res, next) => {
	try {
		const { query } = req.query;
		
		if (!query) {
			return res.status(200).json({ songs: [], albums: [] });
		}

		// Case-insensitive search for songs and albums
		const searchRegex = new RegExp(query, "i");

		const songs = await Song.find({
			$or: [
				{ title: searchRegex },
				{ artist: searchRegex },
			],
		}).limit(10);

		const albums = await Album.find({
			$or: [
				{ title: searchRegex },
				{ artist: searchRegex },
			],
		}).limit(10);

		res.status(200).json({ songs, albums });
	} catch (error) {
		next(error);
	}
};
