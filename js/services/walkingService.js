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

      if(user.userId == sessionStorage.getItem("userId"))
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
          request.status == 200 &&
          request.response &&
          request.response.results.length > 0
        ) {
          let randUser = request.response.results[0];

          user.userId = randUser.id.value;
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
        question: "Você possui plano de saúde?",
        options: [
          { answer: "Sim", value: 1, answerId: "yes" },
          { answer: "Não", value: 0, answerId: "no" },
        ],
      },
      {
        id: "002",
        question: "Você possui ensino fundamental comleto?",
        options: [
          { answer: "Sim", value: 1, answerId: "yes" },
          { answer: "Não", value: 0, answerId: "no" },
        ],
      },
      {
        id: "003",
        question: "Você possui ensino médio comleto?",
        options: [
          { answer: "Sim", value: 1, answerId: "yes" },
          { answer: "Não", value: 0, answerId: "no" },
        ],
      },
      {
        id: "004",
        question: "Você cursa ou concluiu o ensino superior?",
        options: [
          { answer: "Curso", value: 1, answerId: "yes-1" },
          { answer: "Conclui", value: 2, answerId: "yes-2" },
          { answer: "Não ingressei", value: -1, answerid: "no" },
        ],
      },
      {
        id: "005",
        question: "Sua orientação sexual é usada como xingamento?",
        options: [
          { answer: "Sim", value: -1, answerId: "yes" },
          { answer: "Não", value: 1, answerid: "no" },
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

  updateQuestionAnwser = (groupId, userId, questionId, anwserId) => {
    const anwserdata = {
      groupId,
      userId,
      questionId,
      anwserId
    }
    console.log(anwserdata);
  }

  getQuestionAnswer = (groupId, questionId) => {

  }

}
