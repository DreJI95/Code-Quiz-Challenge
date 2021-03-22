var headerOfPage = document.querySelector(".page-title");
var mainOfPage = document.querySelector(".page-content");
var responseOfPage = document.querySelector(".page-response");

// Clear page elements
var clearPageElements = function () {
    headerOfPage.innerHTML = "";
    mainOfPage.innerHTML = "";
}

//-------------------Questions and answers declarations and initialization
var listOfQuestionsAnswers = [
{ question:"What are the types of Pop up boxes available in JavaScript?", answerList:["Alert","Prompt","Confirm","All of the above"], answer:"All of the above"},
{ question:"Which of the following is not a JavaScript Data Type?", answerList:["Undefined","Number","Boolean","Float"], answer:"Float"},
{ question:"What does javascript use instead of == and !=?", answerList:["It uses bitwise checking","It uses === and !== instead","It uses equals() and notequals() instead","It uses equalto()"], answer:"It uses === and !== instead"}, 
{ question:"Which symbol is used for comments in Javascript?", answerList:["^","//","$","!"], answer:"//"},
{ question:"Which method receives the return value of setInterval() to cancel future invocations?", answerList:["clearInvocation()","cancelInvocation","clearInterval()","clear()"], answer:"clearInterval()"}]
 
var currentQuestion = []; //holds current question
var currentAnswersList = []; //holds current answers list
var currentAnswer = []; //holds current answer

for (const arrEl in listOfQuestionsAnswers)
{
    currentQuestion.push(listOfQuestionsAnswers[arrEl].question);
    currentAnswersList.push(listOfQuestionsAnswers[arrEl].answerList);
    currentAnswer.push(listOfQuestionsAnswers[arrEl].answer);
}
//----------------

//Environment variables for score,name,timer and number of questions
var score = 0;
var name;
var timerVal = 59;
var quesNum = 0;
var startTimer = false; //used to start the timer

//creates HTML page element of the View High Score link
var viewHighScoreLink = 
{
    showHighScoreLink: function() { 
        var viewHighScoreLink = document.createElement("div");
        viewHighScoreLink.innerHTML = "<button class=\"view-high-scores\">View High Scores</button>";
        /*>--------------Modify later to include score page-------------------<*/ 
        headerOfPage.prepend(viewHighScoreLink);
    }
}

//creates HTML page element of the timer
var viewTimer = 
{
    showTimer: function(timer) { 
        var viewTimer = document.createElement("section");
        viewTimer.innerHTML = "<div class=\"timer\">Timer: <span id=\"timer-value\">"+timer+"</span></div>";

        headerOfPage.appendChild(viewTimer);
    }
}

//Initializes main page elements
var mainPage = {

    showMainPage: function () {
    clearPageElements();
    responseOfPage.innerHTML = " ";
    viewHighScoreLink.showHighScoreLink();
    viewTimer.showTimer(timerVal);

    var viewTitle = document.createElement("div");
    viewTitle.innerHTML = "<h1 class=\"introduction-header\">Code Quiz Challenge</h1>";

    mainOfPage.prepend(viewTitle);

    var viewIntroduction = document.createElement("div");
    viewIntroduction.innerHTML = "<p class=\"introduction-greeting\">Welcome to code quiz challenge! <br></br><span class=\"introduction-description\">Answer the questions as best you can in under 1 minute! Would you like to begin?</span></p>";

    mainOfPage.appendChild(viewIntroduction);

    var startQuizButton = document.createElement("button");
    startQuizButton.textContent = "Start Quiz";
    startQuizButton.className = "start-button";

    viewIntroduction.appendChild(startQuizButton);
    }
}

//Initializes quiz page elements
var quizPage = {
    
    showQuestion: function (question,answerList) {
    clearPageElements();
    viewHighScoreLink.showHighScoreLink();
    viewTimer.showTimer(timerVal);

    var quizQuestion = document.createElement("div");
    quizQuestion.className = "quiz-question";
    quizQuestion.innerHTML = "<h1\">"+question+"</h1>";

    mainOfPage.prepend(quizQuestion);

    var quizAnswerList = document.createElement("ol");
    quizAnswerList.className = "quiz-answers";

    for (i=0; i < answerList.length; i++){
    quizAnswerList.innerHTML += "<li><button class=\"answer-button\">"+answerList[i]+"</button></li>";
    }

    mainOfPage.appendChild(quizAnswerList);

    var quizResponse = document.createElement("div");
    quizResponse.className = "quiz-response";

    responseOfPage.appendChild(quizResponse);
    }
}

//Initializes results page elements
var resultsPage = {

    showResults: function (userScore) {
        clearPageElements();
        responseOfPage.innerHTML = " ";
        viewHighScoreLink.showHighScoreLink();
        viewTimer.showTimer(timerVal);

        var viewPageTitle = document.createElement("h1");
        viewPageTitle.textContent = "All done!";

        mainOfPage.appendChild(viewPageTitle);

        var viewUserScore = document.createElement("div");
        viewUserScore.className = "user-score";
        viewUserScore.textContent = "Your score is: "+userScore;

        mainOfPage.appendChild(viewUserScore);

        var viewUserName = document.createElement("div")
        viewUserName.className = "user-name"
        viewUserName.innerHTML = "<label for=\"user-name\"></label><input type=\"text\" placeholder=\"Enter name here\" name=\"user-name\" id=\"user-name\" class=\"form-input\">";

        mainOfPage.appendChild(viewUserName);

        var submitButton = document.createElement("button");
        submitButton.className = "submit-name";
        submitButton.textContent = "Submit";

        viewUserName.appendChild(submitButton);
    }
}

