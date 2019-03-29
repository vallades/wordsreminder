import React from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  width: number
  children: import('react').ReactNode
}

const SwipeActions = ({ width, children }: Props) => {
  return <View style={[styles.actions, { width }]}>{children}</View>
}

type ViewStyle = import('react-native').ViewStyle
type Style = {
  actions: ViewStyle
}

const styles = StyleSheet.create<Style>({
  actions: { flexDirection: 'row' },
})

export { SwipeActions }
