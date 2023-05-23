import { useData } from '../hooks/useData'

import { useUser } from '@auth0/nextjs-auth0/client'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Home = () => {
    const data = useData()
    const { notes } = data

    const { user } = useUser()

    const [ search, setSearch ] = useState()
    const [ showNotes, setShowNotes ] = useState()

    const handleSearch = e => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (search?.trim()) {
            let temp = []
            notes.forEach(note => {
                if (search.split(' ').every(searchWord => {
                    searchWord = searchWord.trim()
                    return note.note.toLowerCase().includes(searchWord)
                })) {
                    if (!temp.includes(note)) {
                        temp = [ ...temp, note ]
                    }
                }
            })
            setShowNotes(temp)
        } else {
            if (notes) {
                setShowNotes(notes)
            }
        }
    }, [notes, search])

    if (!user) return <> </>

    return (
        <>
            <Head>
                <meta content='View and search notes' name='description'/>
                <title> Home </title>
            </Head>
            <div style={{ padding: `10px` }}>
                <label htmlFor='search'>
                    Search:
                </label>
                <input id="search" name={search} onChange={handleSearch} type="text" value={search} />
            </div>
            
            <div>
                { showNotes?.map((note) => (
                    <Link href={`/note/${note.id}`} key={note.id}>
                        <textarea readOnly style={{ height: `200px`, margin: `10px`, overflow: `hidden`, width: `400px` }} value={note.note} />
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Home