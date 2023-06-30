import { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { FORMAT_TEXT_COMMAND } from "lexical"
import { AiOutlineBold } from "react-icons/ai"
import styles from "./ToolbarPlugin.module.css"
import { useTheme } from "@nextui-org/react"

export default function ToolbarPlugin(props: any): JSX.Element {
  const { isDark } = useTheme()
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [isBold, setIsBold] = useState(false)

  return (
    <div className={`${styles.toolbar} ${isDark && styles.dark}`}>
      <button
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
          setIsBold((p) => !p)
        }}
        className={`${styles.toolbar_item} ${styles.spaced} ${isBold && styles.active} ${
          isDark && styles.dark
        }`}
        title={"Bold"}
        type="button"
      >
        <AiOutlineBold />
      </button>
    </div>
  )
}
