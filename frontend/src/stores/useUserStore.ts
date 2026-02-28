import { axiosInstance } from "@/lib/axios";
import { Song } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface UserStore {
	likedSongs: Song[];
	isLoading: boolean;
	error: string | null;

	fetchLikedSongs: () => Promise<void>;
	toggleLike: (songId: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
	likedSongs: [],
	isLoading: false,
	error: null,

	fetchLikedSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/users/liked");
			set({ likedSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	toggleLike: async (songId) => {
		try {
			const response = await axiosInstance.post(`/users/liked/${songId}`);
			const isLikedNow = response.data.isLiked;

			if (isLikedNow) {
				toast.success("Added to Liked Songs");
			} else {
				toast.success("Removed from Liked Songs");
			}

			// Optionally refetch or update local state
			get().fetchLikedSongs();
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	},
}));
