import {
  APIHeaders,
  ProtoHeaders,
  APIHeadersForMultipartFormData,
} from './globalConstants';
import LocalDb from './localStroage';

export class API {
  static token = null;

  static user = null;

  constructor() {
    API.token = null;
    API.user = null;
    this.setToken();
  }

  setToken() {
    const response = LocalDb.getSessions();
    if (response !== null) {
      API.token = response.token;
      API.user = response.user;
    }
  }

  removeTokens() {
    API.token = null;
    API.user = null;
  }

  resetToken() {
    this.removeTokens();
    this.setToken();
  }

  processResponse(response, callback) {
    response
      .json()
      .then(parsedResponse => {
        if (parsedResponse.error) {
          const error = {
            error: true,
            msg: parsedResponse.msg,
            errorCode: parsedResponse.errorCode,
          };
          callback(null, error);
        } else {
          callback(parsedResponse, null);
        }
      })
      .catch(() => {
        callback(null, 'Exception on server');
      });
  }

  user() {
    return API.user;
  }

  headers() {
    return { ...APIHeaders };
  }

  authHeaders() {
    return { ...APIHeaders, Authorization: API.token };
  }

  authProtoHeader() {
    return { ...ProtoHeaders, Authorization: API.token };
  }

  authHeadersForMultipartFormData() {
    return { ...APIHeadersForMultipartFormData, Authorization: API.token };
  }
}

export default new API();
