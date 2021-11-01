/*
Mocked services
*/
class WalkingService {
  
  getWalkingUsers = async (groupId) => {
    
    // For mock: it is a data response from an API
    const usersStorageKeyName = `walkingUsers-${groupId}`
    let apiMockUsers = [
      {
        userId: sessionStorage.getItem("userId"),
        userName: sessionStorage.getItem("userName"),
        userImgaeUrl: sessionStorage.getItem("userImgaeUrl"),
        userGivenName:  sessionStorage.getItem('userGivenName'),
      },
      {
        userId: '',
        userName: null,
        userImgaeUrl: null,
        userGivenName:  null,
      },
      {
        userId: '',
        userName: null,
        userImgaeUrl: null,
        userGivenName:  null,
      },
      {
        userId: '',
        userName: null,
        userImgaeUrl: null,
        userGivenName:  null,
      },
      {
        userId: '',
        userName: null,
        userImgaeUrl: null,
        userGivenName:  null,
      },
      {
        userId: '',
        userName: null,
        userImgaeUrl: null,
        userGivenName:  null,
      },
      {
        userId: '',
        userName: null,
        userImgaeUrl: null,
        userGivenName:  null,
      }
    ];

    //when the api is off, i get info from local
    if(!apiMockUsers){
      let localWalkingUsers = localStorage.getItem(usersStorageKeyName);

      if(!localWalkingUsers){
        return [];
      }
      return JSON.parse(localWalkingUsers);
    }

    for (let userIdx = 0; userIdx < apiMockUsers.length; userIdx++) {
      const user = apiMockUsers[userIdx];

      if(user.userId === sessionStorage.getItem("userId"))
      continue;
      
      apiMockUsers[userIdx] = await this.mockUserInfo(user);

    }
    localStorage.setItem(usersStorageKeyName, JSON.stringify(apiMockUsers));
    return apiMockUsers;
  }

