import { useUser } from '@auth0/nextjs-auth0/client'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Authenicate = () => {
    const router = useRouter()
    const { user, error, isLoading } = useUser()

    if (isLoading) return <div> Loading... </div>
    if (error) return <div> {error.message} </div>

    if (!user) return (
        <div style={{
            alignItems: `center`,
            display: `flex`,
            height: `300px`,
            justifyContent: `center`
        }}>
            <div style={{
                border: `1px solid lightgrey`,
                padding: `20px`,
                textAlign: `center`
            }}>
                <h2> Notes app </h2>
                <p> <Link href="/api/auth/login"> Login </Link> </p>
            </div>
        </div>
    )

    return (
        <>
            <div>
                <Link href="/api/auth/logout"> Logout </Link>
            </div>
            <Image alt={user.name} height={100} priority={true} src={user.picture} width={100}/>
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

export default Authenicate