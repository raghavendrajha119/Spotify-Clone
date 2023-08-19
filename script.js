let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById("masterplay")
let progressbar = document.getElementById("progressbar")
let songitem = Array.from(document.getElementsByClassName('songItem'));
let mastersongname= document.getElementById('mastersongname');
let songitemplay = Array.from(document.getElementsByClassName("songitemplay"));
let songs = [
    {songname: "salam", filepath: "songs/1.mp3", coverpath:"covers/1.jpg"},
    {songname: "kuch toh hai", filepath: "songs/2.mp3", coverpath:"covers/2.jpg"},
    {songname: "ruthi", filepath: "songs/3.mp3", coverpath:"covers/3.jpg"},
    {songname: "ishq", filepath: "songs/4.mp3", coverpath:"covers/4.jpg"},
    {songname: "dhoom", filepath: "songs/5.mp3", coverpath:"covers/5.jpg"},
    {songname: "love", filepath: "songs/6.mp3", coverpath:"covers/6.jpg"},
    {songname: "humnava", filepath: "songs/7.mp3", coverpath:"covers/7.jpg"},
    {songname: "bate", filepath: "songs/8.mp3", coverpath:"covers/8.jpg"},
    {songname: "no love", filepath: "songs/9.mp3", coverpath:"covers/9.jpg"},
    {songname: "amplifier", filepath: "songs/10.mp3", coverpath:"covers/10.jpg"},
]
songitem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname.charAt(0).toUpperCase() + songs[i].songname.slice(1);
})
//play and pause
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        if (audioElement.currentTime <= 0) {
            songindex = 1; // Set the songindex to the first song
            mastersongname.innerText = songs[songindex - 1].songname;
            audioElement.src = `songs/${songindex}.mp3`;
            audioElement.currentTime = 0;
            gif.style.opacity = 1;
          }
      audioElement.play();
      songitemplay.forEach((element, i) => {
        if (i === songindex - 1) {
          element.classList.remove('fa-circle-play');
          element.classList.add('fa-circle-pause');
        } else {
          element.classList.remove('fa-circle-pause');
          element.classList.add('fa-circle-play');
        }
      });
      masterplay.classList.remove('fa-circle-play');
      masterplay.classList.add('fa-circle-pause');
      gif.style.opacity = 1;
    } else {
      audioElement.pause();
      songitemplay.forEach((element, i) => {
        if (i === songindex - 1) {
          element.classList.remove('fa-circle-pause');
          element.classList.add('fa-circle-play');
        }
      });
      masterplay.classList.add('fa-circle-play');
      masterplay.classList.remove('fa-circle-pause');
      gif.style.opacity = 0;
    }
  });
  
//listen to events
audioElement.addEventListener('timeupdate',() =>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressbar.value = progress;
})
progressbar.addEventListener('change',()=>{
    audioElement.currentTime = progressbar.value * audioElement.duration/100;
})
function makeAllplays(){
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}
songitemplay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            makeAllplays();
            songindex = parseInt(e.target.id);
            mastersongname.innerText=songs[songindex-1].songname;
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.src = `songs/${songindex}.mp3`;
            audioElement.currentTime=0;
            audioElement.play();
            masterplay.classList.add('fa-circle-pause');
            masterplay.classList.remove('fa-circle-play');
            gif.style.opacity = 1;
        }
        else{
            e.target.classList.add("fa-circle-play");
            e.target.classList.remove("fa-circle-pause");
            audioElement.pause();
            masterplay.classList.add('fa-circle-play');
            masterplay.classList.remove('fa-circle-pause');
            gif.style.opacity = 0;
        }
    })
})
document.getElementById("next").addEventListener('click',()=>{
    if(songindex>=9){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioElement.src = `songs/${songindex}.mp3`;
    mastersongname.innerText=songs[songindex-1].songname;
    audioElement.currentTime=0;
    audioElement.play();
    songitemplay.forEach((element, i) => {
        if (i === songindex - 1) {
          element.classList.remove('fa-circle-play');
          element.classList.add('fa-circle-pause');
        } else {
          element.classList.remove('fa-circle-pause');
          element.classList.add('fa-circle-play');
        }
    });
    masterplay.classList.add('fa-circle-pause');
    masterplay.classList.remove('fa-circle-play');
    gif.style.opacity=1;
})
document.getElementById("previous").addEventListener('click',()=>{
    if(songindex<=0){
        songindex=9;
    }
    else{
        songindex-=1;
    }
    audioElement.src = `songs/${songindex}.mp3`;
    mastersongname.innerText=songs[songindex-1].songname;
    audioElement.currentTime=0;
    audioElement.play();
    songitemplay.forEach((element, i) => {
        if (i === songindex - 1) {
          element.classList.remove('fa-circle-play');
          element.classList.add('fa-circle-pause');
        } else {
          element.classList.remove('fa-circle-pause');
          element.classList.add('fa-circle-play');
        }
      });
    masterplay.classList.add('fa-circle-pause');
    masterplay.classList.remove('fa-circle-play');
    gif.style.opacity=1;
})