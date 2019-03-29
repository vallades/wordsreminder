import { firestore } from 'react-native-firebase'
import { DICTIONARIES, WORDS } from '@constants/database'
import { getErrorMessageFromFirestoreError } from '@utils/get-error-message-from-firestore-error'

type Word = import('@models/word').Word
type QuerySnapshot = import('react-native-firebase/firestore').QuerySnapshot

export const deleteWord = async (word: Word) => {
  try {
    const snapshot: QuerySnapshot = await firestore()
      .collection(DICTIONARIES)
      .where('words', 'array-contains', word.id)
      .get()

    for (const dictionary of snapshot.docs) {
      await firestore()
        .collection(DICTIONARIES)
        .doc(dictionary.id!)
        .update({
          words: firestore.FieldValue.arrayRemove(word.id),
        })
    }

    await firestore()
      .collection(WORDS)
      .doc(word.id)
      .delete()
  } catch (error) {
    throw new Error(getErrorMessageFromFirestoreError(error))
  }
}
