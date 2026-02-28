import { useUserStore } from "@/stores/useUserStore";
import { Heart } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const LikeButton = ({ songId }: { songId: string }) => {
	const { isSignedIn } = useAuth();
	const { likedSongs, toggleLike } = useUserStore();
	const isLiked = likedSongs.some((s) => s._id === songId);

	const handleLike = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!isSignedIn) {
			toast.error("Please sign in to like songs");
			return;
		}
		toggleLike(songId);
	};

	return (
		<button
			onClick={handleLike}
			className={`hover:scale-110 transition-transform ${
				isLiked ? "text-green-500" : "text-zinc-400 hover:text-white"
			}`}
		>
			<Heart className={`size-5 ${isLiked ? "fill-current" : ""}`} />
		</button>
	);
};

export default LikeButton;
