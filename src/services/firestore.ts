import firebase from 'firebase/app'
import 'firebase/firestore'
import { Todo } from '@/models'

export default class FirestoreService {
  private static db = firebase.firestore()

  public static getTodoCollection(): firebase.firestore.CollectionReference {
    return this.db.collection('todos')
  }

  public static addTodo(todo: Todo) {
    return this.db
      .collection('todos')
      .add(todo)
      .catch((error) => Promise.reject('Unexpected error, please try again later'))
  }
}
