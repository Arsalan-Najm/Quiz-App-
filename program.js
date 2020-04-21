const questionText = document.querySelector('.question-text');
const optionBox = document.querySelector('.option-box');
const currentQuiz = document.querySelector('.current-question-num');
const showQuizD = document.querySelector('.description');
const correctAns = document.querySelector('.correct-answers');
const result = document.querySelector('.see-result-btn');
const remainingTime = document.querySelector('.remaining-time');
const nextQuizB = document.querySelector('.next-question-btn');
const timeText = document.querySelector('.timeover');
const quizBox = document.querySelector('.quiz-box');
const quizOverBox = document.querySelector('.over');
const homeBox = document.querySelector('.quiz-home-box');
const starAgain = document.querySelector('.start-again-btn');
const start = document.querySelector('.start-quiz-btn');
const goHome = document.querySelector('.go-to-btn');
let attempt = 0;
let questionIndex = 0;
let number = 0;
let score = 0;
let myArray = [];
let interval;



myApp=[
     {
     	question:"Http stands for?",
     	options:["Hyper Text Transfer Protocol","Hyper Text Transfer Patch"],
     	answer:0
         },
         {
        	question:"Which of the these is not an animation property?",
     	options:["iteration-count","speed"],
     	answer:1,
     	description:"In CSS we have animation-duration not animation-speed."
         },
          {
        	question:"Which color is used for print-based-media?",
     	options:["RGB","CMYK"],
     	answer:1
         },
          {
        	question:"What type of data can HTTP transfer?",
     	options:["Only Text","Only Html","Only Headers","Any type of data"],
     	answer:3,
         },
          {
        	question:"What is the result of this JS call ? <strong>Math.ceil(1.89)</strong>",
     	options:["2","1"],
     	answer:0,
     	description:"ceil method always round-off to the nearest number. "
         },
         {
          question:"Which of the following attributes introduced in Html5?",
      options:["rowspan","cols","required","title"],
      answer:2
         },
         {
          question:"Which of these is not a CSS filter?",
      options:["blur","url","chrome","grayscale"],
      answer:1,
         },
         {
          question:"Pixel is a high quality image?",
      options:["true","false"],
      answer:1,
      description:"Pixel images loses it's quality when zoomed."
         },
         {
          question:"In JS which of the following is the single line comment symbol?",
      options:["//","/*","::","\\\\"],
      answer:0
         },

   ]
   function load() {
   	questionText.innerHTML=myApp[questionIndex].question;
   	number++;
   	currentQuiz.innerHTML = number + " / " + myApp.length;
    currentQuiz.classList.add("show");
   	createOptions();
   	scoreBoard();
   }
   function createOptions() {
   	optionBox.innerHTML = "";
   	let animationDelay = 0.2;
   	for(let i=0;i<myApp[questionIndex].options.length;i++) {
   		const option = document.createElement("div");
   		option.innerHTML = myApp[questionIndex].options[i];
   		option.classList.add("option");
   		option.id =i;
   		option.style.animationDelay = animationDelay + "s";
   		animationDelay=animationDelay + 0.2;
   		option.setAttribute("onclick","check(this)");
   		optionBox.appendChild(option);
   	}
   }
   function generate() {
   	const randomNum = Math.floor(Math.random() * myApp.length);
   	let hitD = 0;
   	if(myArray.length == 0) {
   		questionIndex=randomNum;
   	}
   	else {
   		for(let i=0;i<myArray.length;i++) {
   			if(randomNum == myArray[i]) {
   				hitD = 1;
   			}
   		}
   		if(hitD == 1) {
   			generate();
   			return;
   		}
   		else {
   			questionIndex=randomNum;
   		}
   	}
	myArray.push(randomNum);
	load();
   }
   function check(ele) {
   	const id=ele.id;
   	if(id==myApp[questionIndex].answer) {
   		ele.classList.add("correct");
   		score++
   		scoreBoard();
   	}
   	else {
   		ele.classList.add("wrong");
      for(let i=0; i < optionBox.children.length; i++) {
        if(optionBox.children[i].id==myApp[questionIndex].answer) {
          optionBox.children[i].classList.add("showCorrect");
        }
      }
   	}
    attempt++
   	disableOptions();
   	showNext();
   	showDescription();
    stop();
   	if(number == myApp.length) {
   		quizOver();
   	}
   }
   function timeUp() {
    showTimeUp();
          for(let i=0; i < optionBox.children.length; i++) {
        if(optionBox.children[i].id==myApp[questionIndex].answer) {
          optionBox.children[i].classList.add("showCorrect");
        }
      }
         disableOptions();
          showNext();
          showDescription();
             if(number == myApp.length) {
             quizOver();
   }
   }
   function timer() {
    let timeLimit = 10;
    remainingTime.innerHTML = timeLimit;
    remainingTime.classList.remove("less");
    interval= setInterval(()=>{
      
      timeLimit--;
      if(timeLimit < 10) {
        timeLimit = "0" + timeLimit;
      }
      if(timeLimit < 6) {
        remainingTime.classList.add("less");
      }
      remainingTime.innerHTML = timeLimit;
      if(timeLimit == 0) {
        clearInterval(interval);
        timeUp();
      }
    },1000)
   }
   function stop() {
    clearInterval(interval);
   }
   function disableOptions() {
   	for(let i=0; i<optionBox.children.length;i++) {
   		optionBox.children[i].classList.add("already");
   	}
   }

   function showDescription() {
   	if(typeof myApp[questionIndex].description !== 'undefined'){
   	showQuizD.classList.add("show");
   	showQuizD.innerHTML = myApp[questionIndex].description;
   }
}
function showTimeUp() {
  timeText.classList.add("show");
}
function hideTimeUp() {
  timeText.classList.remove("show");
}
function hideQuizD() {
	showQuizD.classList.remove("show");
	showQuizD.innerHTML = "";
}
   function scoreBoard() {
   	correctAns.innerHTML = score;
   }
   nextQuizB.addEventListener("click",nextQuestion);
   function nextQuestion() {
   	generate();
   	hideQuizD();
    hideTimeUp();
    timer();
    nextQuizB.classList.remove("show"); 

   }

   function quizResult() {
    document.querySelector('.total').innerHTML = myApp.length;
    document.querySelector('.total-attempts').innerHTML = attempt;
    document.querySelector('.total-correct').innerHTML = score;
    document.querySelector('.total-wrong').innerHTML = attempt-score;
    const percentage = (score/myApp.length) * 100;
    document.querySelector('.percent').innerHTML =percentage.toFixed(2) +"%" ;
   }
   function resetQuiz() {
      attempt = 0;
      // questionIndex = 0;//
      number = 0;
      score = 0;
      myArray = [];
    }
   function showNext() {
   	nextQuizB.classList.add("show");
   }
   function quizOver() {
   	nextQuizB.classList.remove("show");
   	result.classList.add("show");
}
     result.addEventListener("click",()=>{
      quizBox.classList.remove("show");
      result.classList.remove("show");
      quizOverBox.classList.add("show");
      quizResult();
     })
     starAgain.addEventListener("click",()=>{
      quizBox.classList.add("show");
      quizOverBox.classList.remove("show");
      resetQuiz();
      nextQuestion();
     })
     goHome.addEventListener("click",()=>{
      quizOverBox.classList.remove("show");
      homeBox.classList.add("show");
      resetQuiz();
     })
     start.addEventListener("click",()=>{
      homeBox.classList.remove("show");
      quizBox.classList.add("show");
      nextQuestion();
     })
