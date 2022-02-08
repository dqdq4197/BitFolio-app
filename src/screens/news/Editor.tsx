import React from 'react';
import GeneralTemplate from '/components/GeneralTemplate';
import Editor from '/components/mdEditor/Editor';
import { MdEditorProvider } from '/hooks/useMdEditorContext';

const EditorScreen = () => {
  return (
    <GeneralTemplate>
      <MdEditorProvider>
        <Editor />
      </MdEditorProvider>
    </GeneralTemplate>
  );
};

export default EditorScreen;
