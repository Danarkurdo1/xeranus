if (typeof(window) !== 'undefined') {
    
window.timer = null;
window.gameStart = null;
let words = 'لۆریم ئیپسوم یان لیپسوم دەقێکی ساختەیی لاتینیە کە لە دیزاینی وێب تایپۆگرافی نەخشە و چاپکردنەکان کە لەبری زمانی ئینگلیزی بۆ جەختکردنەوە لەسەر توخمەکانی دیزاین بەسەر ناوەڕۆکدا. هەروەها پێی دەوترێت دەقی شوێنگرەوە یان هەنێ جار بەشێکە لە دەقی لاتینی لەلایەن نووسەری کلاسیکی و فەیلەسوف سیسێرۆوە. وشە و پیتەکانی بە زیادکردن یان لابردنی گۆڕدراون بۆ ئەوەی بە ئەنقەست ناوەڕۆکەکەی بێمانا بکات  بەڵام ئێمە ئەتوانین دەستکاری بکەین بۆ نمونە من گۆڕیومە بۆ سەر زمانی کوردی بەهەمان شێوە بۆ زمانەکانی تریش بەڵام ئەمە پێکهاتەکەی بوو.'.split(' ');
const wordLength = words.length;
let second = 30;
let gameTime = second * 1000;
let wpm ;
let accuracy;

function changeSecond(checkedInput){
    if(checkedInput === 15){
        second = 15
        document.getElementById('info').innerHTML = '15';
        reload();
    }else if(checkedInput === 30){
        second = 30;
        document.getElementById('info').innerHTML = '30';
        reload();
    }else if(checkedInput === 60){
        second = 60;
        document.getElementById('info').innerHTML = '60';
        reload();
    }
    gameTime = second * 1000;
}



function changeLanguage() {
    var selectBox = document.getElementById("langPicker");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    if(selectedValue === "English"){
        words = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');
        document.getElementById('words').style.display = 'inline';
        document.getElementById('game').style.textAlign = 'left';
        reload();
    }else if(selectedValue === "Kurdish"){
        words = 'لۆریم ئیپسوم یان لیپسوم دەقێکی ساختەیی لاتینیە کە لە دیزاینی وێب تایپۆگرافی نەخشە و چاپکردنەکان کە لەبری زمانی ئینگلیزی بۆ جەختکردنەوە لەسەر توخمەکانی دیزاین بەسەر ناوەڕۆکدا. هەروەها پێی دەوترێت دەقی شوێنگرەوە یان هەنێ جار بەشێکە لە دەقی لاتینی لەلایەن نووسەری کلاسیکی و فەیلەسوف سیسێرۆوە. وشە و پیتەکانی بە زیادکردن یان لابردنی گۆڕدراون بۆ ئەوەی بە ئەنقەست ناوەڕۆکەکەی بێمانا بکات  بەڵام ئێمە ئەتوانین دەستکاری بکەین بۆ نمونە من گۆڕیومە بۆ سەر زمانی کوردی بەهەمان شێوە بۆ زمانەکانی تریش بەڵام ئەمە پێکهاتەکەی بوو.'.split(' ');
        document.getElementById('words').style.display = 'flex';
        document.getElementById('game').style.textAlign = 'right';
        reload();
    }
   }


function addClass(element, name){
    element.className += " "+name;
}

function removeClass(element, name){
    element.className = element.className.replace(name, "");
}

function randWord(){
    const randIndex = Math.floor(Math.random() * wordLength);
    return words[randIndex - 1];
}

function formatedWord(word){
    return `<div class="word"><span class="letter">${word?.split("").join('</span><span class="letter">')}</span></div>`;
}

function newGame(){
    document.getElementById("words").innerHTML = "";
    for(let i=0 ; i< 200 ; i++){
        document.getElementById("words").innerHTML += formatedWord(randWord());
    }

    addClass(document.querySelector(".word"), "current");
    addClass(document.querySelector(".letter"), "current");
    window.timer = null;
}

function getWpm() {
    const words = [...document.querySelectorAll('.word')];
    const lastTypedWord = document.querySelector('.word.current');
    const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1;
    const typedWords = words.slice(0, lastTypedWordIndex);
    const correctWords = typedWords.filter(word => {
      const letters = [...word.children];
      const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'));
      const correctLetters = letters.filter(letter => letter.className.includes('correct'));
      return incorrectLetters.length === 0 && correctLetters.length === letters.length;
    });
    return correctWords.length / gameTime * 60000;
  }

  function getAccuracy() {
    const words = [...document.querySelectorAll('.word')];
    const lastTypedWord = document.querySelector('.word.current');
    const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1;
    const typedWords = words.slice(0, lastTypedWordIndex);
    const incorrectWords = typedWords.filter(word => {
        const letters = [...word.children];
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'));
        const correctLetters = letters.filter(letter => letter.className.includes('correct'));
        return incorrectLetters.length;
    })
    console.log(incorrectWords.length);
    console.log(typedWords.length);
    const correctWords = typedWords.length - incorrectWords.length;
    const accuracy = ((correctWords/typedWords.length) * 100).toFixed(2);
    return accuracy;
  }


function gameOver(){
    clearInterval(window.timer);
    addClass(document.getElementById('game'), 'over');
    document.getElementById('info').innerHTML = '30';
    console.log(getWpm());
    addClass(document.getElementById('wpm'), 'showWpm');
    addClass(document.getElementById('accuracy'), 'showWpm');
    document.getElementById('wpm').innerHTML = 'Wpm: '+getWpm();
    document.getElementById('accuracy').innerHTML = 'Accuracy: '+getAccuracy()+'%';
    wpm = getWpm();
    accuracy = getAccuracy();

    //post data to server
    const myUrl = window.location.href;
  
    var details = {
        'wpm': wpm,
    };

    var formBody = [];
    for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(myUrl, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
    })
}


