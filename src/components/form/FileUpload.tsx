import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
  Avatar,
} from '@chakra-ui/react'
import { FiFile } from 'react-icons/fi'
import { FC, useCallback, useEffect, useRef } from 'react'


interface IProps {
    onChange: (file: File) => void
    avatar: string
}

const FileUpload: FC<IProps> = ({onChange, avatar}) => {
  const avatarRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    avatarRef.current?.addEventListener('change', (e) => {
      const curFiles = (e as any).target!.files
      onChange(curFiles[0])
    })
  }, [avatarRef])

  const handleClick = useCallback(() => {
    avatarRef.current?.click()
  }, [avatarRef])

  return (
    <>
      <input
        type="file"
        accept="image/png, image/jpeg"
        id="avatar"
        style={{ display: 'none' }}
        ref={avatarRef}
      />
      <Avatar src={avatar} onClick={handleClick} />
    </>
  )
}

export default FileUpload
