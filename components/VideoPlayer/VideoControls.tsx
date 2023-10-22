'use client';
import React from 'react';
import { motion } from 'framer-motion';
import PlayButton from '../../public/play.svg';
import PauseButton from '../../public/pause.svg';

interface VideoControlsProps {
	progress: number;
	size?: number | undefined;
	width?: number | undefined;
	isPaused: boolean;
	onPlayPause: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
	progress,
	size = 48,
	width = 3,
	isPaused,
	onPlayPause,
}) => {
	const center = size / 2;
	const radius = center - width;
	const dashArray = 2 * Math.PI * radius;
	const dashOffset = dashArray * (1 - progress);

	return (
		<div className='relative flex justify-center items-center'>
			<motion.svg
				width={size}
				height={size}
				style={{ transform: 'rotate(-90deg)' }}
			>
				<circle
					cx={center}
					cy={center}
					r={radius}
					fill='transparent'
					stroke='#aaaaaa'
					strokeWidth={width}
				/>
				<circle
					cx={center}
					cy={center}
					r={radius}
					fill='transparent'
					stroke='#ffffff'
					strokeWidth={width}
					strokeDasharray={dashArray}
					strokeDashoffset={Number(dashOffset)}
					strokeLinecap='round'
				/>
			</motion.svg>
			<div className='absolute'>
				<button
					className='group cursor-pointer flex justify-center items-center'
					onClick={onPlayPause}
				>
					<div className=' fill-white group-hover:fill-[#aaaaaa] transition-colors duration-200 ease-in-out'>
						{isPaused ? <PlayButton /> : <PauseButton />}
					</div>
				</button>
			</div>
		</div>
	);
};

export default VideoControls;
