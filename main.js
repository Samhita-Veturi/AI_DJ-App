song = "";
LW_X = 0;
LW_Y = 0;
RW_X = 0;
RW_Y = 0;
Left_Score = 0;
Right_Score = 0;
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function Pause(){
    song.pause();
}
function preload(){
    song = loadSound('BTS_-_Permission_to_Dance.mp3');
}
function setup(){
    Canvas = createCanvas(700, 500);
    Canvas.position(370, 255)
    Video = createCapture(VIDEO);
    Video.hide();
    poseNet = ml5.poseNet(Video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("poseNet is initialized!");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        LW_X = results[0].pose.leftWrist.x;
        LW_Y = results[0].pose.leftWrist.y;
        Left_Score = results[0].pose.keypoints[9].score;

        console.log("LX: " + LW_X + " LY: " + LW_Y);

        RW_X = results[0].pose.rightWrist.x;
        RW_Y = results[0].pose.rightWrist.y;
        Right_Score = results[0].pose.keypoints[10].score;

        console.log("RX: " + RW_X + " RY: " + RW_Y);
        console.log("Left Score: " + Left_Score + " Right Score: " + Right_Score);
    }
}
function draw(){
    image(Video, 0, 0, 700, 500);
    if(Left_Score > 0.2){
        fill(255, 0, 0);
        stroke(255, 0, 0);
        circle(LW_X, LW_Y, 20);
        InNumber_LeftWristY = Number(LW_Y);
        RD = floor(InNumber_LeftWristY);
        Volume = RD/500;
        document.getElementById("volume").innerHTML = "Volume: " + Volume;
        song.setVolume(Volume);
    }
    fill(255, 0, 0);
    stroke(255, 0, 0);
    circle(RW_X, RW_Y, 20);
    if(RW_Y <= 100){
        document.getElementById("speed").innerHTML = "Speed - 0.5";
        song.rate(0.5);
    }
    else if(RW_Y > 100 && RW_Y <= 200){
        document.getElementById("speed").innerHTML = "Speed - 1.0";
        song.rate(1);
    }
    else if(RW_Y > 200 && RW_Y <= 300){
        document.getElementById("speed").innerHTML = "Speed - 1.5";
        song.rate(1.5);
    }
    else if(RW_Y > 300 && RW_Y <= 400){
        document.getElementById("speed").innerHTML = "Speed - 2.0";
        song.rate(2); 
    }
    else if(RW_Y > 400 && RW_Y <= 500){
        document.getElementById("speed").innerHTML = "Speed - 2.5";
        song.rate(2.5);
    }
}