var headerOfPage = document.querySelector(".page-title");
var mainOfPage = document.querySelector(".page-content");
var responseOfPage = document.querySelector(".page-response");

// Clear page elements
var clearPageElements = function () {
    headerOfPage.innerHTML = "";
    mainOfPage.innerHTML = "";
}

var listOfQuestionsAnswers = [
{ question:"What day is it?", answerList:["Monday","Tuesday","Wednesday","Sunday"], answer:"Sunday"},
{ question:"What year is it?", answerList:["2018","2019","2020","2021"], answer:"2021"},
{ question:"What month is it?", answerList:["Jan","Feb","Mar","Apr"], answer:"Mar"}, 
{ question:"What is the fourth letter of the alphabet?", answerList:["a","b","c","d"], answer:"d"},
{ question:"What is hour 14 on a 24 hour clock mean?", answerList:["1pm","2pm","3pm","4pm"], answer:"2pm"}]
 
//-------------------
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

var score = 0;
var name = "Andre";
var scoreList = [""];
var timerVal = 50;
var quesNum = 0;

//creates HTML page element of the View High Score link
var viewHighScoreLink = 
{
    showHighScoreLink: function() { 
        var viewHighScoreLink = document.createElement("div");
        viewHighScoreLink.innerHTML = "<a href=#link-to-high-score id=\"view-high-score\">View High Scores</a>";
        /*>--------------Modify later to include score page-------------------<*/ 
        headerOfPage.prepend(viewHighScoreLink);
    }
}
//viewHighScoreLink.showHighScoreLink();

//creates HTML page element of the timer
var viewTimer = 
{
    showTimer: function(timer) { 
        var viewTimer = document.createElement("section");
        viewTimer.innerHTML = "<div class=\"timer\">Timer: <span class=\"timer-value\">"+timer+"</span></div>";

        headerOfPage.appendChild(viewTimer);
    }
}
//viewTimer.showTimer();

//Initializes main page elements
var mainPage = {

    showMainPage: function () {
    clearPageElements();
    responseOfPage.innerHTML = " ";
    timerVal = 50;
    viewHighScoreLink.showHighScoreLink();
    viewTimer.showTimer("00:00");

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
//mainPage.showMainPage(); //----> function to show main page

//Initializes quiz page elements
var quizPage = {
    
    showQuestion: function (question,answerList) {
    clearPageElements();
    viewHighScoreLink.showHighScoreLink();
    viewTimer.showTimer("00:00");

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
// quizPage.showQuestion(questionItem,answerListItem); //----> function to show quiz page
// quizPage.showResponse(response[2]);

//Initializes results page elements
var resultsPage = {
    
    viewUserName: document.createElement("input"),

    showResults: function (userScore) {
        
        responseOfPage.innerHTML = " ";
        viewHighScoreLink.showHighScoreLink();
        viewTimer.showTimer("00:00");

        var viewPageTitle = document.createElement("h1");
        viewPageTitle.textContent = "All done!";

        mainOfPage.appendChild(viewPageTitle);

        var viewUserScore = document.createElement("div");
        viewUserScore.className = "user-score";
        viewUserScore.textContent = "Your score is: "+userScore;

        mainOfPage.appendChild(viewUserScore);

        this.viewUserName.className = "user-name"
        this.viewUserName.innerHTML = "<label for=\"user-name\">Enter your name:</label><input type=\"text\" placeholder=\"Enter name here\" name=\"user-name\" id=\"user-name\" class=\"form-input\">";

        mainOfPage.appendChild(this.viewUserName);

        var submitButton = document.createElement("button");
        submitButton.className = "submit-name";
        submitButton.textContent = "Submit";

        mainOfPage.appendChild(submitButton);
    },

    enterName: function (userName){
        this.viewUserName.value = userName;
    }
}
//resultsPage.showResults(score);
//resultsPage.enterName(name);

//Initialize high score page elements
var highScorePage = {
    
    showScoresList: function (highScoreList) {
        clearPageElements();
        responseOfPage.innerHTML = " ";
        var highScoreTitle = document.createElement("h1");
        highScoreTitle.className = "high-score-title";
        highScoreTitle.textContent = "High scores";

        mainOfPage.prepend(highScoreTitle);

        var highScoreList = document.createElement("ol");
        highScoreList.className = "quiz-answers";

        for (var i = 0; i < scoreList.length; i++)
        { highScoreList.innerHTML += ("<li>"+scoreList[i]+"</li>");
        }

        mainOfPage.appendChild(highScoreList);

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
    if (timerVal > 0 && quesNum < currentQuestion.length)
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
        quizPage.showQuestion(currentQuestion[quesNum],currentAnswersList[quesNum]);
    }
    else if ( timerVal <= 0 && quesNum >= currentQuestion.length)
    {
        timerVal = 50;
        quesNum = 0;
        resultsPage.showResults(score);
        resultsPage.enterName(name);
    }
    console.log(timerVal+" "+quesNum);
    

    // if main page is shown timer is set to beginning
    //Quiz questions and answers are stored in objects
}


//highScorePage.showScoresList(scoreList);

//WHEN no quiz is entered yet THEN "View High Scores" link is blank
    //Else a link takes you to a page to see the ranked scores (from local storage)
    //There is a button to restart (return to the main page)
    //There is a button to clear the list (clean the local storage)

//Only when last quiz is answered the accumulated scores are stored to local storage
    //else scores are counted for every correct answer
    //the faster the quiz ends 5 points are added.
    //if the last question is answered THEN navigate to a results page

//Results page ask to show high scores (same page as "View High Scores" link or to to start over "Main intro page")
    //Ask user to enter name and submit
    //Show their score and highlight their name.

//Start button for quiz to commence - event handler
var startButtonHandler = function (event) {
    if (event.target.matches(".start-button"))
    {
        clearPageElements();
        document.getElementsByClassName("quiz-response").textContennt = " ";
        quizPage.showQuestion(currentQuestion[quesNum],currentAnswersList[quesNum]);
    }
}

var quizAnswerHandler = function (event) {
    if (event.target.matches(".answer-button"))
    {
       executeQuiz((event.target.textContent).toString());
    }
}

//-------------------------------------------------------///
mainPage.showMainPage();


mainOfPage.addEventListener("click",startButtonHandler);
mainOfPage.addEventListener("click",quizAnswerHandler);