var img = "";
var Status = "";
objects = [];
var vid = "";
var audio = new Audio('alarm.wav');

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    vid = createCapture(VIDEO);
    vid.size(380, 380);
    vid.hide;
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = 'Status = Detecting';
}

function draw(){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(vid, gotResults);
    image(vid, 0, 0, 380, 380);
    if(Status != ""){
      for(i = 0; i< objects.length; i++) {
        document.getElementById('status').innerHTML = 'Status = Person Detected';

        fill(r, g, b);
        percent = floor(objects[i].confidence *100);
        text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y +15);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if (objects[i].label == 'person'){
        document.getElementById('Babydetected').innerHTML = 'Person has been detected';
    }
   else{
        document.getElementById('Babydetected').innerHTML = 'Person has NOT been detected';
        audio.play();
    }
}
function modelLoaded(){
    console.log("Model loaded!");
    Status = true;
}
function gotResults(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
