/*
Mocked services
*/
class WalkingService {
  
  getWalkingUsers = async (walkingGroup) => {
    
    // For mock: it is a data response from an API
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

    //whe the api is off, i get info from local
    if(!apiMockUsers){
      return localStorage.getItem("walkingUsers");
    }

    for (let userIdx = 0; userIdx < apiMockUsers.length; userIdx++) {
      const user = apiMockUsers[userIdx];

      if(user.userId == sessionStorage.getItem("userId"))
      continue;
      
      apiMockUsers[userIdx] = await this.mockUserInfo(user);

    }

    return apiMockUsers;
  }

  mockUserInfo = (user) => {

    return new Promise(function (resolve, reject) {
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

}