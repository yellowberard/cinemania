import prismadb from '../../libs/prismadb';
import serverAuth from '../../libs/serverAuth';
import { without } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
   try {
      if (req.method === 'POST') {
         console.log('hey');
         const { currentUser } = await serverAuth(req, res);
         const { movieId } = req.body;
         console.log(movieId);

         const existingMovie = await prismadb.movie.findUnique({
            where: {
               id: movieId
            }
         });

         if (!existingMovie) {
            throw new Error('Invalid Id');
         }

         const user = await prismadb.user.update({
            where: {
               email: currentUser.email || ''
            },
            data: {
               favoriteIds: {
                  push: movieId
               }
            }
         });
         return res.status(200).json(user);
      }
      if (req.method === 'DELETE') {
         console.log('hey D');

         const { currentUser } = await serverAuth(req, res);
         const { movieId } = req.query as { movieId: string };

         console.log({ movieId });

         const existingMovie = await prismadb.movie.findUnique({
            where: {
               id: movieId
            }
         });

         if (!existingMovie) {
            throw new Error('Invalid ID');
         }

         const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

         const updatedUser = await prismadb.user.update({
            where: {
               email: currentUser.email || ''
            },
            data: {
               favoriteIds: updatedFavoriteIds
            }
         });
         return res.status(200).json(updatedUser);
      }

      return res.status(405).end();
   } catch (error) {
      console.log(error);
      return res.status(400).end();
   }
}
