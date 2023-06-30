import { $getRoot, $getSelection } from "lexical"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import ToolbarPlugin from "./ToolbarPlugin"

const theme = {}

function onChange(editorState) {
  editorState.read(() => {
    const root = $getRoot()
    const selection = $getSelection()

    console.log(root, selection)
  })
}

function onError(error) {
  console.error(error)
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
    </LexicalComposer>
  )
}
