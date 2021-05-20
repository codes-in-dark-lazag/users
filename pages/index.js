import Head from 'next/head'
import UsersPage from "../components";
import fetch from  "isomorphic-fetch"

const appName = "Users"
export default function Home({data}) {
  const {items} = data
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUPLIC_APP_NAME || appName} </title>
      </Head>
      <UsersPage users={items}/>
    </div>
  )
}
export async function getServerSideProps() {
  const res = await fetch("https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=20&o rder=desc&sort=activity&site=stackoverflow")
  const data = await res.json()
  return { props: { data } }
}
