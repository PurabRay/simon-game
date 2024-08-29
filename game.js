var buttoncolors=["red","blue","green","yellow"];
var gamepattern=[];
userclickedpattern=[];
var flag=false;
var level=0;
$(document).keydown(function(){
    if(flag==false){
        flag=true;
       
       nextsequence();
    }
});
var nextsequence=function(){
    level++;
    $("h1").text("Level:"+level);
    
    var b= Math.floor((Math.random()*4));
    var randomcolor=buttoncolors[b];
    
    gamepattern.push(randomcolor);
     var id="#"+randomcolor;
     $(id).fadeOut(100).fadeIn(100);
     var audio=new Audio("sounds/"+randomcolor+".mp3");
     audio.play();
    
}//basically we are making this function to generate the random color and store them so that we can have the record and continue the game
//its basically creating the new sound and then storing it as the part of the pattern
$("button").click(function(e){
if(flag == false){
    console.log("wait");
    return;
}
   var userchosencolor=$(this).attr("id");//takes the color user chose
   //now we have the id of the random color the user clicked
   userclickedpattern.push(userchosencolor);//pushes it to the pattern of user
   playsound(userchosencolor);//plays the sound for that color
   var id="#"+userchosencolor;//makes its id
   
   console.log(userclickedpattern);//logs the pattern out
   animatepress(id);//animates the button user chose
   checkanswer(userclickedpattern.length-1)//checks if its the right one
});//handling user clicks checking if the answer is correct and animating and playing sound as per choice
var playsound=function(name){
    var audio=new Audio("sounds/"+name+".mp3");
     audio.play();
}
var animatepress=function(e){
    $(e).addClass("pressed");
    setTimeout(function(){
        $(e).removeClass("pressed");
    },100);
}
var startover=function(){
 gamepattern=[];
userclickedpattern=[];
 flag=false;
 level=0;
flag=false;
$("h1").text("press any key to start");


}
var checkanswer=function(currentlevel){
    if(userclickedpattern[currentlevel] == gamepattern[currentlevel]){//that means the latest button clicked matches this checks at every level
        console.log("success");//logs success
        if(userclickedpattern.length == gamepattern.length){
            setTimeout(function(){
                userclickedpattern=[];
                nextsequence();
                
            },1000);
        }
    }
    else{
        playsound("wrong");
        $("body").addClass("game-over");
        $("h1").text("gameover");
        setTimeout(function(){

            $("body").removeClass("game-over"); 
        },200);
        startover();
    }
}


