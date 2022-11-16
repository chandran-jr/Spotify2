import type { NextPage } from 'next'
import Head from 'next/head';
import Sidebar from '../Components/Sidebar';
import Player from '../Components/Player';
import Center from '../Components/Center';
import { getSession, GetSessionParams } from 'next-auth/react';
import { playlistState } from '../atoms/playlistAtoms'
import {useRecoilValue} from 'recoil';

const Home: NextPage = () => {
  const playlist  = useRecoilValue(playlistState)
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <Sidebar/>
        <Center/>
      </main>

      <div className='fixed bottom-0'>
        <Player/>
      </div>


      </div>
  )
}

export default Home

export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  }
}
