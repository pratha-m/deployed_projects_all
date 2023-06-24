let songIndex=0;
let audioElement=new Audio("../audios/hollywood/1.mp3");
let songItems=Array.from(document.getElementsByClassName("box"));
let masterPlay=document.getElementById("play_master");
let songDuration=document.getElementById("duration_slider");
let masterSongName=document.getElementById("master_song_name");
let masterArtistName=document.getElementById("master_artist_name");
let volumeButton=document.getElementById("volume_button")
let progress_volume=document.getElementById("volume_progress");
let repeatButton=document.getElementById("repeatbutton");
let autoPlay=document.getElementById("auto_play");
let volumeButtonItems=Array.from(document.getElementsByClassName("volumebutton"));


let Gif=document.getElementById("gifs");

songs=[
    {song_name:"A Thousand_Years",artist_name:"Christina Perri",audio_path:"../audios/hollywood/1.mp3"},
    {song_name:"I Don't Care",artist_name:"Ed Sheeran",audio_path:"../audios/hollywood/2.mp3"},
    {song_name:"Perfect",artist_name:"Ed Sheeran",audio_path:"../audios/hollywood/3.mp3"},
    {song_name:"Shape of You",artist_name:"Ed Sheeran",audio_path:"../audios/hollywood/4.mp3"},
    {song_name:"Baby ft. Ludacris",artist_name:"Justin Bieber",audio_path:"../audios/hollywood/5.mp3"},
    {song_name:"Yummy",artist_name:"Justin Bieber",audio_path:"../audios/hollywood/6.mp3"},
    {song_name:"Power",artist_name:"Little Mix",audio_path:"../audios/hollywood/7.mp3"},
    {song_name:"Salute",artist_name:"Little Mix",audio_path:"../audios/hollywood/8.mp3"},
    {song_name:"Woman Like Me",artist_name:"Maroon",audio_path:"../audios/hollywood/9.mp3"},
    {song_name:"Girls Like You ft. Cardi B",artist_name:"Uknown artist",audio_path:"../audios/hollywood/10.mp3"},
    {song_name:"FRIENDS",artist_name:"Marshmello & Anne Marie",audio_path:"../audios/hollywood/11.mp3"},
    {song_name:"Perfect",artist_name:"ed sheeran",audio_path:"../audios/hollywood/12.mp3"},
    {song_name:"Lose You To Love Me",artist_name:"Selena Gomez",audio_path:"../audios/hollywood/13.mp3"},
    {song_name:"SUGA's Interlude",artist_name:"uknown artist",audio_path:"../audios/hollywood/14.mp3"},
    {song_name:"Blank Space",artist_name:"Taylor Swift",audio_path:"../audios/hollywood/15.mp3"},
    {song_name:"London Boy",artist_name:"Taylor Swift",audio_path:"../audios/hollywood/16.mp3"},
    {song_name:"Look What You Made Me Do",artist_name:"Taylor Swift",audio_path:"../audios/hollywood/17.mp3"},
    {song_name:"Closer",artist_name:"The Chainsmokers",audio_path:"../audios/hollywood/18.mp3"},
]
songItems.forEach((element,i)=>{
    // console.log(element,i)
    element.getElementsByClassName("song_name")[0].innerText=songs[i].song_name;
    element.getElementsByClassName("artist_name")[0].innerText=songs[i].artist_name;
})

// handle play/pause click
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
    audioElement.play();    
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause")
    Gif.src="../images/ab.gif"
}
    else{
    audioElement.pause();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");


    Gif.src="../images/audio_permanent.jpeg"
    }
})

// update time of audio 
audioElement.addEventListener("timeupdate",()=>{
progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
// console.log(progress)
songDuration.value=progress;

// when duration changes song value also changes 
songDuration.addEventListener("change",()=>{
    audioElement.currentTime=(songDuration.value*audioElement.duration)/100 
})
})
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("song_item_play")).forEach((element)=>{
        element.classList.remove("fa-pause")
        element.classList.add("fa-play")
    })
}

Array.from(document.getElementsByClassName("song_item_play"),(element)=>{
    element.addEventListener("click",(e)=>{
    makeAllPlays();
    songIndex=parseInt(e.target.id)
    e.target.classList.remove("fa-play");
    e.target.classList.add("fa-pause");
    audioElement.src=`../audios/hollywood/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].song_name;
    
    Gif.src="../images/ab.gif"

    masterArtistName.innerText=songs[songIndex].artist_name;
    audioElement.currentTime="0";
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    })
})

document.getElementById("next").addEventListener("click",()=>{
    if(songIndex>=18)
    {
     songIndex=0;   
    }
    else
    {
     songIndex=songIndex+1;   
    }
    audioElement.src=`../audios/hollywood/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].song_name;
    masterArtistName.innerText=songs[songIndex].artist_name;
    audioElement.currentTime="0";
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<=0)
    {
     songIndex=0;   
    }
    else
    {
     songIndex=songIndex-1;   
    }
    audioElement.src=`../audios/hollywood/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].song_name;
    masterArtistName.innerText=songs[songIndex].artist_name;
    audioElement.currentTime="0";
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})

volumeButton.addEventListener("click",()=>{
    if(audioElement.volume>0)
    {
    audioElement.volume="0";
    volumeButton.classList.remove("fa-volume-up");
    volumeButton.classList.add("fa-volume-mute");
    progress_volume.value=0;
    }
    else 
    {
    audioElement.volume="0.75";
    volumeButton.classList.remove("fa-volume-mute");
    volumeButton.classList.add("fa-volume-up");
    progress_volume.value=75;
    }
})



// repeat song
repeatButton.addEventListener("click",()=>
{
  if(audioElement.loop==false)
  {
  repeatButton.style.color="rgb(33, 172, 33)";  
  audioElement.loop=true;
  }
  else 
  {
    repeatButton.style.color="white";  
    audioElement.loop=false;
  }
})


// autoplay song
// autoPlay.addEventListener("click",()=>
// {
//     if(audioElement.autoplay==false)
//     {
//     autoPlay.style.color="rgb(33, 172, 33)";
//     audioElement.autoplay=true;
//     }
//     else 
//     {
//     autoPlay.style.color="white";
//     audioElement.autoplay=false;
//     }
// })


