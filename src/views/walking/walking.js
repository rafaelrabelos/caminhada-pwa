import React, { useState, useEffect } from "react";
import { __CONSTS, __TEXTS, __LANG } from "../../utils/constants";
import { WalkingService } from "../../services";
import { LogedInUser, Logo } from "../../components";
import session from "../../utils/session";

const Walking = () => {
  const { orientations, sizes } = __CONSTS;
  const texts = __TEXTS[__LANG].walkingView;

  const groupId = localStorage.getItem("walkingGroupId");

  useEffect(() => {
    loadPageStorage().then(() => {
      loadPageComponents();
    });
  });

  const loadPageStorage = async () => {
    const walkingQuestions = await WalkingService.getGroupQuestions(groupId);
    const walkingUsers = await WalkingService.getWalkingUsers(groupId);

    sessionStorage.setItem("activeQuestionNum", "0");
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
    const activeQuestionNum = sessionStorage.getItem("activeQuestionNum");
    const hasActiveSession = session.status();

    if (activeQuestionNum <= 0) {
      clearAnswers();
    }

    if (hasActiveSession && walkingGroupId) {
      getWalkingUsersHtml(walkingGroupId).then((htmlStr) => {
        document.getElementById("walking-users").innerHTML = htmlStr;
        updatePositions();
      });

      getWalkingQuestionHtml(walkingGroupId, activeQuestionNum).then(
        (htmlQuestion) => {
          document.getElementById("walking-question").innerHTML =
            htmlQuestion.question;
          document.getElementById("walking-options").innerHTML =
            htmlQuestion.options;
        }
      );
    } else {
      navigateToHome();
    }
  };

  const getWalkingUsersHtml = async (groupId) => {
    const walkingUsersStr = sessionStorage.getItem(`walkingUsers-${groupId}`);

    const userList = JSON.parse(walkingUsersStr).map((user) => {
      return `
      <div id="user-row-${user.userId}" class="walking-row">
        <div id="profile-user-${user.userId}" class="texts-descriptions texts-gray user-in-walk">
          <img class="profile-user-image" width="32" height="32" src="${user.userImgaeUrl}" />
          <div id="user-name-in-walk">${user.userGivenName}</div>
        </div>
      </div>`;
    });

    return userList.join("");
  };

  const getWalkingQuestionHtml = async (groupId, questionNum = 0) => {
    const questions = JSON.parse(
      sessionStorage.getItem(`walkingQuestions-${groupId}`)
    );

    if (questionNum >= questions.length) {
      return {
        question: `<b>Questões finalizadas!</b>`,
        options:
          "Confira abaixo sua condição de privilégio sobre as outras pessoas.",
      };
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
    const questions = JSON.parse(
      sessionStorage.getItem(`walkingQuestions-${groupId}`)
    );

    const answers = WalkingService.getQuestionsAnswers(groupId);

    if (!answers || !questions || !usersWalking) {
      return;
    }

    const usersPoints = usersWalking.map((user) => {
      const userAnswers = answers.filter(
        (answer) => answer.userId == user.userId
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

      return {
        userId: user.userId,
        points: points,
      };
    });

    usersPoints.forEach((user) => {
      let userRowElement = document.getElementById(`user-row-${user.userId}`);
      let userProfileElement = document.getElementById(
        `profile-user-${user.userId}`
      ).outerHTML;

      let checkPointHtml = [];

      for (let idx = 0; idx < user.points; idx++) {
        checkPointHtml.push(`
        <div  class="texts-descriptions texts-gray user-in-walk">
          <svg version="1" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
              <circle fill="#4CAF50" cx="24" cy="24" r="21"/>
              <polygon fill="#CCFF90" points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"/>
          </svg>
        </div>`);
      }
      checkPointHtml.push(userProfileElement);
      userRowElement.innerHTML = checkPointHtml.join("");
    });
  };

  /*
  event Handlers
  */

  const handleRestartWalk = () => {
    clearAnswers();
    navegateToWalking();
  };

  const handleBtnNextClick = (e) => {
    const groupId = localStorage.getItem("walkingGroupId");
    const questions = JSON.parse(
      sessionStorage.getItem(`walkingQuestions-${groupId}`)
    );
    let questionNum = sessionStorage.getItem("activeQuestionNum");
    const userId = sessionStorage.getItem("userId");
    const currentQuestion = questions[questionNum];

    const selected = currentQuestion.options.filter(
      (option) => document.getElementById(option.answerId).checked
    );

    WalkingService.updateQuestionAnwser(
      groupId,
      userId,
      currentQuestion.id,
      selected[0].answerId,
      true
    );

    if (questionNum >= questions.length - 1) {
      let btn_next = document.getElementById("btn-next");
      //btn_next.setAttribute("disabled", true);
      btn_next.onclick = handleRestartWalk;
      btn_next.classList.add("btn-outline");
      btn_next.innerText = "reiniciar";
    }

    sessionStorage.setItem("activeQuestionNum", ++questionNum);
    loadPageComponents();
  };

  const clearAnswers = () => {
    const groupId = localStorage.getItem("walkingGroupId");
    localStorage.removeItem(`answerQuestions-${groupId}`);
  };

  /** **/
  const handleLogOffClick = () => {
    clearAnswers();
    session.clearSession();
    navigateToHome();
  };

  const navegateToWalking = () => (window.location.href = "walking");
  const navigateToHome = () => (window.location.href = "/");

  return (
    <div className="App">
      {/* Top info */}
      <div className="row-line">
        <div className="walking-header">
          <Logo orientation={orientations.horizontal} size={sizes.sm} />
          <LogedInUser
            userName={session.getSessionItem("userName")}
            orientation={orientations.vertical}
            onLogoffClick={handleLogOffClick}
            logedMsg=" "
            size={sizes.md}
          />
        </div>
      </div>

      <div className="main-container">
        {/* Question form */}
        <div className="row-line">
          <div className="texts-descriptions">
            <p id="walking-question"></p>
            <br />
          </div>
          <div
            id="walking-options"
            className="question-radio texts-descriptions"
          ></div>
          <hr />
        </div>

        {/* Walking info */}
        <div className="walkers-container">
          <div id="walking-users" className="row-line">
            
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-container">
        <div className="row-line">
          <button
            id="btn-next"
            onClick={handleBtnNextClick}
            className="btn btn-default btn-log-in"
          >
            Proximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Walking;
