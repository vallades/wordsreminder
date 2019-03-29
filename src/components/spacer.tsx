import React from 'react'
import { View } from 'react-native'

type Props = {
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  marginBottom?: number
  children: import('react').ReactNode
}

const Spacer = ({
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  children,
}: Props) => (
  <View style={{ marginBottom, marginLeft, marginRight, marginTop }}>
    {children}
  </View>
)

export { Spacer }
