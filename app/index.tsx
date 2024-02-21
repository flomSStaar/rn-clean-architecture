import { Button, ScrollView, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { Pressable } from 'expo-router/build/views/Pressable'
import { NewUser } from '@model/users/NewUser'
import { useAllUsers, useCreateUser, useDeleteUser } from '@services/users/useUsers'

function Index() {
  const users = useAllUsers().sort((a, b) => b.id - a.id)
  const createUser = useCreateUser()
  const deleteUser = useDeleteUser()

  const handleAddUser = () => {
    const newUser: NewUser = new NewUser('name', 'username', 'email@gmail.com')

    createUser(newUser)
  }

  const handleDeleteUser = (id: number) => {
    deleteUser(id)
  }

  const handleDeleteAll = () => {
    for (let i = 0; i < users.length; i++) {
      deleteUser(users[i].id)
    }
  }

  return (
    <ScrollView style={{ padding: 16 }} contentContainerStyle={{ gap: 16 }}>
      <Button title="Add user" onPress={handleAddUser} />
      <Button title="Delete all" onPress={handleDeleteAll} />
      {/* <Button title="Refresh" onPress={refresh} /> */}

      <View style={{ gap: 8 }}>
        {users.length === 0 && <Text>No users</Text>}
        {users.map(u => (
          <Link href={`/${u.id}`} key={u.id} asChild>
            <Pressable>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text>{u.id}</Text>
                  <Text>{u.name}</Text>
                  <Text>{u.username}</Text>
                  <Text>{u.email}</Text>
                </View>
                <Button title="Delete" onPress={() => handleDeleteUser(u.id)} />
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  )
}

export default Index
