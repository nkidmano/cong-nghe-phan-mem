import firebase from 'firebase/app'
import 'firebase/firestore'
import { Todo } from '@/models'

export class FirestoreService {
  private static db = firebase.firestore()

  public static async getTodos(): Promise<Todo[]> {
    const querySnapshot = await this.db.collection('todos').get()
    return querySnapshot.docs.map((doc) => doc.data()) as Todo[]
  }

  public static async addTodo(todo: Todo): Promise<void> {
    try {
      this.db.collection('todos').add(todo)
    } catch (error) {
      return Promise.reject('Unexpected error, please try again later')
    }
  }
}
