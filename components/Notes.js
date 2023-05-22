import { useData } from '../hooks/useData'

import Link from 'next/link'

const Notes = () => {
    const data = useData()
    const { notes } = data

    return (
        <>
            { notes?.map((note) => (
                <Link href={`/note/${note.id}`}>
                    <div className="notecard" key={note.id}>
                        {note.note}
                    </div>
                </Link>
            ))}
        </>
    )
}

export default Notes