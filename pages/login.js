import React from 'react'
import {getProviders, signIn} from 'next-auth/react'; 

function Login({providers}) {
  return (
    <div className="flex flex-col justify-center items-center bg-contain bg-[url('https://images.hdqwalls.com/download/minimalist-landscape-to-2048x2048.jpg')] h-screen">
      <img className="hover:duration-700 hover:rotate-[360deg] duration-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 w-52 h-52 mb-5" src="https://links.papareact.com/9xl" alt="" />

      {
        Object.values(providers).map((provider) => (
           <div key={provider.name}> 
           <button className="bg-[#18D860] text-white p-5 rounded-lg text-xl font-bold hover:bg-indigo-500 transition ease-in-out hover:-translate-y-1 hover:scale-110"
            onClick={() => signIn(provider.id, {callbackUrl: "/"})}
           >
              Login with {provider.name}
           </button>
           </div>
        ))
      }
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  }
}