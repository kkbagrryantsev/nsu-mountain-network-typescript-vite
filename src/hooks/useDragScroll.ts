import React from "react";

export const useDragScroll = () => {
    const [node, setNode] = React.useState<HTMLElement>();

    const ref = React.useCallback((nodeEle: React.SetStateAction<HTMLElement | undefined>) => {
        setNode(nodeEle);
    }, []);

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
        if (!node) {
            return;
        }
        const startPos = {
            left: node.scrollLeft,
            top: node.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };

        const handleMouseMove = (e: React.MouseEvent) => {
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;
            node.scrollTop = startPos.top - dy;
            node.scrollLeft = startPos.left - dx;
            updateCursor(node);
        };

        const handleMouseUp = () => {
            // @ts-ignore
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resetCursor(node);
        };

        // @ts-ignore
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [node]);

    const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
        if (!node) {
            return;
        }
        const touch = e.touches[0];
        const startPos = {
            left: node.scrollLeft,
            top: node.scrollTop,
            x: touch.clientX,
            y: touch.clientY,
        };

        const handleTouchMove = (e: React.TouchEvent) => {
            const touch = e.touches[0];
            const dx = touch.clientX - startPos.x;
            const dy = touch.clientY - startPos.y;
            node.scrollTop = startPos.top - dy;
            node.scrollLeft = startPos.left - dx;
            updateCursor(node);
        };

        const handleTouchEnd = () => {
            // @ts-ignore
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            resetCursor(node);
        };

        // @ts-ignore
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }, [node]);

    const updateCursor = (ele: HTMLElement) => {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';
    };

    const resetCursor = (ele: HTMLElement) => {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');
    };

    React.useEffect(() => {
        if (!node) {
            return;
        }
        // @ts-ignore
        node.addEventListener("mousedown", handleMouseDown);
        // @ts-ignore
        node.addEventListener("touchstart", handleTouchStart);
        return () => {
            // @ts-ignore
            node.removeEventListener("mousedown", handleMouseDown);
            // @ts-ignore
            node.removeEventListener("touchstart", handleTouchStart);
        };
    }, [node]);

    return [ref];
};