import { FileProvider } from '@/providers/file'
import dynamic from 'next/dynamic'
import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // @ts-ignore
    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);


interface Props {
  defaultContent: string
  onChange: (arg: string) => void
}

const IEditor: React.FC<Props> = ({ defaultContent, onChange }) => {
  const imageHandler = () => {
    // 打开文件选择框，选择要上传的图片
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files![0]

      // 使用 FormData 将文件包装起来
      const formData = new FormData()
      formData.append('file', file)

      try {
        const { url } = await FileProvider.uploadArticleImage(formData)
        insertToEditor(url)
      } catch (error) {
        console.error('Image upload failed.', error)
      }
    }
  }

  const insertToEditor = (imageUrl) => {
    // 在编辑器中插入图片
    const editor = editorRef.current!.getEditor()
    const range = editor!.getSelection()
    editor!.insertEmbed(range!.index, 'image', imageUrl)
    range!.index +=1
    editor.setSelection(range!); //光标位置加1

  }
  const modules: any = useMemo(
    // useMemo: 解决自定义失焦问题
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
          ['blockquote', 'code-block'], // 引用，代码块
          ['link', 'image' /**'video' */], // 上传链接、图片、上传视频
          [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
          [{ list: 'ordered' }, { list: 'bullet' }], // 列表
          [{ script: 'sub' }, { script: 'super' }], // 上下标
          [{ indent: '-1' }, { indent: '+1' }], // 缩进
          [{ direction: 'rtl' }], // 文本方向
          [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
          [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
          [{ font: [] }], // 字体
          [{ align: [] }], // 对齐方式
          ['clean'], // 清除字体样式
        ],
        handlers: {
          image: imageHandler
        },
      },
    }),
    []
  )
  const [value, setValue] = useState(defaultContent || '')
  const [height, setHeight] = useState('300px')
  const editorRef = useRef<ReactQuill>(null)

  const handleChange = useCallback(
    (value) => {
      setValue(value)
      onChange(value)
    },
    [onChange, setValue]
  )

  const options: any = {
    placeholder: '请输入内容...',
    theme: 'snow',
    readOnly: false, // 是否只读
    className: 'ql-editor', //组件要加上(className=“ql-editor”)样式类名,否则空格不回显
    onChange: handleChange,
    value,
    modules: modules,
    style: {
      height,
      overflow: 'hidden',
      borderBottom: '1px solid #ccc',
    },
  }
  useEffect(() => {
    setHeight(height ? height : '300px')
  }, [])

  return <QuillNoSSRWrapper {...options} forwardedRef={editorRef}></QuillNoSSRWrapper>
}

export default IEditor
