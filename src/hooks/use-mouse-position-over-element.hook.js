import React from 'react';

import useBoundingBox from './use-bounding-box.hook';

export default function useMousePositionOverElement(callback) {
  const [ref, bb] = useBoundingBox();

  React.useEffect(() => {
    if (!bb) {
      return;
    }

    const handleMouseMove = ev => {
      // Check if the cursor is inside the box
      const insideX = ev.pageX > bb.left && ev.pageX < bb.right;
      const insideY = ev.pageY > bb.top && ev.pageY < bb.bottom;

      const x = ev.pageX - bb.left;
      const y = ev.pageY - bb.top;

      if (insideX && insideY) {
        callback(x, y, ev);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [bb, callback]);

  return ref;
}
