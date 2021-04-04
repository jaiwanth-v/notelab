import React from "react";
import { applyFormat } from "./Formatting";

interface Props {
  cmRef: any;
  cs: any;
}

const { FORMATS }: any = require("./Formatting");

const Toolbar: React.FC<Props> = ({ cmRef, cs }) => {
  const toggleFormat = (formatKey: any, e: any) => {
    e.preventDefault();
    applyFormat(cmRef, formatKey);
  };
  const renderToolbar = () => {
    let arr: JSX.Element[] = [];
    for (let format in FORMATS) {
      if (["h1", "h2", "h3"].indexOf(format) >= 0) {
        arr.push(
          <i
            onClick={(e) => toggleFormat(format, e)}
            key={format}
            className={`toolbar-headings ${cs[format] ? "active" : ""}`}
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
            className={`${FORMATS[format].icon} ${cs[format] ? "active" : ""}`}
            title={format}
          ></i>
        );
    }
    return arr.map((icon) => icon);
  };
  return <div className="toolbar">{renderToolbar()}</div>;
};

export default Toolbar;
