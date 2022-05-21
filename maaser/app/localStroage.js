export class LocalDb {
  static isLogin;

  constructor() {
    this.sessionKey = 'masserSession';
  }

  getSessions() {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot !== null) {
      return JSON.parse(itemGot);
    }
    return null;
  }

  setSessions(session, callback) {
    try {
      localStorage.setItem(this.sessionKey, JSON.stringify(session), error =>
        callback(error),
      );
      callback(false);
    } catch (error) {}
  }

  removeSession(callback) {
    try {
      localStorage.removeItem(this.sessionKey, error => callback(error));
    } catch (error) {}
  }

  saveInLocalDB(key, dataToSave, callback) {
    try {
      localStorage.setItem(key, JSON.stringify(dataToSave), error =>
        callback(error),
      );
      callback(false);
    } catch (error) {}
  }

  getSavedItemFromDB(key) {
    const itemGot = localStorage.getItem(key);
    if (itemGot !== null) {
      return JSON.parse(itemGot);
    }
    return null;
  }

  isLogin = () => !!localStorage.getItem(this.sessionKey);

  // account id
  accountId() {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot !== null) {
      const session = JSON.parse(itemGot);
      if (session.loginaccount.client) {
        return session.loginaccount.client.account.accountid;
      }
      // if (session.loginaccount.employee) {
      //   return session.loginaccount.client.account.accountid;
      // }
    }
    return null;
  }

  // account type
  accountType() {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot !== null) {
      const session = JSON.parse(itemGot);
      if (session.loginaccount.client) {
        return session.loginaccount.client.account.accounttype;
      }
      // if (session.loginaccount.employee) {
      //   return session.loginaccount.client.account.accounttype;
      // }
    }
    return null;
  }

  // client id
  clientId() {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot !== null) {
      const session = JSON.parse(itemGot);
      if (session.loginaccount.client) {
        return session.loginaccount.client.clientid;
      }
      // if (session.loginaccount.employee) {
      //   return session.loginaccount.client.clientid;
      // }
    }
    return null;
  }

  // client id
  clientType() {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot !== null) {
      const session = JSON.parse(itemGot);
      if (session.loginaccount.client) {
        return session.loginaccount.client.clienttype;
      }
      // if (session.loginaccount.employee) {
      //   return session.loginaccount.client.clienttype;
      // }
    }
    return null;
  }

  // account name
  accountName() {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot !== null) {
      const session = JSON.parse(itemGot);
      if (session.loginaccount.client) {
        return session.loginaccount.client.account.fullname;
      }
      // if (session.loginaccount.employee) {
      //   return session.loginaccount.client.account.fullname;
      // }
    }
    return null;
  }

  email() {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot !== null) {
      const session = JSON.parse(itemGot);
      if (session.loginaccount.client) {
        return session.loginaccount.client.account.email;
      }
      // if (session.loginaccount.employee) {
      //   return session.loginaccount.client.account.email;
      // }
    }
    return null;
  }

  countryCode() {
    const itemGot = localStorage.getItem(this.sessionKey);
    if (itemGot !== null) {
      const session = JSON.parse(itemGot);
      if (session.loginaccount.client) {
        return session.loginaccount.client.account.countrycode;
      }
      // if (session.loginaccount.employee) {
      //   return session.loginaccount.client.account.countrycode;
      // }
    }
    return null;
  }
}

export default new LocalDb();
