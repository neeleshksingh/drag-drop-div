const boxes = document.querySelectorAll('.box');
let drag = null;
const array = [];
let one=document.getElementById('one')
one.style.background='rgb(214, 177, 177)'
let two=document.getElementById('two')
two.style.background='lightblue'
let three=document.getElementById('three')
three.style.background=' lightcyan'
let four=document.getElementById('four')
four.style.background='lightgoldenrodyellow'
let five=document.getElementById('five')
five.style.background='lightgreen'
let six=document.getElementById('six')
six.style.background='lightpink'
let seven=document.getElementById('seven')
seven.style.background='lightsalmon'
let eight=document.getElementById('eight')
eight.style.background='lightseagreen'
let nine=document.getElementById('nine')
nine.style.background='black'
nine.style.color='white'



boxes.forEach(box => {
  box.addEventListener('dragstart', dragStart);
  box.addEventListener('dragenter', dragEnter);
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragleave', dragLeave);
  box.addEventListener('drop', dragDrop);
  box.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
  drag = e.target;
  drag.classList.add('dragging');
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('hover');
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave(e) {
  e.target.classList.remove('hover');
}

function dragDrop(e) {
  e.preventDefault();
  const current = drag.getAttribute('id');
  const target = e.target.getAttribute('id');
  if (current !== target) {
    const currText = drag.textContent;
    const targetText = e.target.textContent;
    array.push({
      type: 'swap',
      currText,
      targetText,
      current,
      target,
    });
    drag.textContent = targetText;
    e.target.textContent = currText;
    e.target.classList.remove('hover');
    animateBoxMove(drag, e.target);
  }
}

function dragEnd(e) {
  e.target.classList.remove('dragging');
  drag = null;
}

function animateBoxMove(src, dest) {
    console.log(src.style.background,dest)
    if(src.style.background=='black')
    {
        let color1=src.style.background
        let color2=dest.style.background
        src.style.background=color2
        dest.style.background=color1
        dest.style.color='white'
    }
    else if(dest.style.background=='black'){
        let color1=src.style.background
        let color2=dest.style.background
        src.style.background=color2
        src.style.color='white'
        dest.style.background=color1
    }
    else{
        let color1=src.style.background
        let color2=dest.style.background
        src.style.background=color2
        dest.style.background=color1

    }
  const curr = src.getBoundingClientRect();
  const tar = dest.getBoundingClientRect();
  const xcord = tar.left - curr.left;
  const ycord = tar.top - curr.top;
  src.style.transform = `translate(${xcord}px, ${ycord}px)`;
  src.style.transition = 'transform 0.5s ease-in-out';
  setTimeout(() => {
    src.style.transform = 'none';
    src.style.transition = 'none';
  }, 500);
}

const undoButton = document.getElementById('undo-button');
undoButton.addEventListener('click', undoLastAction);

function undoLastAction() {
  if (array.length > 0) {
    const lastAction = array.pop();
    if (lastAction.type === 'swap') {
      const currBox = document.getElementById(lastAction.current);
      const targetbox = document.getElementById(lastAction.target);
      currBox.textContent = lastAction.currText;
      targetbox.textContent = lastAction.targetText;
      animateBoxMove(targetbox, currBox);
    }
  }
}
