import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import emoji from "remark-emoji";
import toc from "remark-toc";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
/* Use `…/dist/cjs/…` if you’re not in ESM! */
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

export const components = {
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter style={dark} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
}


function MarkdownViewer({ children }) {
  return (
    <ReactMarkdown
      className="markdown-body"
      plugins={[gfm, emoji, toc]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}

export default MarkdownViewer;
