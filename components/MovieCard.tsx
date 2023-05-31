import React from 'react';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '../hooks/useinfoModal';
import { useRouter } from 'next/router';
import { BsFillPlayFill } from 'react-icons/Bs'
import { BiChevronDown } from 'react-icons/bi'
interface MovieCardProps {
    data: Record<string, any>

}
const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
    const router = useRouter();
    const { openModal } = useInfoModal();
    return (
        <div className='group col-span relative h-[12vw] bg-zinc-900'>
            <img className='cursor-pointer object-cover transition duration rounded-md shadow-xl group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw] ' src={data.thumbnailUrl} alt="Thumbnail" />
            <div className='opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100'>
                <img className='cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]' src={data.thumbnailUrl} alt="Thumbnail" />
                <div className='z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md '>
                    <div className='flex flex-row items-center gap-3'>
                        <div onClick={() => router.push(`/watch/${data?.id}`)} className=' cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300'>
                            <BsFillPlayFill size={30} />

                        </div>
                        <FavoriteButton movieId={data?.id} />
                        <div onClick={() => { openModal(data?.id) }} className='cursor-pointer w-6 ml-auto group/item h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:boder-neutral-300'>
                            <BiChevronDown className='text-white group-hover/item:text-neutral-300 ' size={30} />
                        </div>
                    </div>
                    <p className='text-green-400 font-semibold mt-4'>
                        New <span className='text-white'>2023</span>
                    </p>
                    <div className="flex flex-row items-center mt-4 gap-2">
                        <p className='text-white text-[10px] lg:text-sm'>{data.duration}</p>
                    </div>
                    <div className="flex flex-row items-center mt-4 gap-2">
                        <p className='text-white text-[10px] lg:text-sm'>{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieCard