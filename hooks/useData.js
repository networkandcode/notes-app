import { createContext, useContext, useEffect, useState, } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

const dataContext = createContext()
const { Provider } = dataContext

export const useData = () => useContext(dataContext)

const useDataProvider = () => {
    const { user, } = useUser()

    const [ notes, setNotes ] = useState()

    // add note locally
    const addNote = async(note) => {
        setNotes([ ...notes, note ])
    }

    // delete notes locally
    const deleteNotes = async(ids) => {
        let notesCopy = notes

        ids.forEach(id => {
            notes?.forEach((i, idx) => {
                if (i.id === id) {
                    notesCopy.splice(idx, 1)
                }
            })
        })
        
        setNotes(notesCopy)
    }

    // get notes from db
    const getNotes = async(body) => {
        const res = await fetch('/api/getRecords', {
            body,
            method: 'POST',
        })
        const jsonData = await res.json()
        setNotes([...jsonData])
    }

    // get note locally
    const getNote = (id) => {
        console.log(id)
        console.log(notes)
        let note
        notes?.forEach(i => {
            if (i.id === id) {
                note = i
            }
        })
        return note
    }

    // update note locally
    const updateNote = (note) => {
        let notesCopy = notes

        notes?.forEach((i, idx) => {
            if (i.id === id) {
                notesCopy.splice(idx, 1)
            }
        })

        console.log(notesCopy)
        
        setNotes([...notesCopy, note])
    }

    useEffect(() => {
        if (user?.email) {
            getNotes(user.email)
        }
    }, [user])

    return {
        addNote,
        deleteNotes,
        getNote,
        notes,
        updateNote,
    }
}

export const DataProvider = ({ children }) => {
    const data = useDataProvider()
    return <Provider value={data}> {children} </Provider>
}