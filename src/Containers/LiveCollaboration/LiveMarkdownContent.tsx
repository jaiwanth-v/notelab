import React from "react";
import { useSelector } from "react-redux";
import MarkdownViewer from "../../Components/MarkdownViewer";

interface Props {}

const LiveMarkdownContent: React.FC<Props> = () => {
  const activeContent = useSelector((state: any) => state.activeContent);
  return <MarkdownViewer>{activeContent}</MarkdownViewer>;
};

export default LiveMarkdownContent;
