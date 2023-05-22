import EditNote from '../../components/EditNote'
import { useData } from '../../hooks/useData'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Note = () => {
    const router = useRouter()

    const data = useData()
    const { getNote } = data

    const [ note, setNote ] = useState()
    
    useEffect(() => {
        const { id } = router.query
        if(id) setNote(getNote(id))
        console.log(17, id)
    }, [data, router])

    console.log(20, note)

    if (!note) return <> Loading... </>

    return (
        <div>
            <EditNote note={note} />
        </div>
    )
}

export default Note