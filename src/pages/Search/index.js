import React, {useState} from 'react'
import {TextField, InputAdornment} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import api from "../../services/Axios"
import apiKey from "../../services/ApiKey"
import Thumbnail from './thumbnail'
import './index.css'

const onScrollBottom = (f) => {
    window.onscroll = function(event) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            f();
        }
    };
}

let nextPageToken = ''
let lastSearch = ''
let sleeping = false


export default function Search(){

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve(sleeping = false), milliseconds))
    }

    onScrollBottom(() => {
        loadNextItens()
    })

    //STATES
    const [thumbnails, setThumbnails] = useState([{
        etag: '',
        id: {},
        kind: '',
        snippet: {
            thumbnails:{
                default:{}
            },
        },
    }])
    const [search, setSearch] = useState('')
    ////STATES


    const submit = async function(event){
        event.preventDefault()

        const res = await api.get('https://www.googleapis.com/youtube/v3/search',{
            params: {
                part: 'id,snippet',
                q: search,
                maxResults: 10,
                key: apiKey
            }})

        lastSearch = search

        // document.getElementById("animatedForm").classList.remove("center")
        document.getElementById("animatedForm").classList.add("up")

        console.log(res.data)

        setThumbnails(res.data.items)
        // setThumbnails([...thumbnails, ...res.data.items])
        nextPageToken = res.data.nextPageToken

    }

    const loadNextItens = async function(event){
        console.log(sleeping)
        if(!sleeping){ //Sleep over a short time to prevent request flood
            const res = await api.get('https://www.googleapis.com/youtube/v3/search',{
                params: {
                    part: 'id,snippet',
                    q: lastSearch,
                    maxResults: 10,
                    pageToken: nextPageToken,
                    key: apiKey
                }})
            setThumbnails([...thumbnails, ...res.data.items])
            nextPageToken = res.data.nextPageToken
            sleeping = true //Sleep over a short time to prevent request flood
            sleep(500000)
        }
    }


    return (
        <div className="row mt-5">
            <form onSubmit={submit} className="center mb-5 col-12" id="animatedForm">
                    <TextField
                        className={"animated bounce delay-2 col-sm-12 col-md-6 mx-auto"}
                        id="input-with-icon-textfield"
                        label="Pesquisar"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => setSearch(e.target.value)}
                        fullWidth={true}
                        variant="outlined"
                    />
            </form>
            {thumbnails.map((thumbnail, index) => <Thumbnail key={index} thumbnail={thumbnail} />)}
        </div>



    )
}