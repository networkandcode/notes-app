import { useData } from '../hooks/useData'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const Notes = () => {
    const data = useData()
    const { notes } = data

    const [ search, setSearch ] = useState()
    const [ showNotes, setShowNotes ] = useState()

    const handleSearch = e => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (search) {
            let temp = []
            search.split().forEach(searchWord => {
                notes.forEach(note => {
                    console.log(note.note)
                    if (note.note.toLowerCase().includes(searchWord)) {
                        if (!temp.includes(note)) {
                            temp = [ ...temp, note ]
                        }
                    }
                })
            })
            setShowNotes(temp)
        } else {
            if (notes) {
                setShowNotes(notes)
            }
        }
    }, [notes, search])

    return (
        <>
            <div style={{ padding: `10px` }}>
                <label htmlFor='search'>
                    Search:
                </label>
                <input name={search} onChange={handleSearch} type="text" value={search} />
            </div>
            
            <div>
                { showNotes?.map((note) => (
                    <Link href={`/note/${note.id}`}>
                        <textarea readOnly style={{ height: `200px`, margin: `10px`, overflow: `hidden`, width: `500px` }} value={note.note} />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Notes