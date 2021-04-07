import React, { memo } from "react";
import { applyFormat } from "./Formatting";

interface Props {
  cmRef: any;
}

const { FORMATS }: any = require("./Formatting");

const Toolbar: React.FC<Props> = ({ cmRef }) => {
  const toggleFormat = (formatKey: any, e: any) => {
    e.preventDefault();
    applyFormat(cmRef, formatKey);
  };
  console.log(cmRef);
  const renderToolbar = () => {
    let arr: JSX.Element[] = [];
    for (let format in FORMATS) {
      if (["h1", "h2", "h3"].indexOf(format) >= 0) {
        arr.push(
          <i
            onClick={(e) => toggleFormat(format, e)}
            key={format}
            className={`toolbar-headings`}
            title={format}
          >
            {format.toUpperCase()}
          </i>
        );
      } else
        arr.push(
          <i
            onClick={(e) => toggleFormat(format, e)}
            key={format}
            className={`${FORMATS[format].icon}`}
            title={format}
          ></i>
        );
    }
    return arr.map((icon) => icon);
  };
  return <div className="toolbar">{renderToolbar()}</div>;
};

export default memo(Toolbar);
