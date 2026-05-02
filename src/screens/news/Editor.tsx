import Editor from '/components/mdEditor/Editor'
import { MdEditorProvider } from '/hooks/context/useMdEditorContext'

const EditorScreen = () => {
  return (
    <MdEditorProvider>
      <Editor />
    </MdEditorProvider>
  )
}

export default EditorScreen
