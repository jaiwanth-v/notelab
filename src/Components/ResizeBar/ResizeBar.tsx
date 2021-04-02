import React, { useEffect, useState } from "react";
import "./ResizeBar.scss";

interface Props {
  index: number;
}

const ResizeBar: React.FC<Props> = ({ index }) => {
  const [isResizing, setResizing] = useState(false);
  useEffect(() => {
    function stopResizing(event: MouseEvent) {
      setResizing(false);
    }
    function resizePanel(event: MouseEvent) {
      event.preventDefault();
      let notebooks: any = document.querySelector(".notebooks");
      let notes: any = document.querySelector(".notes");
      if (!index && isResizing) {
        notebooks.style.width = `${event.clientX}px`;
        notebooks.style.flex = `0 0 ${event.clientX}px`;
      }
      if (index === 1 && isResizing) {
        let notebooksWidth = notebooks.style.width
          ? Number(notebooks.style.width.split("px")[0]) + 6
          : 256;
        notes.style.width = `${event.clientX - notebooksWidth}px`;
        notes.style.flex = `0 0 ${event.clientX - notebooksWidth}px`;
      }
    }
    document.addEventListener("mousemove", resizePanel);
    document.addEventListener("mouseup", stopResizing);
    return () => {
      document.removeEventListener("mousemove", resizePanel);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing, index]);
  return (
    <div onMouseDown={() => setResizing(true)} className="resize-bar"></div>
  );
};

export default ResizeBar;
