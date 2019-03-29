import React from 'react'
import { Text as RNText } from 'react-native'
import { ThemeContext } from '@contexts/theme-context'

type Props = import('react-native').TextProps & {
  color?: keyof import('@contexts/theme-context').Theme
  fontSize?: number
  fontWeight?: 'normal' | 'bold'
  children: string
}

const Text = ({
  onPress,
  color = 'primary025',
  fontSize = 16,
  fontWeight,
  children,
  style,
  ...props
}: Props) => (
  <ThemeContext.Consumer>
    {({ theme }) => {
      return (
        <RNText
          style={Object.assign(
            {
              color: theme[color],
              fontSize,
              fontWeight,
            },
            style
          )}
          onPress={onPress}
          {...props}
        >
          {children}
        </RNText>
      )
    }}
  </ThemeContext.Consumer>
)

export { Text }
