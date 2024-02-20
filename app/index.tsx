import { Text, View } from 'react-native'
import { Link } from 'expo-router'

function Index() {
  return (
    <View>
      <Text>Index</Text>
      <Link href="/test">Test</Link>
    </View>
  )
}

export default Index
