import Head from 'next/head'
import Link from 'next/link'

const Login = () => {
    return (
        <>
            <Head>
                <meta content='Login with Auth0' name='description'/>
                <title> Login </title>
            </Head>
            <Link href="/api/auth/login"> Login </Link>
        </>
    )
}

export default Login