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
  const walkingGroupId = localStorage.getItem("walkingGroupId");
  const walkingService = new WalkingService();
  const walkingQuestions = await walkingService.getGroupQuestions(
    walkingGroupId
  );
  const walkingUsers = await walkingService.getWalkingUsers(walkingGroupId);

  sessionStorage.setItem("walkingActiveQuestionNum", "0");
  sessionStorage.setItem(
    `walkingQuestions-${walkingGroupId}`,
    JSON.stringify(walkingQuestions)
  );
  sessionStorage.setItem(
    `walkingUsers-${walkingGroupId}`,
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

const getWalkingUsersHtml = async (walkingGroupId) => {
  const walkingUsersStr = sessionStorage.getItem(
    `walkingUsers-${walkingGroupId}`
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
    loadPageComponents();
  }
};

const navegateToLogin = () => (window.location.href = "./");
