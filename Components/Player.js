import React, { useEffect, useState } from 'react';
import { playlistState } from '../atoms/playlistAtoms'
import {useRecoilValue} from 'recoil';
import {HeartIcon, DesktopComputerIcon} from '@heroicons/react/outline';
import {PlayIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, SwitchHorizontalIcon, RefreshIcon, VolumeUpIcon, PauseIcon, VolumeOffIcon} from '@heroicons/react/solid';
import { millistoMinuteAndSeconds } from '../lib/time';
import swal from 'sweetalert';



function Player() {
    const playlist  = useRecoilValue(playlistState);
    const [start,setStart] = useState(0);
    const [playPause, setPlayPause] = useState(1);
    const [vol,setVol] = useState(1);
    const [volBar,setVolBar] = useState("bg-green-500")
    const [refreshCol,setRefreshCol] = useState("text-green-500")

    useEffect(() => {
        const startms = playlist?.tracks?.items?.[0].track.duration_ms / 2;
        setStart(millistoMinuteAndSeconds(startms))
    },[playlist])

    const playpause = () => {
        if(playPause==0) {
            setPlayPause(1)
        }
        else {
            setPlayPause(0)
            swal("Hey Spotify User!", "This is just a clone of Spotify built by chandran-jr to learn Next.js and API's, sadly does not play music :( Thank you for visiting though, do leave a star on the repo :)", "success");
        }
    }

    const volOn = () => {
        if(vol==0) {
            setVol(1)
            setVolBar("bg-green-500");
        }
        else {
            setVol(0)
            setVolBar("bg-gray-500");
        }
    }

    const refresh = () => {
        if(refreshCol=="text-green-500"){
            setRefreshCol("text-gray-400");
        }
        else {
            setRefreshCol("text-green-500");
        }
    }

  return (
    <div className="w-screen bg-gradient-to-r from-black to-gray-900 h-20 flex items-center justify-between">

    {/* Left */}
        <div className="hidden md:flex flex items-center pl-6">
        <img src={playlist?.tracks?.items?.[0].track.album.images[0].url} alt="" className="h-14 w-14"/>
        <div className="flex flex-col w-min">
                <p className=" text-sm font-bold ml-5 truncate text-white">{playlist?.tracks?.items?.[0].track.name}</p>
                <p className="text-xs ml-5 text-gray-400 truncate ">{playlist?.tracks?.items?.[0].track.artists?.[0].name}</p>
            </div>
            <HeartIcon className="h-6 w-6 mr-3 ml-5 text-gray-400 hover:text-white cursor-pointer" />
            <DesktopComputerIcon className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
        </div>

        {/* Center */}
        <div className="sm:items-center w-screen md:w-auto lg:mr-40">

        <div className="flex items-center w-72 justify-around m-auto">
            <SwitchHorizontalIcon className="h-7 w-7 text-gray-400 cursor-pointer hover:text-white" />
            <ChevronDoubleLeftIcon className="h-7 w-7 text-gray-400 cursor-pointer hover:text-white" />
           {playPause? (<PlayIcon onClick={playpause} className="h-10 w-10 text-white cursor-pointer hover:text-gray-400" />) : (<PauseIcon onClick={playpause} className="h-10 w-10 text-white cursor-pointer hover:text-gray-400" />) }
            <ChevronDoubleRightIcon className="h-7 w-7 text-gray-400 cursor-pointer hover:text-white" />
            <RefreshIcon onClick={refresh} className={`h-7 w-7 ${refreshCol} cursor-pointer`} />
        </div>

        <div className="flex items-center">
         <p className="text-xs text-gray-400">{start}</p>
         <div className="ml-5 w-64 rounded-tl-md rounded-bl-md bg-white h-1 hover:bg-green-500"></div>
         <div className="mr-5 w-64 rounded-br-md rounded-tr-md bg-gray-500 h-1"></div>
        <p className="text-xs text-gray-400">{millistoMinuteAndSeconds(playlist?.tracks?.items?.[0].track.duration_ms)}</p>
        </div>

        </div>

        {/* Right */}
        <div className="md:flex items-center hidden pr-8">
        {vol? (<VolumeUpIcon onClick={volOn} className="h-5 w-5 text-white cursor-pointer hover:text-gray-400" />) : (<VolumeOffIcon onClick={volOn} className="h-5 w-5 text-white cursor-pointer hover:text-gray-400" />) }
        <div className={`ml-5 w-10 rounded-tl-md rounded-bl-md ${volBar} h-1 hover:bg-green-300 hover:cursor-pointer`}></div>
        <div className="w-10 rounded-br-md rounded-tr-md bg-gray-500 h-1"></div>
        </div>


    </div>
  )
}

export default Player