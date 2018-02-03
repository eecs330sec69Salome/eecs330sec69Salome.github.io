// Create your global variables below:
var tracklist = ["Let It Happen", "Nangs", "The Moment", "Yes I'm Changing", "Eventually", "Gossip", "The Less I Know The Better", "Past Life", "Disciples", "'Cause I'm A Man"];
var volLevels = [];
var currLevel=0;
var currInterval=0;
var time;
var totalInterval=document.getElementById("myRange");
var start=document.getElementById("start");

function init() {
	// Your code goes here
	//get the number of items in vol-level which including the volume button is 7 
	var len=document.getElementById("volume-level").children.length;
	//start from i=1 because the volume button is i=0
	for(var i=1;i<len;i++)
	{
		//fill in volLevels array 
		volLevels[i-1]= document.getElementById("volume-level").children[i].id;
	}

	for(var j=0;j<3;j++)
	{
		// change the first three vols to indicate vol of 3/6
		document.getElementById(volLevels[j]).style.backgroundColor="#9f5cc4";
	}
};

function volUp() {
	// Your code goes here
	var i=0;
	//get the current volume level
	while((i<volLevels.length)&&(document.getElementById(volLevels[i]).style.backgroundColor=="rgb(159, 92, 196)"))
	{
		i++;
	}
	//increment the next div to have color if it isn't the highest level
	if(i<volLevels.length)
	{
		document.getElementById(volLevels[i]).style.backgroundColor="#9f5cc4";
	}
	
	
}

function volDown() {
	// Your code goes here
	//get the current volume level
	var i=0;
	while((i<volLevels.length)&&(document.getElementById(volLevels[i]).style.backgroundColor=="rgb(159, 92, 196)"))
	{
		i++;
	}
	//change the highest div to clear color if it isn't the lowest level already
	if(i>0)
	{
		document.getElementById(volLevels[i-1]).style.backgroundColor="rgb(255,255,255)";
	}
	
}
//changes between play mode and pause mode
function switchPlay() {
	// Your code goes here
	//if we're in pause mode and we click button we should switch to play mode and vice versa
	if (document.getElementById("play-pause").innerHTML=="pause")
	{
		document.getElementById("play-pause").innerHTML="play_arrow";//switch button 
		clearInterval(currInterval);
		start.innerHTML=secondsToMs(totalInterval.value);
	}
	
	else
	{
		document.getElementById("play-pause").innerHTML="pause"; //switch button
		currInterval=setInterval(function(){totalInterval.stepUp(1);//move cursor
						time=totalInterval.value;
						start.innerHTML=secondsToMs(time);	//increment timer
						if(totalInterval.value==180){nextSong();}	//if we get to end of the song, go to the next song and keep current mode
					},1000);
	}
	
}
//switches track to the next song
function nextSong() {
	// Your code goes here
	//reset track and timer
	start.innerHTML=secondsToMs(0);
	totalInterval.value=0;
	var len=tracklist.length;
	var i=0;
	//get index of current song
	while (i<len-1&&(document.getElementById("player-song-name").innerHTML!=tracklist[i]))
	{
		i++;
	}
	//set current song to next song or to the first song if the current song is the last song
	if(i!=len-1)
	{
		document.getElementById("player-song-name").innerHTML=tracklist[i+1];
	}
	else
	{
		document.getElementById("player-song-name").innerHTML=tracklist[0];
	}
	
}

//switches track to the previous song
function prevSong() {
	// Your code goes here
	//reset track and timer
	start.innerHTML=secondsToMs(0);
	totalInterval.value=0;
	var len=tracklist.length;
	var i=0;
	//get index of current song
	while (i<len-1&&(document.getElementById("player-song-name").innerHTML!=tracklist[i]))
	{
		i++;
	}
	//set current song to prev song or to the last song if the current song is the first song
	if(i!=0)
	{
		document.getElementById("player-song-name").innerHTML=tracklist[i-1];
	}
	else
	{
		document.getElementById("player-song-name").innerHTML=tracklist[len-1];
	}

}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();