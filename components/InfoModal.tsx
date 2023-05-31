import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/Ai'

import PlayButton from './PlayButton'
import FavoriteButton from './FavoriteButton'
import useInfoModal from '../hooks/useinfoModal'
import useMovie from '../hooks/useMovie'

interface InfoModalProps {

    visible?: boolean;
    onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {

    const [isVisible, setIsVisible] = useState<boolean>(!!visible);
    const { movieId } = useInfoModal();
    const { data = {} } = useMovie(movieId as string);

    useEffect(() => {
        setIsVisible(!!visible)
    }, [setIsVisible, visible]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [setIsVisible, onClose])

    if (!visible) {
        return null
    }

    return (
        <div className='z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center fixed overflow-x-hidden overflow-y-auto inset-0'>
            <div className='relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>
                <div className={`${isVisible ? 'scale-100' : 'scale-0'} transform duration-300 relative bg-zinc-900 drop-shadow-md`}>
                    <div className="relative h-96">
                        <video className='w-full brightness-[60%] h-full object-cover' autoPlay muted loop poster={data?.thumbnailUrl} src={data?.videoUrl}> </video>
                        <div onClick={handleClose} className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center'>
                            <AiOutlineClose className='text-white' size={20} />
                        </div>
                        <div className='absolute bottom-[10%] left-10'>
                            <p className='text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>
                                {data?.title}
                            </p>
                            <div className='flex felx-row gap-4 items-center'>
                                <PlayButton movieId={data?.id} />
                                <FavoriteButton movieId={data?.id} />
                            </div>
                        </div>
                    </div>
                    <div className='px-12 py-8'>
                        <p className='text-green-400 font-semibold text-lg '>
                            New
                        </p>
                        <p className='text-white text-lg'>
                            {data?.duration}
                        </p>
                        <p className='text-white text-lg'>
                            {data?.genre}
                        </p>
                        <p className='text-white text-lg'>
                            {data?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InfoModal