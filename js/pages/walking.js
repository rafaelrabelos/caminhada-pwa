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
  const walkingQuestions = await walkingService.getGroupQuestions(walkingGroupId);
  const walkingUsers = await walkingService.getWalkingUsers(walkingGroupId);

  sessionStorage.setItem("walkingActiveQuestionNum", "0");
  sessionStorage.setItem(`walkingQuestions-${walkingGroupId}`, JSON.stringify(walkingQuestions));
  sessionStorage.setItem(`walkingUsers-${walkingGroupId}`, JSON.stringify(walkingUsers));
}

const loadPageComponents = () => {

  let statusSession = sessionStatus();
  if (statusSession == true) {
    getWalkingUsersHtml().then(
      (htmlStr) =>
        (document.getElementById("walking-users").innerHTML = htmlStr)
    );

    localStorage.setItem("activeQuestionId", "1");
  }else{
    navegateToLogin();
  }

};

const loadPageElementsActions = async () => {

  let link_logOff = document.getElementById("log-out");
  let btn_next = document.getElementById("btn-next");

  link_logOff.onclick = handleLogOffLinkClick;
};

const getWalkingUsersHtml = async (walkingGroupId) => {
  
  const walkingUsersStr = sessionStorage.getItem(`walkingUsers-${walkingGroupId}`);

  const userList = JSON.parse(walkingUsersStr).map((user) => {
    return `<div class="texts-descriptions texts-gray user-in-walk">
        <img id="user-${user.userId}-image" class="profile-user-image" width="32" height="32" src="${user.userImgaeUrl}" />
        <div id="user-name-in-walk">${user.userGivenName}</div>
      </div>`;
  });
  
  return userList.join("");
}

/*
event Handlers
*/
const handleLogOffLinkClick = (e) => {
  sessionStorage.clear();
  navegateToLogin();
}

const navegateToLogin = () => window.location.href = './';