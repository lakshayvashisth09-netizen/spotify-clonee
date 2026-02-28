import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import {
	Laptop2,
	ListMusic,
	Mic2,
	Pause,
	Play,
	Repeat,
	Shuffle,
	SkipBack,
	SkipForward,
	Volume1,
	Volume2,
	VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
	const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();

	const [volume, setVolume] = useState(75);
	const [muted, setMuted] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		audioRef.current = document.querySelector("audio");

		const audio = audioRef.current;
		if (!audio) return;

		const updateTime = () => setCurrentTime(audio.currentTime);
		const updateDuration = () => setDuration(audio.duration);

		audio.addEventListener("timeupdate", updateTime);
		audio.addEventListener("loadedmetadata", updateDuration);

		const handleEnded = () => {
			usePlayerStore.setState({ isPlaying: false });
		};

		audio.addEventListener("ended", handleEnded);

		return () => {
			audio.removeEventListener("timeupdate", updateTime);
			audio.removeEventListener("loadedmetadata", updateDuration);
			audio.removeEventListener("ended", handleEnded);
		};
	}, [currentSong]);

	const handleSeek = (value: number[]) => {
		if (audioRef.current) {
			audioRef.current.currentTime = value[0];
		}
	};

	const toggleMute = () => {
		if (!audioRef.current) return;
		const newMuted = !muted;
		setMuted(newMuted);
		audioRef.current.muted = newMuted;
	};

	const volumeIcon =
		muted || volume === 0 ? (
			<VolumeX className='h-4 w-4' />
		) : volume < 50 ? (
			<Volume1 className='h-4 w-4' />
		) : (
			<Volume2 className='h-4 w-4' />
		);

	return (
		<footer className='h-20 sm:h-24 bg-[#121212] border-t border-zinc-800/50 px-4'>
			<div className='flex justify-between items-center h-full max-w-[1800px] mx-auto gap-4'>
				{/* currently playing song */}
				<div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
					{currentSong && (
						<>
							<img
								src={currentSong.imageUrl}
								alt={currentSong.title}
								className='w-14 h-14 object-cover rounded-md shadow-lg'
							/>
							<div className='flex-1 min-w-0'>
								<div className='font-medium truncate hover:underline cursor-pointer text-sm text-white'>
									{currentSong.title}
								</div>
								<div className='text-xs text-zinc-400 truncate hover:underline cursor-pointer'>
									{currentSong.artist}
								</div>
							</div>
						</>
					)}
				</div>

				{/* player controls*/}
				<div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[40%] px-4'>
					<div className='flex items-center gap-4 sm:gap-6'>
						<Button
							size='icon'
							variant='ghost'
							className='hidden sm:inline-flex hover:text-white text-zinc-400 transition-colors'
						>
							<Shuffle className='h-4 w-4' />
						</Button>

						<Button
							size='icon'
							variant='ghost'
							className='hover:text-white text-zinc-400 transition-colors'
							onClick={playPrevious}
							disabled={!currentSong}
						>
							<SkipBack className='h-5 w-5 fill-current' />
						</Button>

						<Button
							size='icon'
							className='bg-white hover:scale-105 transition-all text-black rounded-full h-8 w-8 flex items-center justify-center'
							onClick={togglePlay}
							disabled={!currentSong}
						>
							{isPlaying ? <Pause className='h-5 w-5 fill-current' /> : <Play className='h-5 w-5 fill-current ml-0.5' />}
						</Button>

						<Button
							size='icon'
							variant='ghost'
							className='hover:text-white text-zinc-400 transition-colors'
							onClick={playNext}
							disabled={!currentSong}
						>
							<SkipForward className='h-5 w-5 fill-current' />
						</Button>

						<Button
							size='icon'
							variant='ghost'
							className='hidden sm:inline-flex hover:text-white text-zinc-400 transition-colors'
						>
							<Repeat className='h-4 w-4' />
						</Button>
					</div>

					<div className='hidden sm:flex items-center gap-2 w-full group'>
						<div className='text-[10px] text-zinc-400 min-w-[40px] text-right'>{formatTime(currentTime)}</div>
						<Slider
							value={[currentTime]}
							max={duration || 100}
							step={1}
							className='w-full'
							onValueChange={handleSeek}
						/>
						<div className='text-[10px] text-zinc-400 min-w-[40px]'>{formatTime(duration)}</div>
					</div>
				</div>

				{/* volume controls */}
				<div className='hidden sm:flex items-center gap-3 min-w-[220px] w-[30%] justify-end pr-2'>
					<div className='flex items-center gap-1'>
						<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400 h-8 w-8 shrink-0'>
							<Mic2 className='h-4 w-4' />
						</Button>
						<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400 h-8 w-8 shrink-0'>
							<ListMusic className='h-4 w-4' />
						</Button>
						<Button size='icon' variant='ghost' className='hover:text-white text-zinc-400 h-8 w-8 shrink-0'>
							<Laptop2 className='h-4 w-4' />
						</Button>
					</div>

					<div className='flex items-center gap-2 w-32 group'>
						<Button
							size='icon'
							variant='ghost'
							className='hover:text-white text-zinc-400 h-8 w-8 shrink-0'
							onClick={toggleMute}
						>
							{volumeIcon}
						</Button>

						<Slider
							value={[muted ? 0 : volume]}
							max={100}
							step={1}
							className='w-24'
							onValueChange={(value) => {
								const newVol = value[0];
								setVolume(newVol);
								if (audioRef.current) {
									audioRef.current.volume = newVol / 100;
									if (muted && newVol > 0) {
										audioRef.current.muted = false;
										setMuted(false);
									}
								}
							}}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};
