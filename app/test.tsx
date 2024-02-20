import { Text, View } from 'react-native'
import { Link } from 'expo-router'

function Test() {
  return (
    <View>
      <Text>Test</Text>
      <Link href="/">Home</Link>
    </View>
  )
}

export default Test
