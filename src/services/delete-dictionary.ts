import { firestore } from 'react-native-firebase'
import { WORDS, DICTIONARIES } from '@constants/database'
import { getErrorMessageFromFirestoreError } from '@utils/get-error-message-from-firestore-error'

type Dictionary = import('@models/dictionary').Dictionary

export const deleteDictionary = async (dictionary: Dictionary) => {
  try {
    const words = firestore().collection(WORDS)
    for (const wordId of dictionary.words) {
      await words.doc(wordId).delete()
    }
    await firestore()
      .collection(DICTIONARIES)
      .doc(dictionary.id)
      .delete()
  } catch (error) {
    throw new Error(getErrorMessageFromFirestoreError(error))
  }
}
