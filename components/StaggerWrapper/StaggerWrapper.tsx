'use client';
import React, { ReactNode, Key } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type props = {
	children: ReactNode;
	index: number;
};
export function StaggerWrapper({ children, index }: props) {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5, delay: index * 0.1 }} // Adjust delay for stagger
				>
					{children}
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
}
