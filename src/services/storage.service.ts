const token = 'token';

export default class StorageService {
  public static getToken(): string | null {
    return window.localStorage.getItem(token);
  }

  public static setToken(aToken: string) {
    window.localStorage.setItem(token, aToken);
  }

  public static destroyToken() {
    window.localStorage.removeItem(token);
  }
}
