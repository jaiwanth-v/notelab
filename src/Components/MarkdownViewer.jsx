import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import toc from "remark-toc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
/* Use `…/dist/cjs/…` if you’re not in ESM! */
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import "github-markdown-css";

const renderers = {
  code:({language,value})=>{
  const newCode = value
  return <SyntaxHighlighter style={coy} language={language} children={newCode || "" } />
}
}

function MarkdownViewer({ children }) {
  return (
      <ReactMarkdown
        className="Markdown markdown-body"
        plugins = {[gfm, toc, emoji]}
        renderers={renderers}
      >
        {children}
      </ReactMarkdown>
  );
}

export default MarkdownViewer;
