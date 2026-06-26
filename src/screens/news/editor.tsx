import Editor from '@/components/md-editor/editor'
import { MdEditorProvider } from '@/hooks/context/use-md-editor-context'

const EditorScreen = () => {
  return (
    <MdEditorProvider>
      <Editor />
    </MdEditorProvider>
  )
}

export default EditorScreen
