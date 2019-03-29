import { Entity } from '@models/entity'

type DocumentSnapshot = import('react-native-firebase/firestore').DocumentSnapshot

export interface Dictionary extends Entity {
  name: string
  words: string[]
}

export const documentSnapshotToDictionary = (snap: DocumentSnapshot) => {
  const dictionary = snap.data() as Dictionary
  dictionary.id = snap.id!

  return dictionary
}
