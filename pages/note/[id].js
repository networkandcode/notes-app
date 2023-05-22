import EditNote from '../../components/EditNote'
import ViewNote from '../../components/ViewNote'
import { useData } from '../../hooks/useData'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Note = () => {
    const router = useRouter()

    const data = useData()
    const { getNote } = data

    const [ note, setNote ] = useState()
    const [ mode, setMode ] = useState('view')
    
    useEffect(() => {
        const { id } = router.query
        if(id) setNote(getNote(id))
    }, [data, router])

    return (
        <div>
            <button className='mode' onClick={() => setMode('view')} > View </button>
            <button className='mode' onClickCapture={() => setMode('edit')} > Edit </button>
            <button className='delete' > Delete </button>
            { mode === 'view' && <ViewNote note={note} /> }
            { mode === 'edit' && <EditNote note={note} /> }
        </div>
    )
}

export default Note