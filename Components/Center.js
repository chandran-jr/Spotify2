import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import {shuffle} from 'lodash';
import {useRecoilState, useRecoilValue} from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtoms';
import useSpotify from '../hooks/useSpotify';
import Songs from '../Components/Songs'


function Center() {
    const {data: session} = useSession();
    const playlistId = useRecoilValue(playlistIdState);
    const spotifyApi =  useSpotify();
    const colours = ['from-indigo-500','from-blue-500','from-green-500','from-red-500','from-yellow-500','from-cyan-500','from-pink-500','from-orange-500','from-purple-500']
    const [colour,setColour] = useState(null);
    const [playlist,setPlaylist] = useRecoilState(playlistState)

    useEffect(() => {
        setColour(shuffle(colours).pop());
    }, [playlistId])

    useEffect(() =>{
         spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
         }).catch((err) => {
            console.log(err);
         })
    },[spotifyApi,playlistId])
  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">

    <header className="z-10 absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 text-white hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 ">
            <img className="rounded-full w-10 h-10" src={session?.user.image} alt=""/>
            <h2 className="text-md font-bold">{session?.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
        </div>
    </header>

    <section className={`w-full flex items-end space-x-7 bg-gradient-to-br to-black ${colour} h-[356px] text-white p-8`}>
        <img className="h-64 w-64 shadow-2xl" src={playlist?.images?.[0].url} alt="" />

        <div className="flex flex-col mt-32 h-64">
            <p className="mt-20 text-md font-bold">PLAYLIST</p>
            <h2 className="text-5xl md:text-3xl xl:text-8xl font-bold">{playlist?.name}</h2>
            <h4 className="mt-9 text-md font-bold">{session?.user.name} . {playlist?.tracks.total} songs</h4>
        </div>
    </section>

    <div className="mt-10">
        <Songs/>
    </div>
        
    </div>
  )
}

export default Center