let imgQuestionBtn = document.querySelector("#img-question"),
    textQuestionBtn = document.querySelector("#text-question"),
    choose = document.querySelector(".choose"),
    textQuestion = document.querySelector(".text-questions"),
    nextBtnOfTextQuestion = textQuestion.querySelector(".btn #next"),
    questionCurrent = textQuestion.querySelector(".btn .question-current"),
    timeLeft = textQuestion.querySelector(".time-left span"),
    timeOverEl = textQuestion.querySelector(".time-left p"),
    skipButton = textQuestion.querySelector(".skip"),
    gameResult = document.querySelector(".game-result"),
    elSuccesAnswers = gameResult.querySelector(".game-result .succes-answer"),
    elWrongAnswers = gameResult.querySelector(".game-result .wrong-answer"),
    elTimeOver = gameResult.querySelector(".game-result .time-over"),
    elSkiped = gameResult.querySelector(".game-result .skiped"),
    restartGame = gameResult.querySelector(".btn-result .restart"),
    exitGame = gameResult.querySelector(".btn-result .exit"),
    imgQuestions = document.querySelector(".app");

    // ============== textQuiz options and imgQuiz options ==============
    let options = textQuestion.querySelector(".options");
    let imgAllOptions = imgQuestions.querySelector(".options");
// ========================== game logic variables ==========================
    let skiped = 0;
    let succesAnswers = 0;
    let WrongAnswers = 0;
    let timeOver = 0;
    let textQuiz, imgQuiz = false;
    // game requested variables
    let timer = 0;
    let timerValue = 15;
    let questionCount = 0;
    let curQueNum = 1;

    // ====================== click imgQuiz choose ======================

    imgQuestionBtn.addEventListener("click",()=>{
        imgQuiz = true;
        choose.classList.add("hide")
        imgQuestions.classList.add("show")
        showImgQuestions(0);
        startTimeImg(15);
        currentQuestionImg(1);
    })

    // ====================== click textQuiz choose ======================

    textQuestionBtn.addEventListener("click",()=>{
        textQuiz = true;
        choose.classList.add("hide")
        textQuestion.classList.add("show")
        showTextQuestions(0);
        startTime(15);
        currentQuestion(1);
    })

    // ====================== Replace Game ======================

    restartGame.addEventListener("click",()=>{
        if(textQuiz){
            textQuestion.classList.add("show");
        }
        if(imgQuiz){
            imgQuestions.classList.add("show");
        }
        gameResult.classList.remove("show");
        // game replace reset values default
        skiped = 0;
        succesAnswers = 0;
        WrongAnswers = 0;
        timeOver = 0;
        questionCount = 0;
        timerValue = 15;
        curQueNum = 1;
        // img variables
        quesionImgCount = 0;
        curQueNumImg = 1;
        timeImgValue = 15;
        // text quiz functions reset default
        showTextQuestions(questionCount)
        clearInterval(timer);
        startTime(timerValue);
        currentQuestion(curQueNum);
        timeOverEl.innerHTML = "time left : ";
        // img quiz functions reset default
        showImgQuestions(quesionImgCount);
        currentQuestionImg(curQueNumImg)
        clearInterval(timerImg);
        startTimeImg(timeImgValue)
        timeOverElImg.innerHTML = "time left : ";
    })

    // ====================== next button in textQuiz ======================

    nextBtnOfTextQuestion.addEventListener("click",()=>{
        if(questionCount < questionList.length - 1){
            questionCount++;
            curQueNum++;
            showTextQuestions(questionCount)
            clearInterval(timer);
            startTime(timerValue);
            currentQuestion(curQueNum);
            timeOverEl.innerHTML = "time left : ";
        }
        else{
            gameOver();
        }
        nextBtnOfTextQuestion.classList.remove("active");
        skipButton.classList.remove("hide");
    })

    // ====================== skip button in textQuiz ======================

    skipButton.addEventListener("click",()=>{
        skiped+=1;
        if(questionCount < questionList.length - 1){
            questionCount++;
            curQueNum++;
            showTextQuestions(questionCount)
            clearInterval(timer);
            startTime(timerValue);
            currentQuestion(curQueNum);
        }
        else{
            gameOver();
        }
    })

    // ====================== show questions in textQuiz ======================

    function showTextQuestions(index){
        let queTag = `<h4>${questionList[index].no}. ${questionList[index].ques}</h4>`;
        let ques = textQuestion.querySelector(".question");
        let optionList = questionList[index].options;
        let optionTag='';
        optionList.forEach((option)=>{
            optionTag += `<div class="option" onclick="checkQues(this)">
                            <p>${option}</p>
                        </div>`;
        })
        ques.innerHTML = queTag;
        options.innerHTML = optionTag;
    }

    // ====================== check answer in textQuiz ======================

    function checkQues(answer){
        nextBtnOfTextQuestion.classList.add("active");
        skipButton.classList.add("hide");
        clearInterval(timer)
        let userAnswer = answer.children[0].innerText.toLowerCase();
        let correctAnswer = questionList[questionCount].ans;
        let allOptions = options.children.length;
        if(userAnswer == correctAnswer){
            succesAnswers++;
            answer.classList.add("answer");
            answer.innerHTML += `<span><i class='bx bx-check-circle ans'></i></span>`;
        }else{
            WrongAnswers++;
            answer.classList.add("wrong");
            answer.innerHTML += `<span><i class='bx bx-x-circle wr'></i></span>`;

            for (let i = 0; i < allOptions; i++) {
                if(options.children[i].innerText.toLowerCase() == correctAnswer){
                    options.children[i].classList.add("answer");
                    options.children[i].innerHTML += `<span><i class='bx bx-check-circle ans'></i></span>`
                }
            }
        }
        for (let i = 0; i < allOptions; i++) {
           options.children[i].classList.add("disabled"); 
        }
    }

    // =============================== game over  ==========================

    function gameOver(){
        textQuestion.classList.remove("show")
        imgQuestions.classList.remove("show")
        gameResult.classList.add("show");
        elSuccesAnswers.innerHTML = `${succesAnswers = succesAnswers < 9 ? "0" + succesAnswers : succesAnswers}`;
        elWrongAnswers.innerHTML = `${WrongAnswers = WrongAnswers < 9 ? "0" + WrongAnswers : WrongAnswers}`;
        elTimeOver.innerHTML = `${timeOver = timeOver < 9 ? "0" + timeOver : timeOver}`;
        elSkiped.innerHTML = `${skiped = skiped < 9 ? "0" + skiped : skiped}`;
    }

    // ====================== start time in textQuiz ======================

    function startTime(time){
        timer = setInterval(timerFunction, 1000);
       function timerFunction(){
            timeLeft.innerText = `${time = time < 10 ? "0" + time : time}s`;
            time--;
            if(time < 0 && textQuiz){
                timeOver++;
                clearInterval(timer);
                timeOverChooseAns();
                timeOverEl.innerHTML = "time over : ";
            }
       }
    }

