import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Heart, Play, Pause, Clock } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGridSkeleton from "../home/components/SectionGridSkeleton";

const LikedSongsPage = () => {
	const { likedSongs, fetchLikedSongs, isLoading, toggleLike } = useUserStore();
	const { currentSong, isPlaying, playAlbum } = usePlayerStore();

	useEffect(() => {
		fetchLikedSongs();
	}, [fetchLikedSongs]);

	const handlePlaySong = (index: number) => {
		if (likedSongs.length > 0) {
			playAlbum(likedSongs, index);
		}
	};

	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	if (isLoading) return <SectionGridSkeleton />;

	return (
		<div className='h-full bg-zinc-900'>
			<ScrollArea className='h-full'>
				{/* Header */}
				<div className='relative h-80 flex items-end p-8 bg-gradient-to-b from-indigo-900 to-zinc-900'>
					<div className='flex items-center gap-6'>
						<div className='size-52 shadow-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center rounded-lg'>
							<Heart className='size-24 text-white fill-current' />
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-sm font-bold text-white uppercase'>Playlist</p>
							<h1 className='text-8xl font-black text-white'>Liked Songs</h1>
							<p className='text-zinc-300 font-medium'>
								{likedSongs.length} songs
							</p>
						</div>
					</div>
				</div>

				{/* Controls */}
				<div className='p-8'>
					<button
						onClick={() => handlePlaySong(0)}
						disabled={likedSongs.length === 0}
						className='size-14 rounded-full bg-green-500 flex items-center justify-center hover:scale-105 transition-all'
					>
						{isPlaying && currentSong && likedSongs.some(s => s._id === currentSong._id) ? (
							<Pause className='size-7 text-black fill-current' />
						) : (
							<Play className='size-7 text-black fill-current ml-1' />
						)}
					</button>
				</div>

				{/* Table */}
				<div className='px-8 pb-10'>
					<div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 border-b border-white/10 mb-4'>
						<div>#</div>
						<div>Title</div>
						<div>Artist</div>
						<div className='flex justify-end'>
							<Clock className='size-4' />
						</div>
					</div>

					<div className='space-y-1'>
						{likedSongs.map((song, index) => {
							const isCurrentSong = currentSong?._id === song._id;
							return (
								<div
									key={song._id}
									className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group transition-colors cursor-pointer'
									onClick={() => handlePlaySong(index)}
								>
									<div className='flex items-center justify-center'>
										{isCurrentSong && isPlaying ? (
											<div className='size-4 text-green-500'>
												<Pause className='size-4 fill-current' />
											</div>
										) : (
											<span className='group-hover:hidden'>{index + 1}</span>
										)}
										{!isCurrentSong && (
											<Play className='size-4 text-white fill-current hidden group-hover:block' />
										)}
									</div>

									<div className='flex items-center gap-3'>
										<img src={song.imageUrl} alt={song.title} className='size-10 rounded' />
										<div>
											<p className={`font-medium ${isCurrentSong ? "text-green-500" : "text-white"}`}>
												{song.title}
											</p>
										</div>
									</div>

									<div className='flex items-center'>{song.artist}</div>

									<div className='flex items-center justify-end gap-4'>
										<button
											onClick={(e) => {
												e.stopPropagation();
												toggleLike(song._id);
											}}
											className='text-green-500 hover:scale-110 transition-transform'
										>
											<Heart className='size-4 fill-current' />
										</button>
										<span>{formatDuration(song.duration)}</span>
									</div>
								</div>
							);
						})}
					</div>

					{likedSongs.length === 0 && (
						<div className='flex flex-col items-center justify-center h-64 text-zinc-400'>
							<Heart className='size-12 mb-4' />
							<p className='text-lg font-medium'>Your liked songs will appear here</p>
							<p className='text-sm'>Start liking songs to build your collection!</p>
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	);
};

export default LikedSongsPage;
