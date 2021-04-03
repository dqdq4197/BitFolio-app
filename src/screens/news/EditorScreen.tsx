import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import GeneralTemplate from '/components/GeneralTemplate';
import Editor from '/components/mdEditor/Editor';

const EditorScreen = () => {
  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({tabBarVisible: false});
  }, [])

  return (
    <GeneralTemplate>
      <Editor/>
    </GeneralTemplate>
  )
}

export default EditorScreen;