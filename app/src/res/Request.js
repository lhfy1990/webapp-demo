class Request {
  constructor() {
    this.server = 'https://0c206dc6-0d95-43a5-a62c-cd7f55e00eba.mock.pstmn.io';
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  auth(credential) {
    if (!credential) {
      return Promise.reject(new Error('Bad request. Credential is required.'));
    }
    let url = this.server + '/auth';
    let xMockResponseCode = credential && credential.password === 'valid'
      ? '200'
      : '400';
    return fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

        'x-mock-response-code': xMockResponseCode
      },
      body: JSON.stringify(credential)
    }).then(response => {
      if (!response.ok) {
        return Promise.reject(new Error('Authentication failed.'));
      }
      return response.json();
    }).then(data => {
      this.setToken(data.token);
      return Promise.resolve();
    });
  }

  register(credential) {
    if (!credential) {
      return Promise.reject(new Error('Bad request. Credential is required.'));
    }
    let url = this.server + '/register';
    let xMockResponseCode = credential && credential.password === 'valid'
      ? '200'
      : '400';
    return fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

        'x-mock-response-code': xMockResponseCode
      },
      body: JSON.stringify(credential)
    }).then(response => {
      if (!response.ok) {
        return Promise.reject(new Error('Registration failed.'));
      }
      return response.json();
    }).then(data => {
      this.setToken(data.token);
      return Promise.resolve();
    });
  }

  endSession() {
    this.setToken(undefined);
  }

  userGetByUsername(username) {
    if (!this.getToken()) {
      return Promise.reject(new Error('Auth token is missing. Please login again.'));
    }
    if (!username) {
      return Promise.reject(new Error('Bad reqest, username is required.'));
    }
    let url = this.server + '/user?username=' + username;
    return fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

        'Authorization': this.getToken()
      }
    }).then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(response.statusText));
      }
      return response.json();
    }).then(data => {
      let user = undefined;
      if (data && data[0]) {
        user = data[0];
      }
      return Promise.resolve(user);
    });
  }

  userPutById(id, body) {
    if (!this.getToken()) {
      return Promise.reject(new Error('Auth token is missing. Please login again.'));
    }
    if (!id) {
      return Promise.reject(Error('Bad reqest, id is required.'));
    }
    let url = this.server + '/user/' + id;
    return fetch(url, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.getToken()
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(response.statusText));
      }
      return Promise.resolve();
    });
  }

  login(credential) {
    return this.auth(credential).then(() => {
      return this.userGetByUsername(credential.username);
    });
  }

  signup(credential) {
    return this.register(credential).then(() => {
      return this.userGetByUsername(credential.username);
    });
  }
}

export default Request;
