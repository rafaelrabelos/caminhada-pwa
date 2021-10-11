document.addEventListener(
  "DOMContentLoaded",
  async () => {
    await loadPageStorage();
    loadPageElementsActions();
    loadPageComponents();
  },
  false
);

const loadPageStorage = async () => {
  const groupId = localStorage.getItem("walkingGroupId");
  const walkingService = new WalkingService();
  const walkingQuestions = await walkingService.getGroupQuestions(
    groupId
  );
  const walkingUsers = await walkingService.getWalkingUsers(groupId);

  sessionStorage.setItem("walkingActiveQuestionNum", "0");
  sessionStorage.setItem(
    `walkingQuestions-${groupId}`,
    JSON.stringify(walkingQuestions)
  );
  sessionStorage.setItem(
    `walkingUsers-${groupId}`,
    JSON.stringify(walkingUsers)
  );
};

const loadPageComponents = () => {
  //TO-DO Valide group when has a group screen
  const walkingGroupId = localStorage.getItem("walkingGroupId");
  const activeQuestionNum = sessionStorage.getItem("walkingActiveQuestionNum");
  const hasActiveSession = sessionStatus();

  if (hasActiveSession && walkingGroupId) {
    getWalkingUsersHtml(walkingGroupId).then(
      (htmlStr) =>
        (document.getElementById("walking-users").innerHTML = htmlStr)
    );

    getWalkingQuestionHtml(walkingGroupId, activeQuestionNum).then(
      (htmlQuestion) => {
        document.getElementById("walking-question").innerHTML =
          htmlQuestion.question;
        document.getElementById("walking-options").innerHTML =
          htmlQuestion.options;
      }
    );
  } else {
    navegateToLogin();
  }
};

const loadPageElementsActions = async () => {
  let link_logOff = document.getElementById("log-out");
  let btn_next = document.getElementById("btn-next");

  link_logOff.onclick = handleLogOffLinkClick;
  btn_next.onclick = handleBtnNextClick;
};

const getWalkingUsersHtml = async (groupId) => {
  const walkingUsersStr = sessionStorage.getItem(
    `walkingUsers-${groupId}`
  );

  const userList = JSON.parse(walkingUsersStr).map((user) => {
    return `<div class="texts-descriptions texts-gray user-in-walk">
        <img id="user-${user.userId}-image" class="profile-user-image" width="32" height="32" src="${user.userImgaeUrl}" />
        <div id="user-name-in-walk">${user.userGivenName}</div>
      </div>`;
  });

  return userList.join("");
};

const getWalkingQuestionHtml = async (groupId, questionNum = 0) => {
  const questions = JSON.parse(sessionStorage.getItem(
    `walkingQuestions-${groupId}`
  ));

  if(questionNum >= questions.length){
    return `
    <b> FIM</>
    `;
  }

  const currentQuestion = questions[questionNum];
  const question = currentQuestion.question;
  const options = currentQuestion.options;

  const questionHtml = `${question}`;

  const optionsHtml = options.map((option, idx) => {
    const id = `${option.answerId}`;
    const props = `type="radio" id="${id}" name="walking-form"`;
    const checked = idx == 0 ? "checked" : "";
    return `
  <div>
    <input ${props} value="${option.value}" ${checked}>
    <label for="${id}">${option.answer}</label>
  </div>
  `;
  });

  return {
    question: questionHtml,
    options: optionsHtml.join(""),
  };
};

const updatePositions = () => {
  const groupId = localStorage.getItem("walkingGroupId");
  const usersWalking = JSON.parse(
    sessionStorage.getItem(`walkingUsers-${groupId}`)
  );
  const questions = JSON.parse(sessionStorage.getItem(
    `walkingQuestions-${groupId}`
  ));
  const walkingService = new WalkingService();
  const answers = walkingService.getQuestionsAnswers(groupId);  
  
  usersWalking.map(user => {

    const userAnswers = answers.filter(
      (answer) => (answer.userId == user.userId)
    );

    const answeredQuestions = userAnswers.map(
      (Answer) =>
        questions.filter((question) => Answer.questionId == question.id)[0]
    );

    const points = answeredQuestions
      .map((question) => {
        const answer = userAnswers.filter(
          (userAnswer) => userAnswer.questionId == question.id
        )[0];
        const options = question.options.filter(
          (opt) => answer.anwserId == opt.answerId
        )[0];
        return options.value;
      })
      .reduce((ac, a) => ac + a, 0);
  });
}

/*
event Handlers
*/
const handleLogOffLinkClick = (e) => {
  sessionStorage.clear();
  navegateToLogin();
};

const handleBtnNextClick = (e) => {
  const groupId = localStorage.getItem("walkingGroupId");
  const questions = JSON.parse(
    sessionStorage.getItem(`walkingQuestions-${groupId}`)
  );
  let questionNum = sessionStorage.getItem("walkingActiveQuestionNum");
  const userId = sessionStorage.getItem('userId');
  const currentQuestion = questions[questionNum];
  const walkingService = new WalkingService();

  const selected = currentQuestion.options.filter(
    (option) => document.getElementById(option.answerId).checked
  );

  walkingService.updateQuestionAnwser(
    groupId,
    userId,
    currentQuestion.id,
    selected[0].answerId
  );

  if(questionNum >= (questions.length-1)){
    document.getElementById("btn-next").setAttribute("disabled", true);
    return;
  }else{
    sessionStorage.setItem("walkingActiveQuestionNum", ++questionNum);
    updatePositions();
    loadPageComponents();
  }
};

const navegateToLogin = () => (window.location.href = "./");
