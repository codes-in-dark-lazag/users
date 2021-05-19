import Head from 'next/head'
import UsersPage from "../components";
const appName = "Users"
export default function Home() {
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUPLIC_APP_NAME || appName} </title>
      </Head>
      <UsersPage />
    </div>
  )
}
