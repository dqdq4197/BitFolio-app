import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import GeneralTemplate from '/components/GeneralTemplate';
import Editor from '/components/mdEditor/Editor';
import { MdEditorProvider } from '/hooks/useMdEditorContext';

const EditorScreen = () => {
  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({tabBarVisible: false});
  }, [])

  return (
    <GeneralTemplate>
      <MdEditorProvider>
        <Editor/>
      </MdEditorProvider>
    </GeneralTemplate>
  )
}

export default EditorScreen;