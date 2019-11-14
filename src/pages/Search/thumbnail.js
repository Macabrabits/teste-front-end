import React from 'react'
import {Button} from '@material-ui/core'
import './thumbnail.css'


export default function Thumbnail({thumbnail}){
    if(thumbnail.etag){
        if(thumbnail.id.videoId)
            return (
                <div className="thumbnail col-sm-12 col-md-4 col-lg-3">
                    <img src={thumbnail.snippet.thumbnails.default.url} alt={thumbnail.snippet.title}></img>
                    <h4>{thumbnail.snippet.title}</h4>
                    <h5>{thumbnail.snippet.channelTitle}</h5>
                    <p>{thumbnail.snippet.description}</p>
                    <Button variant="outlined" href={`details/${thumbnail.id.videoId}`}>DETALHES DO VIDEO</Button>
                </div>
            )

        return (
            <div className="thumbnail col-sm-12 col-md-4 col-lg-3">
                <img src={thumbnail.snippet.thumbnails.default.url} alt={thumbnail.snippet.title}></img>
                <h4>{thumbnail.snippet.title}</h4>
                <h5>{thumbnail.snippet.channelTitle}</h5>
                <p>{thumbnail.snippet.description}</p>
            </div>
        )
    }

    else
        return null
}