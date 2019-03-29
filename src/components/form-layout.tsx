import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { STATUS, STATUS_ERROR } from '@constants/statuses'
import { ErrorMessage } from '@components/error-message'
import { Spacer } from '@components/spacer'
import { MainView } from '@components/main-view'

type Props = {
  status: STATUS
  error?: string
  children: import('react').ReactNode
}

const FormLayout = ({ status, error, children }: Props) => (
  <MainView>
    <ScrollView style={styles.scrollView}>
      {status === STATUS_ERROR && (
        <Spacer marginBottom={10} marginTop={10}>
          <ErrorMessage message={error!} />
        </Spacer>
      )}
      {children}
    </ScrollView>
  </MainView>
)

type Style = {
  scrollView: import('react-native').ViewStyle
}

const styles = StyleSheet.create<Style>({
  scrollView: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
})

export { FormLayout }
