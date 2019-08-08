import Taro, { Component } from 'ueact-taro-taro'
import { View, Text } from 'ueact-taro-components'
import './index.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmout () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View class='index'>
        <Text>1</Text>
      </View>
    )
  }
}

