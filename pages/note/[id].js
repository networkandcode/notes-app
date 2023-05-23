import EditNote from '../../components/EditNote'
import { useData } from '../../hooks/useData'
import Head from 'next/head'
import Link from 'next/link'
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
    }, [getNote, router])

    if (!note) return <> Loading... </>

    return (
        <>
            <Head>
                <meta content='Edit or Delete note' name='description'/>
                <title> Edit or Delete note </title>
            </Head>
            <Link href="/api/auth/logout"> Logout </Link>
            <div>
                <EditNote note={note} />
            </div>
        </>
    )
}

export default Note