import useSWR from 'swr';
import fetcher from '../libs/fetcher';

const useMovie = (id: string) => {
   const { data, error, isLoading } = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false
   });
   return { data, error, isLoading };
};

export default useMovie;
