import { useCallback, useEffect, useState } from 'react';

export const useResizablePanes = (initialWidth: number = 50) => {
  const [leftPaneWidth, setLeftPaneWidth] = useState(initialWidth);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newLeftPaneWidth = (e.clientX / window.innerWidth) * 100;
        setLeftPaneWidth(Math.max(20, Math.min(80, newLeftPaneWidth)));
      }
    },
    [isDragging],
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { leftPaneWidth, handleMouseDown };
};
