import { useState, useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import { Search, Music, Disc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import PlayButton from "../home/components/PlayButton";
import SectionGridSkeleton from "../home/components/SectionGridSkeleton";
import LikeButton from "@/components/LikeButton";

const SearchPage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const { searchSongs, songs, albums, isLoading } = useMusicStore();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (searchQuery.trim()) {
				searchSongs(searchQuery);
			}
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [searchQuery, searchSongs]);

	return (
		<div className='h-full bg-zinc-900 overflow-hidden'>
			<div className='p-6 h-full flex flex-col'>
				<div className='relative max-w-2xl mb-8'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 size-5' />
					<Input
						placeholder='What do you want to listen to?'
						className='pl-10 h-12 bg-zinc-800 border-none text-white focus-visible:ring-1 focus-visible:ring-white/20'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<ScrollArea className='flex-1'>
					{isLoading ? (
						<SectionGridSkeleton />
					) : (
						<div className='space-y-8'>
							{songs.length > 0 && (
								<section>
									<h2 className='text-2xl font-bold text-white mb-4'>Songs</h2>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
										{songs.map((song) => (
											<div
												key={song._id}
												className='flex items-center gap-4 p-2 rounded-md hover:bg-zinc-800/50 group transition-colors'
											>
												<div className='relative size-12 flex-shrink-0'>
													<img
														src={song.imageUrl}
														alt={song.title}
														className='size-full object-cover rounded'
													/>
													<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded'>
														<PlayButton song={song} />
													</div>
												</div>
												<div className='flex-1 min-w-0'>
													<p className='font-medium text-white truncate'>{song.title}</p>
													<p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
												</div>
												<div className='flex items-center gap-4'>
													<LikeButton songId={song._id} />
												</div>
											</div>
										))}
									</div>
								</section>
							)}

							{albums.length > 0 && (
								<section>
									<h2 className='text-2xl font-bold text-white mb-4'>Albums</h2>
									<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
										{albums.map((album) => (
											<Link
												to={`/albums/${album._id}`}
												key={album._id}
												className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-800 transition-colors group'
											>
												<div className='relative aspect-square mb-4'>
													<img
														src={album.imageUrl}
														alt={album.title}
														className='size-full object-cover rounded shadow-lg'
													/>
												</div>
												<p className='font-medium text-white truncate mb-1'>{album.title}</p>
												<p className='text-sm text-zinc-400 truncate'>{album.artist}</p>
											</Link>
										))}
									</div>
								</section>
							)}

							{!isLoading && searchQuery && songs.length === 0 && albums.length === 0 && (
								<div className='flex flex-col items-center justify-center h-64 text-zinc-400'>
									<Disc className='size-12 mb-4 animate-spin-slow' />
									<p className='text-lg'>No results found for "{searchQuery}"</p>
									<p className='text-sm'>Please try a different search term.</p>
								</div>
							)}

							{!searchQuery && (
								<div className='flex flex-col items-center justify-center h-64 text-zinc-400'>
									<Music className='size-12 mb-4' />
									<p className='text-lg'>Search for your favorite songs or artists</p>
								</div>
							)}
						</div>
					)}
				</ScrollArea>
			</div>
		</div>
	);
};

export default SearchPage;
