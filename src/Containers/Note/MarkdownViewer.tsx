import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import toc from "remark-toc";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import "github-markdown-css/github-markdown.css";

function flatten(text: string, child: any): any {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function headingRenderer({ level, children }: any) {
  const childrenArr = React.Children.toArray(children);
  const text = childrenArr.reduce(flatten, "");
  const slug = text.toLowerCase().replace(/\./g, "").replace(/\W/g, "-");

  const header = [
    React.createElement("h" + level, { key: slug, id: slug }, children),
  ];
  return header;
}

const renderers: any = {
  code: ({ language, value }: any) => {
    return (
      <SyntaxHighlighter style={prism} language={language}>
        {value}
      </SyntaxHighlighter>
    );
  },
  heading: headingRenderer,
};

function MarkdownViewer({ children }: any) {
  return (
    <ReactMarkdown
      className="markdown-body"
      renderers={renderers}
      plugins={[gfm, emoji, toc]}
    >
      {children}
    </ReactMarkdown>
  );
}

export default MarkdownViewer;
