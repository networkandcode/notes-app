import { useData } from '../hooks/useData'
import { useUser } from '@auth0/nextjs-auth0/client'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const NewNote = () => {
    const data = useData()
    const { addNote } = data;
    
    const router = useRouter()
    const { user } = useUser()
    
    const [ note, setNote ] = useState()

    const onChange = e => {
        e.preventDefault()
        const { value } = e.target
        setNote(value)
    }

    const handleAdd = async(e) => {
        e.preventDefault()
        
        const recordAsJson = {
            email: user.email,
            note,
        }
        const recordAsString = JSON.stringify(recordAsJson)

        await fetch('/api/insertRecord', {
            body: recordAsString,
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then((res) => {
            if (res.status === 200) {
                addNote(recordAsJson)
                setNote('')
                router.push('/')
            }
        })
    }

    if (!user) return <></>

    return (
        <>
            <Head>
                <meta content='Add a new note' name='description'/>
                <title> New note </title>
            </Head>
            <Link href="/api/auth/logout"> Logout </Link>
            <div style={{ margin: `5px` }}>
                <label htmlFor="note"> New note: </label>
                <button disabled={note ? false : true} onClick={handleAdd}> Add </button>
            </div>
            <textarea id="note" name="note" onChange={onChange} placeholder="Add your note here..." value={note} />
        </>
    )
}

export default NewNote