//Initialize high score page elements
var highScorePage = {
    
    showScoresList: function (scoreList) {
        clearPageElements();
        responseOfPage.innerHTML = " ";

        var highScoreTitle = document.createElement("h1");
        highScoreTitle.className = "high-score-title";
        highScoreTitle.textContent = "High scores";

        mainOfPage.prepend(highScoreTitle);

        if (scoreList)
        {
            var highScoreList = document.createElement("ol");
            highScoreList.className = "quiz-answers";
            mainOfPage.appendChild(highScoreList);

            for (var i = 0; i < scoreList.length; i++)
            { 
                highScoreList.innerHTML += ("<li>"+scoreList[i]+"</li>");
            }
        }

        var returnButton = document.createElement("button");
        returnButton.className = "return-button";
        returnButton.textContent = "Return to Main page";

        mainOfPage.appendChild(returnButton);

        var clearHighScore = document.createElement("button");
        clearHighScore.className = "clear-button";
        clearHighScore.textContent = "Clear High Scores";

        mainOfPage.appendChild(clearHighScore);
    }
}

var executeQuiz = function(userAnswered)
{
    while (timerVal > 0 && quesNum < currentQuestion.length)
    {
        if (userAnswered === currentAnswer[quesNum])
        {   
            responseOfPage.innerHTML = " ";
            responseOfPage.innerHTML = "<h2>Correct!</h2>";
        }
        else
        {
            responseOfPage.innerHTML = " ";
            responseOfPage.innerHTML = "<h2>Wrong!</h2>";
            timerVal-=10;
        }
        quesNum++;
        return 0;
    }
}

//Start button for quiz to commence - event handler
var startButtonHandler = function (event) {
    event.preventDefault(); //prevents browser refresh
    if (event.target.matches(".start-button"))
    {
        clearPageElements();
        document.getElementsByClassName("quiz-response").textContent = " ";
        quizPage.showQuestion(currentQuestion[quesNum],currentAnswersList[quesNum]);
        startTimer = true;
    }
}

//checks user quiz response
var quizAnswerHandler = function (event) {
    event.preventDefault(); //prevents browser refresh
    if (event.target.matches(".answer-button"))
    {
        if (timerVal > 0)
        {
            executeQuiz((event.target.textContent).toString());
            score = timerVal;
            if (quesNum  >= currentQuestion.length)
            {
                timerVal = 59;
                quesNum = 0;
                startTimer = false;
                clearInterval();
                resultsPage.showResults(score);
            }
            else { quizPage.showQuestion(currentQuestion[quesNum],currentAnswersList[quesNum]); }
        }
        else {
            timerVal = 59;
            quesNum = 0;
            score = 0;
            startTimer = false;
            clearInterval();
            resultsPage.showResults(score);
         }
    }
}

// stores scores to local storage
var scoresFromLocalStorage = function (userName) {

    var fromScoreList = [""]; 
    
    if (!userName)
    {
        return null;
    }

    if (localStorage.getItem("player-score") !== null)
    {
        fromScoreList[0] = (userName+": "+score).toString();

        var arrObj = JSON.parse(localStorage.getItem("player-score"));

        for (const i in arrObj){
        fromScoreList.push(arrObj[i]);
        }
    }
    else
    {
    fromScoreList[0] = (userName+": "+score).toString();
    }

    localStorage.setItem("player-score", JSON.stringify(fromScoreList));
    return (fromScoreList);
}

//submit button handler for the user name and score
var submitScoreHandler = function (event) {
    event.preventDefault(); //prevents browser refresh
    if (event.target.matches(".submit-name"))
    {
       name = document.querySelector("input[name='user-name']").value;
       clearInterval();
       startTimer = false;
       highScorePage.showScoresList(scoresFromLocalStorage(name));
    }
}

//clears score board and local storage
var clearScoresHandler = function (event) {
    event.preventDefault(); //prevents browser refresh
    if (event.target.matches(".clear-button")) {
    localStorage.removeItem("player-score");
    highScorePage.showScoresList(null);
    }
}

//returns to main page and resets timer and questions value
var returnMainPageHandler = function (event) {
    event.preventDefault(); //prevents browser refresh
    if (event.target.matches(".return-button")) {
    timerVal = 59;
    quesNum = 0;
    name = null;
    score = 0;
    startTimer = false;
    mainPage.showMainPage();
    }
}

var highScoreLinkHandler  = function (event) {
    if (event.target.matches(".view-high-scores")){
        clearInterval();
        startTimer = false;
        highScorePage.showScoresList(scoresFromLocalStorage(name));
    }
}

var decrementScore = function () {
        if (startTimer === true)
        {
        timerVal--;
        document.getElementById("timer-value").textContent = timerVal;
        }
}

//-------------------------------------------------------///
mainPage.showMainPage();


mainOfPage.addEventListener("click",startButtonHandler);
mainOfPage.addEventListener("click",quizAnswerHandler);
mainOfPage.addEventListener("click",submitScoreHandler);
mainOfPage.addEventListener("click",clearScoresHandler);
mainOfPage.addEventListener("click",returnMainPageHandler);
headerOfPage.addEventListener("click",highScoreLinkHandler);
setInterval(decrementScore,1000);