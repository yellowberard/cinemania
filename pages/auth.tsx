import Input from '../components/Input'
import { useCallback, useState } from 'react';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import credentials from 'next-auth/providers/credentials';




const Auth = () => {
  // const { data: session } = useSession()
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  // const router = useRouter();
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
  }, [])
  const login = useCallback(async () => {
    try {

      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profiles"
      });
      // console.log(session);

      // router.push('/');
    }
    catch (error) {

      console.log(error + 'auth login');
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    }
    catch (error) {
      console.log(error + 'auth regi');
    }
  }, [email, name, password, login]);


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className=' px-12 py-5'>
          <img src='/images/logo.png' alt='logo' className='h-14' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 self-center px-16 py-16 mt-2 lg:w-2/5 lg:max-w-md rounded-md  w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign In' : 'Register'}
            </h2>
            <div className='flex flex-col gap-4'>

              {variant === 'register' && (<Input label='Username' onChange={(ev: any) => { setName(ev.target.value) }} id='name' type='text' value={name} />)}

              <Input label='Email' id='email' type='email' value={email} onChange={(ev: any) => setEmail(ev.target.value)} />

              <Input label='Password' id='password' type='password' value={password} onChange={(ev: any) => setPassword(ev.target.value)} />

            </div>

            <button onClick={variant === 'login' ? login : register} className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
              {variant === 'login' ? "Log In" : "Sign Up"}
            </button>

            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div onClick={() => signIn("google", { callbackUrl: "/profiles" })} className="w-10 h-10 bg-white rounded-full flex cursor-pointer hover:opacity-80 items-center justify-center transition">
                <FcGoogle size={30}></FcGoogle>
              </div>
              <div onClick={() => signIn("github", { callbackUrl: "/profiles" })} className="w-10 h-10 bg-white rounded-full flex cursor-pointer hover:opacity-80 items-center justify-center transition" >
                <FaGithub size={30}></FaGithub>
              </div>.
            </div>
            <p className='text-neutral-500 mt-12'>
              {variant === 'login' ? 'First time using Netflix?? ' : 'Already have an account?? '}

              <span onClick={toggleVariant} className='text-white hover:underline cursor-pointer'>
                {variant === 'login' ? 'Create an Account ' : 'Log In '}
              </span>

            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Auth
