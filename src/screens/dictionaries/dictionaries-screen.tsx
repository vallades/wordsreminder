import React from 'react'
import { firestore } from 'react-native-firebase'
import { DICTIONARIES } from '@constants/database'
import { DICTIONARIES_CREATE_SCREEN } from '@constants/screens'
import { DictionaryRow } from '@dictionaries/dictionary-row'
import { documentSnapshotToDictionary } from '@models/dictionary'
import { FiltrableList } from '@components/list/filtrable-list'
import { DICTIONARIES_SCREEN, DICTIONARIES_ROW } from '@e2e/ids'
import { FilterOpenButton } from '@components/filter-open-button'
import { PARAM_HAS_FILTER_ENABLED } from '@constants/navigation-parameters'

type Dictionary = import('@models/dictionary').Dictionary
type Query = import('react-native-firebase/firestore').Query
type NavigationScreenOptions = import('react-navigation').NavigationScreenOptions
type NavigationScreenProps = import('react-navigation').NavigationScreenProps
type NavigationScreenProp = import('react-navigation').NavigationScreenProp<{}>

type Props = NavigationScreenProps

class DictionariesScreen extends React.Component<Props> {
  static navigationOptions = ({
    navigation,
  }: {
    navigation: NavigationScreenProp
  }): NavigationScreenOptions => {
    const { params } = navigation.state
    const options: NavigationScreenOptions = {
      title: 'Dictionaries',
    }

    const hasFilterEnabled = navigation.getParam(PARAM_HAS_FILTER_ENABLED)
    if (params && hasFilterEnabled) {
      return {
        ...options,
        // Remove the header to make space for the search bar.
        header: null,
      }
    }

    const onOpenFilterPress = () =>
      navigation.setParams({ [PARAM_HAS_FILTER_ENABLED]: true })
    return {
      ...options,
      headerRight: <FilterOpenButton onPress={onOpenFilterPress} />,
    }
  }

  query: Query = firestore()
    .collection(DICTIONARIES)
    .orderBy('updatedAt', 'desc')

  filterDictionaries(filter: string, dictionary: Dictionary) {
    return dictionary.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
  }

  handleAddDictionaryPress = () => {
    this.props.navigation.push(DICTIONARIES_CREATE_SCREEN)
  }

  renderDictionary = ({ item }: { item: Dictionary }) => {
    return (
      <DictionaryRow
        dictionary={item}
        navigation={this.props.navigation}
        testID={DICTIONARIES_ROW(item.id)}
      />
    )
  }

  render() {
    return (
      <FiltrableList
        query={this.query}
        renderItem={this.renderDictionary}
        documentSnapshotToEntity={documentSnapshotToDictionary}
        onAddPress={this.handleAddDictionaryPress}
        emptyListMessage="Press the add button to add a new dictionary."
        testID={DICTIONARIES_SCREEN}
        navigation={this.props.navigation}
        filterEntities={this.filterDictionaries}
      />
    )
  }
}

export { DictionariesScreen }
