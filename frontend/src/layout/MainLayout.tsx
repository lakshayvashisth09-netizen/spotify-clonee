import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";
import { useEffect, useState } from "react";




const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className='h-screen bg-black text-white flex flex-col'>
			<div className='flex-1 flex flex-col overflow-hidden'>
	 			<ResizablePanelGroup orientation='horizontal' className='flex-1 overflow-hidden'>
	 				{/* left sidebar */}
	 				<ResizablePanel defaultSize={'20%'} minSize={isMobile ? '0%' : '10%'} maxSize={'30%'}>
						<LeftSidebar />
					</ResizablePanel>

					<ResizableHandle className='w-1 bg-zinc-800 hover:bg-zinc-700 transition-colors' />

					{/* Main content */}
 					<ResizablePanel defaultSize={isMobile ? '80%' : '60%'}>
						<Outlet />
					</ResizablePanel>

					{!isMobile && (
						<>
							<ResizableHandle className='w-1 bg-zinc-800 hover:bg-zinc-700 transition-colors' />

							{/* right sidebar */}
	 						<ResizablePanel defaultSize={'20%'} minSize={'0%'} maxSize={'25%'} collapsible>
								<FriendsActivity />
							</ResizablePanel>
						</>
					)}
				</ResizablePanelGroup>
			</div>

			<div className='border-t border-zinc-800'>
				<AudioPlayer />
			</div>
			<PlaybackControls />
		</div>
	);
};


export default MainLayout;
