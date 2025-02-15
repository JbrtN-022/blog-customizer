//извините за проблемы с ветками, я забыл как их делать, поэтому получилось так криво
import { useEffect } from 'react';
type UseClickOverlay = {
	isOpen: boolean;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLElement>;
};
export const useCloseArticleOverlay = ({
	isOpen,
	rootRef,
	onClose,
}: UseClickOverlay) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				onClose?.();
			}
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose?.();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose, rootRef]);
};
