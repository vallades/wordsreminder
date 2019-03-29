import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { ThemeContext } from '@contexts/theme-context'

type Props = {
  children: import('react').ReactNode
  testID?: string
}

const MainView = ({ testID, children }: Props) => {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <SafeAreaView
          style={[styles.container, { backgroundColor: theme.primary100 }]}
          testID={testID}
        >
          {children}
        </SafeAreaView>
      )}
    </ThemeContext.Consumer>
  )
}

type Style = {
  container: import('react-native').ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  },
})

export { MainView }
