import React, { useEffect, useState } from 'react';
import {HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, RssIcon, HeartIcon, CollectionIcon} from '@heroicons/react/outline';
import {signOut, useSession} from 'next-auth/react'
import useSpotify from '../hooks/useSpotify';
import {useRecoilState} from 'recoil';
import { playlistIdState } from '../atoms/playlistAtoms'


function Sidebar() {
    const spotifyApi = useSpotify()
    const {data: session, status} = useSession();
    console.log(session);
    const [playlists,setPlaylists] =  useState([])
    const [playlistId,setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if(spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            })
        }
    },[session,spotifyApi])

    console.log(playlists);

  return (
    <div className="text-gray-500 p-5 text-xs border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] lg:w-64 hidden md:inline-flex">
        <div className="space-y-5">
            <img className="w-32" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" />
            <button className="flex items-center space-x-2 hover:text-white">
                <HomeIcon className="h-7 w-7"/>
                <p className="font-bold">Home</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <SearchIcon className="h-7 w-7"/>
                <p className="font-bold">Search</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <LibraryIcon className="h-7 w-7"/>
                <p className="font-bold">Your Library</p>
            </button>
            <hr className="border-t-[0.1px] border-gray-900"/>
            <button className="flex items-center space-x-2 hover:text-white">
                <PlusCircleIcon className="h-7 w-7"/>
                <p className="font-bold">Create Playlist</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <HeartIcon className="text-green-500 h-7 w-7"/>
                <p className="font-bold">Liked Songs</p>
            </button>
            <button className="flex items-center space-x-2 hover:text-white">
                <RssIcon className="h-7 w-7"/>
                <p className="font-bold">Your Episodes</p>
            </button>
            <hr className="border-t-[0.1px] border-gray-900"/>

            {/*Playlist*/}
            {playlists.map((playlist) => (
                <p onClick={() => setPlaylistId(playlist.id)} key={playlist.id} className="font-bold cursor-pointer hover:text-white">{playlist.name}</p>
            ))}
        </div>
    </div>
  )
}

export default Sidebar