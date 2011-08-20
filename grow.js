(function(){
var maxgeneration = 10,
    counter = 0,
    load = document.querySelector('#loading'),
    canvas = document.querySelector('canvas'),
    container = document.querySelector('section'),
    c = canvas.getContext('2d'),
    generation = 0,
    form = document.createElement('form');

    form.innerHTML = ''+
      '<label for="generations">Branch depth (1-13)</label>'+
      '<input id="generations" type="range" min="1" max="13" value="10" required>'+
      '<input type="radio" id="bushels" name="end" checked><label for="bushels">Bushy</label>'+
      '<input type="radio" id="flowers" name="end"><label for="flowers">Flowers</label>'+
      '<button id="makeitso">Give me a Tree</button>';
    
container.appendChild(form);    
container.appendChild(canvas);    

var bushy = document.querySelector('#bushels').checked,
    generations = document.querySelector('#generations'),
    button = document.querySelector('#makeitso');

button.addEventListener('click',growtree,false);
generations.addEventListener('change',growtree,false);

growtree();

function growtree(e){
  bushy = document.querySelector('#bushels').checked;
  generation = 0;
  maxgeneration = generations.value;
  if(maxgeneration > 0 && maxgeneration < 14){
    canvas.width = 800;
    canvas.height = 600;
    c.translate(400,520);
    c.scale(0.5,0.5);
    branch(-Math.PI/2);
  } else {
    alert('Seriousy, you do not want that many. It will kill your machine');
  }
  if(e){
    e.preventDefault();
  }
}
function branch(angle){
  generation++;
  c.save();
  c.strokeStyle = "hsl("+generation*10+", 100%,50%)";
  if(generation > maxgeneration){
    c.strokeStyle = 'white';
  }
  
  c.lineWidth = 6;
  c.rotate(angle);
  c.beginPath();
  c.moveTo(0,0);
  c.lineTo(100,0);
  c.stroke();
  c.translate(100,0);
  var scale = randomRange(0.75,1);
  c.scale(scale,scale);

  if(generation < maxgeneration){
    branch(randomRange(0,Math.PI/4));
    branch(randomRange(-Math.PI/4,0));
  } 
  
  if(+generation === +maxgeneration){
    counter++;
    if(bushy){
      branch(randomRange(0,Math.PI/4));
      branch(randomRange(-Math.PI/4,0));
      branch(randomRange(0,Math.PI/4));
      branch(randomRange(-Math.PI/4,0));
      branch(randomRange(0,Math.PI/4));
    } else {
      c.fillStyle = '#fff';
      c.beginPath(); 
      c.arc(0,0,20,0,Math.PI*2,true); 
      c.fill(); 
    }
  }
  c.restore();
  generation--;
}

function randomRange(min,max){
  return Math.random()*(max-min) + min;
}
  
})();