// ================== time over automatic choose answer in textQuiz ==================

function timeOverChooseAns(){
    let allOptions = options.children.length;
    let correctAnswer = questionList[questionCount].ans;
    for (let i = 0; i < allOptions; i++) {
        if(options.children[i].innerText.toLowerCase() == correctAnswer){
            options.children[i].classList.add("answer");
            options.children[i].innerHTML += `<span><i class='bx bx-check-circle ans'></i></span>`
        }else{
            for (let i = 0; i < allOptions; i++) {
                nextBtnOfTextQuestion.classList.add("active");
                options.children[i].classList.add("disabled"); 
                skipButton.classList.add("hide");
             }
        }
    }
}

    // ====================== current question in textQuiz ======================

function currentQuestion(index){
    questionCurrent.innerHTML = `question ${index} of ${questionList.length}`;
}

    // ====================== exit game ======================

exitGame.addEventListener("click",()=>{
    window.location.reload();
})

// ============================================================================================
// ======================================== img Quiz ==========================================


let questionImage = imgQuestions.querySelector(".img"),
nextBtnOfImgQuestion = imgQuestions.querySelector(".btn #next"),
questionCurrentImg = imgQuestions.querySelector(".btn .question-current"),
timeLeftImg = imgQuestions.querySelector(".time-left span"),
skipButtonImg = imgQuestions.querySelector(".skip"),
timeOverElImg = imgQuestions.querySelector(".time-left p");
let quesionImgCount = 0;
let curQueNumImg = 1;
let timerImg = 0;
let timeImgValue = 15;

// ============================ next button in img quiz ============================