  mockUserInfo = (user) => {

    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open("GET", "https://randomuser.me/api/");
      request.responseType = "json";

      request.onload = () => {
        if (
          request.status === 200 &&
          request.response &&
          request.response.results.length > 0
        ) {
          let randUser = request.response.results[0];

          user.userId = randUser.login.md5.substring(1, 6);
          user.userImgaeUrl = randUser.picture.large;
          user.userName = `${randUser.name.titlw} ${randUser.name.first} ${randUser.name.last}`;
          user.userGivenName = randUser.name.first;

          resolve(user);
        } else {
          reject(null);
        }
      };

      request.onerror = () => {
        reject(null);
      };

      request.send();
    });
  }

  createWalkingGroup = () => {
    let groupName = "DEFX3";
    localStorage.setItem("walkingGroupId", "DEFX3");

    return groupName;
  }

  joinWalkingGroup = (groupId) => {
    localStorage.setItem("walkingGroupId", groupId);
    
    return groupId;
  }

  getGroupQuestions = async (groupId) => {
    // For mock: it is a data response from an API
    const questionsStorageKeyName = `walkingQuestions-${groupId}`;
    const apiMockWalkingQuestions = [
      {
        id: "001",
        question: "Se tem plano de saúde particular, dê um sim",
        options: [
          { answer: "Sim", value: 1, answerId: "yes" },
          { answer: "Não", value: 0, answerId: "no" },
        ],
      },
      {
        id: "002",
        question: "Se já teve que escolher entre carreira e ter filhos/filhas, dê um sim",
        options: [
          { answer: "Sim", value: -1, answerId: "yes" },
          { answer: "Não", value: 1, answerId: "no" },
        ],
      },
      {
        id: "003",
        question: "Se veio de um ambiente familiar que lhe apoiava em seus projetos e ambições, dê um sim",
        options: [
          { answer: "Sim", value: 1, answerId: "yes" },
          { answer: "Não", value: 0, answerId: "no" },
        ],
      },
      {
        id: "004",
        question: "Você pode entrar e cursa ou concluiu o ensino superior?",
        options: [
          { answer: "Cursando", value: 1, answerId: "yes-1" },
          { answer: "Conclui", value: 2, answerId: "yes-2" },
          { answer: "Não ingressei", value: -1, answerId: "no" },
        ],
      },
      {
        id: "005",
        question: "Se sua orientação sexual é usada como xingamento, de um sim",
        options: [
          { answer: "Sim", value: -1, answerId: "yes" },
          { answer: "Não", value: 1, answerId: "no" },
        ],
      },
      {
        id: "006",
        question: "Se seguranças de estabelecimentos comerciais lhe seguem, dê um sim.",
        options: [
          { answer: "Sim", value: -1, answerId: "yes" },
          { answer: "Não", value: 1, answerId: "no" },
        ],
      },
      {
        id: "007",
        question: "Se seu comportamento (e, em especial, seus erros) são atribuídos ao seu gênero, dê um sim",
        options: [
          { answer: "Sim", value: -1, answerId: "yes" },
          { answer: "Não", value: 1, answerId: "no" },
        ],
      },
      {
        id: "008",
        question: "Se demonstra afeto por seu companheiro ou companheira em público sem medo de ridicularização ou violência, dê um sim",
        options: [
          { answer: "Sim", value: 1, answerId: "yes" },
          { answer: "Não", value: -1, answerId: "no" },
        ],
      },
    ];

    //when the api is off, i get info from local
    if(!apiMockWalkingQuestions){
      let localWalkingQuestions = localStorage.getItem(questionsStorageKeyName);

      if(!localWalkingQuestions){
        return [];
      }
      return JSON.parse(localWalkingQuestions);
    }

    localStorage.setItem(questionsStorageKeyName, JSON.stringify(apiMockWalkingQuestions));
    return apiMockWalkingQuestions;
  }

  updateQuestionAnwser = (groupId, userId, questionId, anwserId, mockAditionalUserAnswers = false) => {
    const answersQuestionsKeyName = `answerQuestions-${groupId}`;
    const anwsersData = {
      groupId,
      userId,
      questionId,
      anwserId
    };
    let answers = localStorage.getItem(answersQuestionsKeyName);

    if(!answers){
      localStorage.setItem(answersQuestionsKeyName, JSON.stringify([anwsersData]));
    }
    else{

      answers = (JSON.parse(answers)).filter((answer) => {
        const matcing =
          answer.questionId === anwsersData.questionId &&
          answer.userId === anwsersData.userId &&
          answer.groupId === anwsersData.groupId;
        return !matcing;
      });

      answers.push(anwsersData);
      localStorage.setItem(answersQuestionsKeyName, JSON.stringify(answers));
    }

    if(mockAditionalUserAnswers){
      const usersId = JSON.parse(
        sessionStorage.getItem(`walkingUsers-${groupId}`)
      )
        .filter((user) => user.userId !== userId)
        .map((user) => user.userId);
      this.addMockAnswersToUsers(groupId, usersId, questionId)
    }
  }
  
  getQuestionsAnswers = (groupId, userId) => {
    const answersQuestionsKeyName = `answerQuestions-${groupId}`;
    let answers = localStorage.getItem(answersQuestionsKeyName);
    return JSON.parse(answers);
  }

  addMockAnswersToUsers = (groupId, usersId=[], questionId) => {

    const questions = JSON.parse(
      sessionStorage.getItem(`walkingQuestions-${groupId}`)
    );
    const questionOptions = questions.filter((q) => q.id === questionId)[0]
      .options;

    usersId.forEach(userId => {
      const anwserId =
        questionOptions[Math.floor(Math.random() * questionOptions.length)]
          .answerId;

      this.updateQuestionAnwser(groupId, userId, questionId, anwserId)
    });

    
  }

}

export default new WalkingService();