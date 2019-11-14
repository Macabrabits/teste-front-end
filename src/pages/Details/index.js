import React, {useState, useEffect} from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import api from "../../services/Axios"
import apiKey from "../../services/ApiKey"
import './style.css'

export default function Details(router){
    useEffect(()=>{getVideoDetails()},[])

    const numberFormat = (value) => {
        return (parseInt(value)).toLocaleString('pt-BR')
    }

    const [videoData, setVideoData] = useState({
        snippet:{
            thumbnails:{
                high:{
                    url:''
                }
            },
        },
        statistics:{
            viewCount: 0
        }
    })

    const getVideoDetails = async function(){
        const videoId = router.match.params.videoId

        const res = await api.get('https://www.googleapis.com/youtube/v3/videos',{
            params: {
                part: 'snippet, statistics',
                id: videoId,
                key: apiKey
            }})
        setVideoData(res.data.items[0])
    }

    return (
        <div>
            <a href="/" className="btn btn btn-outline-dark mr-2 col-1"><ArrowBackRoundedIcon/></a>
            <h3 className="col-11">{videoData.snippet.title}</h3>
            <img className="mb-1 mt-1" src={videoData.snippet.thumbnails.high.url} alt={videoData.snippet.title}></img>
            <h4>{videoData.snippet.channelTitle}</h4>
            <div className="float-right ml-2">
                <ThumbDownIcon/><text className="ml-1 align-bottom h4" >{numberFormat(videoData.statistics.dislikeCount)}</text>
            </div>
            <div className="float-right ml-2">
                <ThumbUpIcon/><text className="ml-1 align-bottom h4 ">{numberFormat(videoData.statistics.likeCount)}</text>
            </div>
            <p className="mt-1">{videoData.snippet.description}</p>
            <VisibilityIcon/><text className="h4 align-bottom">{(numberFormat(videoData.statistics.viewCount))}</text>
        </div>
    )
}