document.getElementById("game").addEventListener("keyup", (e)=>{
    const key = e.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector(".letter.current");
    const expected = currentLetter?.innerHTML || " ";
    const isLetter = key.length == 1 && key !== " ";
    const isSpace = key === " ";
    const isBackspace = key === 'Backspace';
    const isFirstLetter = currentLetter === currentWord.firstChild;


    if(document.querySelector('#game.over')){
        return;
    }

    if(!window.timer && isLetter){
        window.timer = setInterval(()=>{
            if(!window.gameStart){
                window.gameStart = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPsassed = currentTime - window.gameStart;
            const sPassed = Math.round(msPsassed / 1000);
            const sLeft = (gameTime / 1000) - sPassed;
            if(sLeft <= 0){
                gameOver();
                return;
            }
            document.getElementById('info').innerHTML = sLeft + ' ';
        }, 1000);
    }

    if(isLetter){
        if(currentLetter){
            addClass(currentLetter ,key === expected ? "correct" : "incorrect" );
            removeClass(currentLetter, "current");
            if(currentLetter.nextSibling){
                addClass(currentLetter.nextSibling, 'current');
            }
        }else{
            const inCorrectLetter = document.createElement('span');
            inCorrectLetter.innerHTML = key;
            inCorrectLetter.className = 'incorrect letter extra';
            currentWord.appendChild(inCorrectLetter);
        }
    }

    if(isSpace){
        if(expected !== " "){
            const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            lettersToInvalidate.forEach((letter)=>{
                addClass(letter, 'incorrect');
            })
        }
        removeClass(currentWord, 'current');
        addClass(currentWord.nextSibling, 'current');
        if(currentLetter){
            removeClass(currentLetter, 'current');
        }
        addClass(currentWord.nextSibling.firstChild, 'current');
    }

    if(isBackspace){
        if(currentLetter && isFirstLetter){
            removeClass(currentWord, 'current');
            addClass(currentWord.previousSibling, 'current');
            removeClass(currentLetter, 'current');
            addClass(currentWord.previousSibling.lastChild, 'current');
            removeClass(currentWord.previousSibling.lastChild, 'correct');
            removeClass(currentWord.previousSibling.lastChild, 'incorrect');
        }
        if(currentLetter && !isFirstLetter){
            removeClass(currentLetter, 'current');
            addClass(currentLetter.previousSibling, 'current')
            removeClass(currentLetter.previousSibling, 'correct')
            removeClass(currentLetter.previousSibling, 'incorrect')
        }
        if(!currentLetter){
            addClass(currentWord.lastChild, 'current');
            removeClass(currentWord.lastChild, 'incorrect');
            removeClass(currentWord.lastChild, 'correct');
        }
    }

    if(currentWord.getBoundingClientRect().top > 500){
        const word = document.getElementById('word');
        const margin = parseInt(word.style.marginTop || '0px');
        word.style.marginTop = (margin - 30 ) + 'px';
    }

    const nextWord = document.querySelector('.word.current');
    const nextLetter = document.querySelector('.letter.current');
    const cursor = document.querySelector('#cursor');
    if(nextLetter){
        cursor.style.top = nextLetter.getBoundingClientRect().top + 'px';
        cursor.style.left = nextLetter.getBoundingClientRect().left + 'px';
    }else{
        cursor.style.top = nextWord.getBoundingClientRect().top + 'px';
        cursor.style.left = nextWord.getBoundingClientRect().right + 'px';
    }

    console.log({key, expected});
})

function reload(){
    newGame();
    window.timer = null
    window.gameStart = null;
    removeClass(document.getElementById('game'), 'over');
    const nextLetter = document.querySelector('.letter.current');
    const cursor = document.querySelector('#cursor');
    cursor.style.top = nextLetter.getBoundingClientRect().top + 'px';
    cursor.style.left = nextLetter.getBoundingClientRect().left + 'px';
    removeClass(document.getElementById('wpm'), 'showWpm');
    removeClass(document.getElementById('accuracy'), 'showWpm');
}


document.getElementById('newGameBtn').addEventListener('click', ()=>{
    reload();
})

newGame();


const nextLetter = document.querySelector('.letter.current');
const cursor = document.querySelector('#cursor');
cursor.style.top = nextLetter.getBoundingClientRect().top + 'px';
cursor.style.left = nextLetter.getBoundingClientRect().left + 'px';



  }

