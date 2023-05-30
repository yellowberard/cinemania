import Navbar from '../components/Navbar';
import useCurrentUser from '../hooks/useCurrentUser';
import Billboard from '../components/Billboard';
import MovieList from '../components/MovieList'
import useMovieList from '../hooks/useMovieList';
import useFavorites from '../hooks/useFavorites';
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
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()
  // console.log(user)
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40 w-full h-6">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )
}
