'use client';

import React, { useState, useRef, useEffect } from 'react';
import VideoControls from './VideoControls';

type props = {
	src: string;
};
export default function VideoPlayer({ src }: props) {
	const [videoProgress, setVideoProgress] = useState<number>(0);
	const [videoDuration, setVideoDuration] = useState<number>();
	const [isPaused, setIsPaused] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			setVideoDuration(video.duration);
		}
	}, []);

	useEffect(() => {
		if (isPaused) return;
		const currentTime = videoRef.current?.currentTime;
		if (videoDuration != null && currentTime != null) {
			let loadingTimeout = setTimeout(() => {
				if (videoProgress == currentTime / videoDuration) {
					setVideoProgress((prev) => prev + 0.000001);
				} else {
					setVideoProgress(currentTime / videoDuration);
				}
			}, 10);

			return () => {
				clearTimeout(loadingTimeout);
			};
		}
	}, [videoProgress, videoDuration, isPaused]);

	const togglePlayPause = () => {
		const video = videoRef.current;
		if (video) {
			setIsPaused(!video.paused);
			video.paused ? video.play() : video.pause();
		}
	};
	return (
		<>
			<div className='relative w-full h-full aspect-auto rounded-lg overflow-hidden mt-4 shadow-md shadow-gray-500 mx-auto'>
				<div className='absolute top-4 right-4 z-10'>
					<VideoControls
						progress={videoProgress}
						isPaused={isPaused}
						onPlayPause={togglePlayPause}
					/>
				</div>
				<video className='w-full h-full object-contain' ref={videoRef} loop>
					<source src={`${src}`} />
				</video>
			</div>
		</>
	);
}
