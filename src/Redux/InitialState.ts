import uuid from "../Utils/randomIdGenerator";

const notebookId = uuid();
const noteId = uuid();

const markdownContent =
  "# Welcome to Joplin! 🗒️\n" +
  "\n" +
  "Joplin is a free, open source note taking and to-do application, which helps you write and organise your notes, and synchronise them between your devices. The notes are searchable, can be copied, tagged and modified either from the application directly or from your own text editor. The notes are in [Markdown format](https://joplinapp.org/#markdown). Joplin is available as a **💻 desktop**, **📱 mobile** and **🔡 terminal** application.\n" +
  "\n" +
  "The notes in this notebook give an overview of what Joplin can do and how to use it. In general, the three applications share roughly the same functionalities; any differences will be clearly indicated.\n" +
  "\n" +
  "![](./AllClients.png)\n" +
  "\n" +
  "## Joplin is divided into three parts\n" +
  "\n" +
  "Joplin has three main columns:\n" +
  "\n" +
  "- **Sidebar** contains the list of your notebooks and tags, as well as the synchronisation status.\n" +
  "- **Note List** contains the current list of notes - either the notes in the currently selected notebook, the notes in the currently selected tag, or search results.\n" +
  "- **Note Editor** is the place where you write your notes. There is a **WYSIWYG editor** and a **Markdown editor** - click on **Code View** to switch between both! You may also use an [external editor](https://joplinapp.org/#external-text-editor) to edit notes. For example you can use something like Typora as an external editor and it will display the note as well as any embedded images.\n" +
  "\n" +
  "## Writing notes in Markdown\n" +
  "\n" +
  "Markdown is a lightweight markup language with plain text formatting syntax. Joplin supports a [Github-flavoured Markdown syntax](https://joplinapp.org/markdown/) with a few variations and additions.\n" +
  "\n" +
  "In general, while Markdown is a markup language, it is meant to be human readable, even without being rendered. This is a simple example (you can see how it looks in the viewer panel):\n" +
  "\n" +
  "* * *\n" +
  "\n" +
  "# Heading\n" +
  "\n" +
  "## Sub-heading\n" +
  "\n" +
  "Paragraphs are separated by a blank line. Text attributes _italic_, **bold** and `monospace` are supported. You can create bullet lists:\n" +
  "\n" +
  "* apples\n" +
  "* oranges\n" +
  "* pears\n" +
  "\n" +
  "Or numbered lists:\n" +
  "\n" +
  "1. wash\n" +
  "2. rinse\n" +
  "3. repeat\n" +
  "\n" +
  "This is a [link](https://joplinapp.org) and, finally, below is a horizontal rule:\n" +
  "\n" +
  "* * *\n" +
  "\n" +
  "A lot more is possible including adding code samples, math formulae or checkbox lists - see the [Markdown documentation](https://joplinapp.org/#markdown) for more information.\n" +
  "\n" +
  "## Organising your notes\n" +
  "\n" +
  "### With notebooks 📔\n" +
  "\n" +
  "Joplin notes are organised into a tree of notebooks and sub-notebooks.\n" +
  "\n" +
  "- On **desktop**, you can create a notebook by clicking on New Notebook, then you can drag and drop them into other notebooks to organise them as you wish.\n" +
  '- On **mobile**, press the "+" icon and select "New notebook".\n' +
  "- On **terminal**, press `:mn`\n" +
  "\n" +
  "![](./SubNotebooks.png)\n" +
  "\n" +
  "### With tags 🏷️\n" +
  "\n" +
  "The second way to organise your notes is using tags:\n" +
  "\n" +
  '- On **desktop**, right-click on any note in the Note List, and select "Edit tags". You can then add the tags, separating them by commas.\n' +
  '- On **mobile**, open the note and press the "⋮" button and select "Tags".\n' +
  "- On **terminal**, type `:help tag` for the available commands.\n";
const defaultState = {
  notebooks: [
    {
      title: "Welcome to Joplin Web Companion",
      id: notebookId,
      notes: [
        {
          id: noteId,
          title: "Welcome Note",
          is_todo: false,
          todo_completed: false,
          body: markdownContent,
        },
      ],
    },
  ],
  activeNote: noteId,
  activeNotebook: notebookId,
  activeContent: markdownContent,
  activeNoteTitle: "Welcome Note",
};

export default defaultState;
