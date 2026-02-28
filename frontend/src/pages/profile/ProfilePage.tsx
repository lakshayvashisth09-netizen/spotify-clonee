import { useUser } from "@clerk/clerk-react";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Music, UserIcon } from "lucide-react";

const ProfilePage = () => {
	const { user } = useUser();
	const { likedSongs, fetchLikedSongs } = useUserStore();

	useEffect(() => {
		fetchLikedSongs();
	}, [fetchLikedSongs]);

	return (
		<div className='h-full bg-zinc-900'>
			<ScrollArea className='h-full'>
				<div className='relative h-80 flex items-end p-8 bg-gradient-to-b from-zinc-700 to-zinc-900'>
					<div className='flex items-center gap-6'>
						<div className='size-52 shadow-2xl rounded-full overflow-hidden border-4 border-zinc-800'>
							{user?.imageUrl ? (
								<img src={user.imageUrl} alt={user.fullName || "User"} className='size-full object-cover' />
							) : (
								<div className='size-full bg-zinc-800 flex items-center justify-center'>
									<UserIcon className='size-24 text-zinc-600' />
								</div>
							)}
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-sm font-bold text-white uppercase'>Profile</p>
							<h1 className='text-8xl font-black text-white'>{user?.fullName}</h1>
							<div className='flex items-center gap-2 text-zinc-300 font-medium'>
								<span>{user?.primaryEmailAddress?.emailAddress}</span>
							</div>
						</div>
					</div>
				</div>

				<div className='p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
					<div className='bg-zinc-800/40 p-6 rounded-lg'>
						<div className='flex items-center gap-4 mb-6'>
							<div className='p-3 bg-green-500/10 rounded-full'>
								<Heart className='size-6 text-green-500' />
							</div>
							<div>
								<h3 className='text-xl font-bold text-white'>Liked Songs</h3>
								<p className='text-zinc-400'>{likedSongs.length} songs in your collection</p>
							</div>
						</div>
						<div className='space-y-4'>
							{likedSongs.slice(0, 5).map((song) => (
								<div key={song._id} className='flex items-center gap-3'>
									<img src={song.imageUrl} alt={song.title} className='size-10 rounded' />
									<div className='flex-1 min-w-0'>
										<p className='text-sm font-medium text-white truncate'>{song.title}</p>
										<p className='text-xs text-zinc-400 truncate'>{song.artist}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className='bg-zinc-800/40 p-6 rounded-lg'>
						<div className='flex items-center gap-4 mb-6'>
							<div className='p-3 bg-blue-500/10 rounded-full'>
								<Music className='size-6 text-blue-500' />
							</div>
							<div>
								<h3 className='text-xl font-bold text-white'>Activity</h3>
								<p className='text-zinc-400'>Your recent listening activity</p>
							</div>
						</div>
						<div className='flex items-center justify-center h-40 text-zinc-500 italic'>
							No recent activity to show
						</div>
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};

export default ProfilePage;
