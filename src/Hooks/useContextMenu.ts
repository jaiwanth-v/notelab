import { useEffect, useCallback, useState } from "react";

const useContextMenu = (outerRef: any, className: string) => {
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");
  const [menu, showMenu] = useState(false);
  const [target, setTarget] = useState<any>(null);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      if (outerRef && outerRef.current.contains(event.target)) {
        setXPos(`${event.pageX}px`);
        setYPos(`${event.pageY}px`);
        const target = event.target.closest(className);
        if (target) {
          showMenu(true);
          setTarget(target);
        }
      } else {
        setTarget(null);
        showMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos, className]
  );

  const handleClick = useCallback(() => {
    showMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.addEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return {
    xPos,
    yPos,
    menu,
    id: target ? target.id : null,
    name: target ? target.innerText : null,
  };
};

export default useContextMenu;
