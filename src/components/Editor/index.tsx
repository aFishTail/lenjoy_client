import dynamic from 'next/dynamic'
import { ContentState, convertToRaw, EditorState, convertFromHTML } from 'draft-js'
import { Component, useEffect, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styles from './index.module.css'
import { Button } from '@chakra-ui/react'
import draftToHtml from 'draftjs-to-html'
import { topicEditorContent } from '@/context/topic'
import { FileProvider } from '@/providers/file'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
)

const uploadImageCallBack = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const { url } = await FileProvider.uploadArticleImage(formData)
  // console.log('上传图片', data, { data: { link: data.url } })
  return { data: { link: url } }
}

interface Props {
  defaultContent: string
  onChange: (arg: string) => void
}

interface MediaProps {
  contentState: any
  block: any
  blockProps: any
}

interface Sate {}

export const myBlockRenderer = (contentBlock: any): any => {
  const type = contentBlock.getType()

  // 图片类型转换为mediaComponent
  if (type === 'atomic') {
    return {
      component: Media,
      editable: false,
      props: {
        foo: 'bar',
      },
    }
  }
}

class Media extends Component<MediaProps, Sate> {
  render() {
    const { block, contentState } = this.props
    const data = contentState.getEntity(block.getEntityAt(0)).getData()
    const emptyHtml = ' '
    return (
      <div>
        {emptyHtml}
        <img
          src={data.src}
          alt={data.alt || ''}
          style={{ height: data.height || 'auto', width: data.width || 'auto' }}
        />
      </div>
    )
  }
}

const MyEditor: React.FC<Props> = ({ defaultContent, onChange }) => {
  // const { setContent } = useContext(topicEditorContent)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  useEffect(() => {
    const blocksFromHtml = convertFromHTML(defaultContent || '')
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      )
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
  }, [])
  const onEditorStateChange = (state: typeof editorState) => {
    setEditorState(state)
    // TODO: 这里可以进行优化
    const html = draftToHtml(convertToRaw(state.getCurrentContent()))
    onChange(html)
  }
  return (
    <article>
      <Editor
        editorState={editorState}
        toolbarClassName={styles['toolbar-class']}
        wrapperClassName={styles['wrapper-class']}
        editorClassName={styles['editor-class']}
        onEditorStateChange={onEditorStateChange}
        customBlockRenderFunc={myBlockRenderer}
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
