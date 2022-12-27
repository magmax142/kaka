
objects = [];
status = "";

function setup() {
  canvas = createCanvas(380,380);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  else {
  console.log(results);
  objects=results
  }
  
}


function draw() {
  image(video, 0, 0, 380, 380);
  if(status!=""){
    objectDetector.detect(video, gotResult)
    for(i=0;i<objects.length;i++){
      object_name=objects[i].label;
      object_confidence=floor(objects[i].confidence*100);
      object_x=objects[i].x;
      object_y=objects[i].y;
      object_width=objects[i].width;
      object_height=objects[i].height;
      r=floor(random(255));
      g=floor(random(255));
      b=floor(random(255));
      console.log(r,g,b)
      fill(r,g,b);
      text(object_name+" "+object_confidence+"%",object_x,object_y);
      noFill();
      stroke(r,g,b);
      rect(object_x,object_y,object_width,object_height);
      document.getElementById("status").innerHTML="status:objectsDetected";
      document.getElementById("number").innerHTML="number of objects is"+ objects.length;
    
    }
  }
      
}
