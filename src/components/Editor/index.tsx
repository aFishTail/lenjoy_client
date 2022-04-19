import dynamic from 'next/dynamic'
import { EditorState } from 'draft-js'
import { useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
)

const uploadImageCallBack = async (file) => {
  // const imgData = await apiClient.uploadInlineImageForArticle(file);
  // return Promise.resolve({ data: {
  //   link: `${process.env.NEXT_PUBLIC_API_URL}${imgData[0].formats.small.url}`
  // }});
  console.log('upload image', file)
  return {
      data: {link: 'test.url'}
  }
}

const MyEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  return (
    <article>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={editorState => setEditorState(editorState)}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'embedded',
            'emoji',
            'image',
            'history',
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            uploadCallback: uploadImageCallBack,
            previewImage: true,
            alt: { present: false, mandatory: false },
          },
        }}
      ></Editor>
    </article>
  )
}
export default MyEditor
