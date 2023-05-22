import { useData } from '../hooks/useData'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

const EditNote = (props) => {
    const data = useData()
    const { deleteNotes, updateNote } = data;
    const { user, } = useUser()
    const router = useRouter()
    
    const [ note, setNote ] = useState(props.note)
    const [ isButtonDisabled, setIsButtonDisabled ] = useState(true)

    const handleEdit = e => {
        e.preventDefault()
        const { name, value } = e.target
        setNote({ ...note, [name]: value })
        if (value) {
            setIsButtonDisabled(false)
        } else {
            setIsButtonDisabled(true)
        }
    }

    const onClick = async(e) => {
        e.preventDefault()
        
        const record = JSON.stringify(note)

        await fetch('/api/updateRecord', {
            body: record,
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then((res) => {
            if (res.status === 200) {
                updateNote(note)
                setIsButtonDisabled(true)
            }
        })
    }

    const handleDelete = async(e) => {
        e.preventDefault()
        const { id } = note
        let ids = [ id ]
        ids = JSON.stringify(ids)
        const body = ids

        await fetch('/api/deleteRecords', {
            body,
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        }).then((res) => {
            if (res.status === 200) {
                deleteNotes([id])
                router.push('/')
            }
        })
    }

    if (!user) return <></>

    return (
        <>
        <div style={{ margin: `5px` }}>
        <label htmlFor="note"> Edit note: </label>
        <button disabled={isButtonDisabled} onClick={onClick}> Save </button>
        <button className='delete' onClick={handleDelete} > Delete </button>
        </div>
        <textarea id="note" name="note" onChange={handleEdit} value={note?.note} />
        </>
    )
}

export default EditNote