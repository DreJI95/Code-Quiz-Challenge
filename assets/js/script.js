var headerOfPage = document.querySelector(".page-title");
var mainOfPage = document.querySelector(".page-content");

var questionItem = ""; //holds question
var answerListItem = ["one","two","three","four"]; //holds answers list
var response = [true,false,null]; //holds answer response
var score = 0;
var name = "Andre";
var scoreList = [""];

//creates HTML page element of the View High Score link
var viewHighScoreLink = 
{
    showHighScoreLink: function() { 
        var viewHighScoreLink = document.createElement("div");
        viewHighScoreLink.innerHTML = "<a href=#link-to-high-score class=\"view-high-score\">View High Scores</a>";
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

    mainOfPage.appendChild(startQuizButton);
    }
}
//mainPage.showMainPage(); //----> function to show main page

//Initializes quiz page elements
var quizPage = {
    
    showQuestion: function (question,answerList) {
    var quizQuestion = document.createElement("div");
    quizQuestion.className = "quiz-question";
    quizQuestion.innerHTML = "<h1\">"+question+"</h1>";

    mainOfPage.prepend(quizQuestion);

    var quizAnswerList = document.createElement("ol");
    quizAnswerList.className = "quiz-answers";
    quizAnswerList.innerHTML = "<li><button>"+answerList[0]+"</button></li>"+"<li><button>"+answerList[1]+"</button></li>"+"<li><button>"+answerList[2]+"</button></li>"+"<li><button>"+answerList[3]+"</button></li>";

    mainOfPage.appendChild(quizAnswerList);
    },

    showResponse: function (response) {
    var responseText;

    if (response === true)
    { responseText = "Correct"; }
    else if (response === false)
    { responseText = "Wrong"; }
    else if (response === null)
    { responseText = ""; }

    var quizResponse = document.createElement("div");
    quizResponse.className = "quiz-response";
    quizResponse.innerHTML = "<p>"+responseText+"</P>";

    mainOfPage.appendChild(quizResponse);
    }
}
//quizPage.showQuestion(questionItem,answerListItem); //----> function to show quiz page
//quizPage.showResponse(response[2]);


//Initializes results page elements
var resultsPage = {
    
    viewUserName: document.createElement("input"),

    showResults: function (userScore) {
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
        var highScoreTitle = document.createElement("h1");
        highScoreTitle.className = "high-score-title";
        highScoreTitle.textContent = "High scores";

        mainOfPage.prepend(highScoreTitle);

        var highScoreList = document.createElement("ol");
        highScoreList.className = "quiz-answers";
        var listString = "";

        for (var i = 0; i < scoreList.length; i++)
        { 
           listString += ("<li>"+scoreList[i]+"</li>");
        }

        highScoreList.innerHTML = listString;
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
//highScorePage.showScoresList(scoreList);

//WHEN no quiz is entered yet THEN "View High Scores" link is blank
    //Else a link takes you to a page to see the ranked scores (from local storage)
    //There is a button to restart (return to the main page)
    //There is a button to clear the list (clean the local storage)

//Timer is at zero until event listenter for start button click is true
    // if answer is false THEN timer is reduced
    // if timer is at zero and quiz is unfinished then go to results page.
    // if quiz last quiz has a returned answer THEN timer is set to zero
    // if main page is shown timer is set to beginning

//Quiz questions and answers are stored in objects
//Each answer is mapped to a button event listener
    //Answer response is then displayed

//Only when last quiz is answered the accumulated scores are stored to local storage
    //else scores are counted for every correct answer
    //the faster the quiz ends 5 points are added.
    //if the last question is answered THEN navigate to a results page

//Results page ask to show high scores (same page as "View High Scores" link or to to start over "Main intro page")
    //Ask user to enter name and submit
    //Show their score and highlight their name.
