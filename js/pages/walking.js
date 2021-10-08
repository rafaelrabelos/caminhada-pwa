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
    document.getElementById("user-name").innerText = sessionStorage.getItem('userName');
    document.getElementById("user-image").setAttribute("src", sessionStorage.getItem('userImgaeUrl'));
  }else{
    navegateToLogin();
  }

};

const loadPageElementsActions = async () => {

  let link_logOff = document.getElementById("log-out");
  let btn_next = document.getElementById("btn-next");

  link_logOff.onclick = handleLogOffLinkClick;
};

/*
event Handlers
*/
const handleLogOffLinkClick = (e) => {

  sessionStorage.clear();
  navegateToLogin();
}

const navegateToLogin = () => window.location.href = './';