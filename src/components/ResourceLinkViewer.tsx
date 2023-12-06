import { GlobalContext } from '@/context/global'
import { ResourceProvider } from '@/providers/resource'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useCallback, useContext, useRef, useState } from 'react'
import { Link } from '@chakra-ui/next-js'

interface IProps {
  data: IResource
}

export const ResourceLinkViewer: React.FC<IProps> = ({ data }) => {
  const toast = useToast()
  const router = useRouter()
  const { user } = useContext(GlobalContext)
  const showLink = useCallback(async () => {
    await getResource()
    onOpen()
  }, [])

  const handlePay = useCallback(async () => {
    if(!user) {
        toast({
            title: '请先登录',
            status: 'warning',
            position: 'top',
            duration: 2000,
          })
          router.push('/signin')
          return
    }
    payOnOpen()
  }, [])

  const handleExecPay = useCallback(async () => {
    try {
      await ResourceProvider.pay(data.id)
      payOnClose()
      toast({
        title: '支付积分成功',
        status: 'success',
        position: 'top',
      })
      setTimeout(() => {
        location.reload()
      }, 1000) 
    } catch (error) {
      payOnClose()
    }
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: payIsOpen,
    onOpen: payOnOpen,
    onClose: payOnClose,
  } = useDisclosure()
  const viewLinkRef = useRef<any>()
  const payRef = useRef<any>()

  const [url, setUrl] = useState('')
  const [code, setCode] = useState('')
  const getResource = useCallback(async () => {
    const {url, code} = await ResourceProvider.viewResourceUrl(data.id)
    setUrl(url)
    setCode(code)
  }, [])

  return (
    <>
      {data.user.id === user?.id || data.havePayed ? (
        <Button colorScheme={'teal'} size="sm" onClick={showLink}>
          查看链接
        </Button>
      ) : (
        <Button colorScheme={'teal'} size="sm" onClick={handlePay}>
          支付积分
        </Button>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={viewLinkRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            {/* <AlertDialogHeader fontSize="lg" fontWeight="bold">
          提示
        </AlertDialogHeader> */}

            <AlertDialogBody>
              <VStack alignItems={'flex-start'}>
                <Text as={'a'}>
                  链接：
                  <Link href={url} isExternal>
                    {url}
                  </Link>
                </Text>
                <Text>链接：{code}</Text>
              </VStack>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={payIsOpen}
        leastDestructiveRef={payRef}
        onClose={payOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              提示
            </AlertDialogHeader>

            <AlertDialogBody>是否确认支付{data.score}积分</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={payRef} onClick={payOnClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={handleExecPay} ml={3}>
                确认
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
