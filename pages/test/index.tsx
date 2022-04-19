import TextEditor from '@/components/Editor'
import { NextPage } from 'next'


const TextComp:NextPage = (props) => {
  return (
    <div className="conatiner">
      <TextEditor></TextEditor>
      </div>
  )
}

export default TextComp
