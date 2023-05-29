import Navbar from '../components/Navbar';
import useCurrentUser from '../hooks/useCurrentUser';
import Billboard from '../components/Billboard';
import { getSession, signOut } from 'next-auth/react'
import { NextPageContext } from 'next'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
export default function Home() {
  const { data: user } = useCurrentUser();
  console.log(user)
  return (
    <>
      <Navbar />
      <Billboard />
    </>
  )
}
