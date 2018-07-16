// Trivia questions array
var triviaQuestions = [{
    question: "How many grand slams do the Red Sox have this season? ",
    answerList: ["6", "3", "9", "4"],
    answer: 2
},{
    question: "Which player currently has the highest batting average?",
    answerList: ["Mookie Betts", "Andrew Benintendi ", "J.D. Martinez", "Xander Bogaerts"],
    answer: 0
},{
    question: "Which player currently leads the league in homeruns?",
    answerList: ["Jose Ramirez", "Aaron Judge", "Mike Trout", "J.D Martinez"],
    answer: 3
},{
    question: "Which pitcher currently leads the league in strikeouts?",
    answerList: ["Max Scherzer ", "Chris Sale", "Gerrit Cole", "Trevor Bauer"],
    answer: 1
},{
    question: "Since 2007, which season have the Red Sox held the most amount of wins entering the All-Star break?",
    answerList: ["2018", "2016", "2008", "2010"],
    answer: 0
},{
    question: "Who is the Red Sox 'closer'?",
    answerList: ["Joe Kelley", "Heath Hembree", "Craig Kimbrel", "Matt Barnes"],
    answer: 2
},{
    question: "Which player has the most RBI's in the MLB?",
    answerList: ["Jose Ramirez", "Manny Machado", "Javier Baez", "J.D. Martinez"],
    answer: 3
},{
    question: "What band sings Fenway's cherished 'Sweet Caroline' played at top of the 8th inning?'",
    answerList: ["Bon Jovi", "Tom Petty", "The Styx", "Neil Diamond"],
    answer: 3
},{
    question: "What is the oldest MLB park in the country? ",
    answerList: ["Fenway Park", "Wrigley Field", "Angels Stadium of Anaheim ", "Dodger Stadium"],
    answer: 0
},{
    question: "What is the seating capacity of Fenway Park?",
    answerList: ["20,232", "37,731", "56,128", "10,456"],
    answer: 1
}];

// each array object of imgArray is identified by the correct answer index of the array
var imgArray = ['grand slam', 'mookie betts', 'j.d. martinez', 'chris sale', '2018', 'craig kimbrel', 'j.d. martinez rbi', 'neil diamond', 'fenway', 'fenway capacity'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
    correct: "Correct!",
    incorrect: ".... that is so wrong",
    endTime: "Oops. You ran out of time!",
    finished: "Let's see what your bating average is:"
}

$('#startBtn').on('click', function() {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on('click', function(){
    $(this).hide();
    newGame();
});

function newGame() {
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion(){
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#img').empty();
    answered = true;


    // sets up a new questions and answers list
    $('#currentQuestion').html('Question: ' + (currentQuestion+1)+" out of "+triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
    for( var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({'data-index': i});
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }
    countdown();
    // clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function(){
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    // sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if(seconds < 1){
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $('#currentQuestion').empty();
    $('.thisChoice').empty(); //Clears question page
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $('#img').html('<img src = "assets/images/' + imgArray[currentQuestion] +'.gif" class="img-thumbnail">');
    // Checks to see correct, incorrect, or unanswered
    if((userSelect == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $('#message').html(messages.correct);
    } else if((userSelect !=  rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
    } else {
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctedAnswer').html('The Correct Answer was: ' + rightAnswerText);
        answered = true;
    }

    if(currentQuestion == (triviaQuestions.length-1)) {
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}

function scoreboard() {
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#img').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}



