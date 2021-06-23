import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import Editor from '/components/mdEditor/Editor';
import { MdEditorProvider } from '/hooks/useMdEditorContext';
import ErrorBoundaryAndSuspense from '/components/common/ErrorBoundaryAndSuspense';


const EditorScreen = () => {

  return (
    <GeneralTemplate>
      <MdEditorProvider>
        <Editor/>
      </MdEditorProvider>
    </GeneralTemplate>
  )
}

export default EditorScreen;