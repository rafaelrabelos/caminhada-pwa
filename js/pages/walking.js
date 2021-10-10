document.addEventListener(
  "DOMContentLoaded",
  function () {
    loadPageElementsActions();
    loadPageComponents();
  },
  false
);

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

const getWalkingUsersHtml = async (walkingGroup = null) => {
  let walkingService = new WalkingService();
  let walkingUsers = await walkingService.getWalkingUsers(walkingGroup);

  let userList = walkingUsers.map((user) => {
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