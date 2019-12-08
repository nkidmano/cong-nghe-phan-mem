const user = 'currentUser'

export default class StorageService {
  public static getCurrentUser(): string | null {
    return localStorage.getItem(user)
  }

  public static setCurrentUser(currentUser: string) {
    localStorage.setItem(user, currentUser)
  }

  public static removeCurrentUser() {
    localStorage.removeItem(user)
  }
}
