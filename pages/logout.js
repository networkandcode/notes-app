import Head from 'next/head'
import Link from 'next/link'

const Logout = () => {
    return (
        <>
            <Head>
                <meta content='Logout from Auth0' name='description'/>
                <title> Logout </title>
            </Head>
            <Link href="/api/auth/logout"> Logout </Link>
        </>
    )
}

export default Logout