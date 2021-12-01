import React, { ReactNode, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useAuth ,ProvideAuth} from "../lib/user/auth";


type Props = {
  children?: ReactNode
  title?: string
}

export const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const auth = useAuth()
  useEffect(()=>{
    console.log({auth})

  }, [auth])
  return (

    <ProvideAuth>
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/users">
          <a>Users List</a>
        </Link>{' '}
        | <a href="/api/users">Users API</a>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I&apos;m here to stay (Footer)</span>
    </footer>
  </div>
    </ProvideAuth>
)
  }
export default Layout