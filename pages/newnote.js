import { useData } from '../hooks/useData'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

const NewNote = () => {
    const data = useData()
    const { addNote } = data;
    
    const router = useRouter()
    const { user, error, isLoading } = useUser()
    
    const [ note, setNote ] = useState()

    const onChange = e => {
        e.preventDefault()
        setNote(e.target.value)
    }

    const onClick = async(e) => {
        e.preventDefault()
        
        const record = JSON.stringify({ 
            email: user.email,
            note
        })

        await fetch('/api/insertRecord', {
            body: record,
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then((res) => {
            if (res.status === 200) {
                addNote(record)
                setNote('')
                router.push('/')
            }
        })
    }

    if (!user) return <></>

    return (
        <>
        <div style={{ margin: `5px` }}>
        <label htmlFor="note"> New note: </label>
        <button disabled={note ? false : true} onClick={onClick}> Add </button>
        </div>
        <textarea id="note" name="note" onChange={onChange} placeHolder="Add your note here..." value={note} />
        </>
    )
}

export default NewNote