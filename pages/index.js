import Head from 'next/head'
import UsersPage from "../components";
import fetch from  "isomorphic-fetch";
import {useRouter} from "next/router"
const appName = "Users"
export default function Home({data}) {
  const router = useRouter()
  const refreshData = () =>{
    router.replace(router.asPath);
  }
  const {items} = data
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUPLIC_APP_NAME || appName} </title>
      </Head>
      <UsersPage users={items} doRefresh={refreshData}/>
    </div>
  )
}
export async function getServerSideProps() {
  const res = await fetch("https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=20&o rder=desc&sort=activity&site=stackoverflow")
  const data = await res.json()
  return { props: { data } }
}
