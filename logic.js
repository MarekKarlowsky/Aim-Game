if(document.readyState !== 'loading'){
    window.addEventListener('load', ()=>{
    })
}

//глобальные переменные
var colors = ['#1affff','#33ff33','#1a1aff','#ffff33',' #66b3ff'];
var accuracy = document.getElementById('accuracy');
var totalcircles = 0;
var clickedcircles = 0;
var hits = document.getElementById('hits');
var misses = document.getElementById('misses');
const gameboard = document.getElementById('game_board');


var start_button = document.getElementById('start_button');
start_button.addEventListener('click',()=>{
    var interval = window.prompt('Выберите время в миллисекундах. К примеру, одна секунда равна 1000 миллисекунд. Промах засчитывается в том случае, если вы не успеваете попасть в кружок за указанное вами время.', interval)
    if(interval === '' || interval === undefined || interval === null || typeof(interval) === 'String'){
        window.alert('Введите число...')
    }else{
        visibilityControl();
        setInterval(()=>{
            createCircle();
            accuracyControl();
            if(gameboard.childElementCount > 1){
                gameboard.removeChild(gameboard.firstElementChild);
            }
        }, interval)
    }

});

// данная функция срабатывает после нажатия кнопки старт и скрывает кнопку, затем показывая хитборд, миссборд и строку с общей точностью
function visibilityControl(){
    start_button.style.display = "none";
    accuracy.style.display = "block";
    hits.style.visibility = "visible";
    misses.style.visibility = "visible";
}
// функция высчитывает точность и обновляет ее динамически
function accuracyControl(){
    var accuracypercent = Math.trunc((clickedcircles/totalcircles) * 100);
    accuracy.innerHTML = "ACCURACY: " + accuracypercent + " %";
}
//функция создания кружков. 
function createCircle(){
    let game_board_width = document.getElementById('game_board').clientWidth - 50;
    let game_board_height = document.getElementById('game_board').clientHeight - 70;
    let randomtop = Math.floor(Math.random() * game_board_height);
    let randomleft = Math.floor(Math.random() * game_board_width);
    var circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.marginTop = randomtop + "px";
    circle.style.marginLeft = randomleft + "px";
    let max = colors.length;
    let colorIndex = Math.floor(Math.random() * max);
    circle.style.backgroundColor = colors[colorIndex];
    gameboard.append(circle);
    var missedcircles = totalcircles - clickedcircles;
    totalcircles++;
    misses.innerHTML = "MISSES: " + missedcircles;
    circle.addEventListener('click', ()=>{
        clickedcircles++;
        hits.innerHTML = "HITS: " + clickedcircles;
        accuracyControl();
        gameboard.removeChild(gameboard.firstElementChild)
    })
}


