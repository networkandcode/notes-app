import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'

const LogoutComponent = () => {
    const { user, error, isLoading } = useUser()

    if (isLoading) return <div> Loading... </div>
    if (error) return <div> {error.message} </div>

    if (!user) return <a href="/api/auth/login"> Login </a>

    return (
        <>
            <div>
                <a href="/api/auth/logout"> Logout </a>
            </div>
            <img alt={user.name} src={user.picture} />
            <h2> {user.name} </h2>
            <p> {user.email} </p>
            <div style={{ marginBottom: `25px` }}>
                <span>
                    <Link href="/"> Notes </Link>
                </span>
                <span>
                    <Link href="/newnote"> Add note </Link>
                </span>
            </div>
        </>
    )
}

export default LogoutComponent