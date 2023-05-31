import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import useCurrentUser from '../hooks/useCurrentUser';
import useFavorites from '../hooks/useFavorites';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/Ai'

interface useFavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<useFavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId)
    }, [currentUser, movieId])

    const toggleFavorite = useCallback(async () => {
        let response;

        if (isFavorite) {
            console.log({ data: { movieId } })
            response = await axios.delete('/api/favorite', { data: { movieId } });

        } else {
            response = await axios.post('/api/favorite', { movieId })
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;
        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds,
        });
        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

    const Icon = isFavorite ? <AiOutlineCheck className='text-white size={30}' /> : <AiOutlinePlus className='text-white size={30}' />
    return (
        <div onClick={toggleFavorite} className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 flex rounded-full border-2 border-white justify-center items-center transition hover:border-neutral-300'>
            {Icon}
        </div>
    )
}

export default FavoriteButton