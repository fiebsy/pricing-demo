"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableWheel = void 0;
const react_1 = require("react");
function useTableWheel({ bodyScrollRef }) {
    (0, react_1.useEffect)(() => {
        const bodyScroll = bodyScrollRef.current;
        if (!bodyScroll)
            return;
        const handleWheel = (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                // CRITICAL: preventDefault FIRST to stop browser's default scroll handling
                e.preventDefault();
                e.stopPropagation();
                // Redirect vertical scroll to the window
                window.scrollBy({
                    top: e.deltaY,
                    behavior: 'instant',
                });
            }
        };
        bodyScroll.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            bodyScroll.removeEventListener('wheel', handleWheel);
        };
    }, [bodyScrollRef]);
}
exports.useTableWheel = useTableWheel;
//# sourceMappingURL=use-table-wheel.js.map