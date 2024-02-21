import { Button, ScrollView, Text, View } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router'
import { useDeleteUser, useOneUser } from '@services/users/useUsers'

type UserDetailProps = {}

function UserDetail({}: UserDetailProps) {
  const params = useLocalSearchParams<{ id: string }>()
  const userId = Number(params.id)
  const user = useOneUser(userId)

  const deleteUser = useDeleteUser()

  const handleDeleteUser = () => {
    deleteUser(userId)
  }

  if (!user) {
    return (
      <View>
        <Text>User does not exist</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ padding: 16 }} contentContainerStyle={{ gap: 8 }}>
      <Link href="/" asChild onPress={handleDeleteUser}>
        <Button title="Delete" color="red" />
      </Link>
      <View>
        <Text>{user.id}</Text>
        <Text>{user.name}</Text>
        <Text>{user.username}</Text>
        <Text>{user.email}</Text>
      </View>
    </ScrollView>
  )
}

export default UserDetail
