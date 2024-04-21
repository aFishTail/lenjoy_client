import { GlobalContext } from "@/context/global";
import { NotificationProvider } from "@/providers/notification";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

export function useNotification() {

    const { user, refreshUser } = useContext(GlobalContext)

    const [existNew, setExistNew] = useState(false)
    const [pageNum, setPageNum] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [data, setData] = useState<Notification[]>([])

    const hasNextPage = useMemo(() => total > pageNum * pageSize, [total, pageNum, pageSize])
    const hasLastPage = useMemo(() => pageNum > 1 ,[pageNum])


    const fetchData = useCallback(async () => {
        const res = await NotificationProvider.list({pageNum, pageSize})
        console.log('res', res)
        setData(res.records)
        setTotal(res.total)
    }, [pageNum, pageSize])

    const read = async (item: Notification) => {
        await NotificationProvider.read(item.id)
        setData(data.map(d => {
            if(d.id === item.id) {
                return {...d, status: 1}
            } else {
                return d
            }
        }))
    }

    const clickNextPage =() => {
        setPageNum(pageNum+1)
    }

    const clickLastPage =() => {
        setPageNum(pageNum-1)
    }

    useEffect(() => {
        if(!user) return
        fetchData()
    }, [user,fetchData])

    useEffect(() => {
        if(data.length === 0) {
            setExistNew(false)
        } else {
            setExistNew(data.some(e => e.status === 0))
        }
        console.log('data', data, data.every(e => e.status === 1))
    }, [data])

    return {
        existNew,
        data,
        setPageNum,
        read,
        hasLastPage,
        hasNextPage,
        clickLastPage,
        clickNextPage
    }
}