import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import prismadb from '../libs/prismadb';

const serverAuth = async (req: NextApiRequest) => {
   const session = await getSession({ req });
   console.log(session);
   if (!session?.user?.email) {
      throw new Error('not signed in');
   }

   const currentUser = await prismadb.user.findUnique({
      where: {
         email: session.user.email
      }
   });

   if (!currentUser) {
      throw new Error('Not Signed In');
   }

   return { currentUser };
};

export default serverAuth;