nextBtnOfImgQuestion.addEventListener("click",()=>{
    if(quesionImgCount < imgQuizList.length - 1){
        quesionImgCount++;
        curQueNumImg++;
        showImgQuestions(quesionImgCount);
        currentQuestionImg(curQueNumImg)
        clearInterval(timerImg);
        startTimeImg(timeImgValue)
        timeOverElImg.innerHTML = "time left : ";
    }else{
        gameOver()
    }
    nextBtnOfImgQuestion.classList.remove("active");
    skipButtonImg.classList.remove("hide");
})
// ============================ skip button in img quiz ============================

skipButtonImg.addEventListener("click",()=>{
    skiped+=1;
    if(quesionImgCount < imgQuizList.length - 1){
        quesionImgCount++;
        curQueNumImg++;
        showImgQuestions(quesionImgCount);
        currentQuestionImg(curQueNumImg)
        clearInterval(timerImg);
        startTimeImg(timeImgValue)
    }else{
        gameOver()
    }
})

// ===================== show questions in img quiz =====================

function showImgQuestions(index){
    let imgOptionTag='';
    let quesImgTag = `<img src="${imgQuizList[index].ques}" alt="">`;
    let ques = imgQuestions.querySelector(".question");
    let queTag = `<h4>${imgQuizList[index].no}. What Picture does mean?</h4>`;
    let imgOptions = imgQuizList[index].options;
    imgOptions.forEach((option)=>{
        imgOptionTag += `<div class="option" onclick="checkQuesImg(this)">
                        <p>${option}</p>
                    </div>`;
    })
    questionImage.innerHTML = quesImgTag;
    imgAllOptions.innerHTML = imgOptionTag; 
    ques.innerHTML = queTag;
}

// ==================== check answer in img quiz ====================

function checkQuesImg(answer){
    nextBtnOfImgQuestion.classList.add("active");
    skipButtonImg.classList.add("hide");
    clearInterval(timerImg)
    let userAnswer = answer.children[0].innerText.toLowerCase();
    let correctAnswer = imgQuizList[quesionImgCount].ans;
    let allOptions = imgAllOptions.children.length;
    if(userAnswer == correctAnswer){
        succesAnswers++;
        answer.classList.add("answer");
        answer.innerHTML += `<span><i class='bx bx-check-circle ans'></i></span>`;
    }else{
        WrongAnswers++;
        answer.classList.add("wrong");
        answer.innerHTML += `<span><i class='bx bx-x-circle wr'></i></span>`;

        for (let i = 0; i < allOptions; i++) {
            if(imgAllOptions.children[i].innerText.toLowerCase() == correctAnswer){
                imgAllOptions.children[i].classList.add("answer");
                imgAllOptions.children[i].innerHTML += `<span><i class='bx bx-check-circle ans'></i></span>`
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
       imgAllOptions.children[i].classList.add("disabled"); 
    }
}

    // ====================== current question in imgQuiz ======================

function currentQuestionImg(index){
    questionCurrentImg.innerHTML = `question ${index} of ${imgQuizList.length}`;
}

    // ====================== start time in imgQuiz ======================

function startTimeImg(time){
    timerImg = setInterval(timerFunction,1000);
    function timerFunction(){
            timeLeftImg.innerText = `${time = time < 10 ? "0" + time : time}s`;
            time--;
            if(time < 0 && imgQuiz){
                timeOver++;
                clearInterval(timerImg);
                timeOverChooseAnsImg();
                timeOverElImg.innerHTML = "time over : ";
            }
    }
}

    // =================== time over automatic choose answer in imgQuiz ===================

function timeOverChooseAnsImg(){
    let allOptions = imgAllOptions.children.length;
    let correctAnswer = imgQuizList[quesionImgCount].ans;
    for (let i = 0; i < allOptions; i++) {
        if(imgAllOptions.children[i].innerText.toLowerCase() == correctAnswer){
            imgAllOptions.children[i].classList.add("answer");
            imgAllOptions.children[i].innerHTML += `<span><i class='bx bx-check-circle ans'></i></span>`
        }else{
            for (let i = 0; i < allOptions; i++) {
                nextBtnOfImgQuestion.classList.add("active");
                imgAllOptions.children[i].classList.add("disabled"); 
                skipButtonImg.classList.add("hide");
             }
        }
    }
}
