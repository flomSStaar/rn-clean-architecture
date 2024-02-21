import { Button, ScrollView, Switch, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { Pressable } from 'expo-router/build/views/Pressable'
import { NewUser } from '@model/users/NewUser'
import { useAllUsers, useCreateUser, useDeleteUser } from '@services/users/useUsers'
import { ApiUserProvider } from '@services/users/ApiUserProvider'
import { MockUserProvider } from '@services/users/MockUserProvider'
import { useState } from 'react'
import { manager } from '@services/manager'

function Index() {
  const [mockState, setMockState] = useState<boolean>(false)
  const users = useAllUsers().sort((a, b) => b.id - a.id)
  const createUser = useCreateUser()
  const deleteUser = useDeleteUser()

  const handleAddUser = () => {
    const newUser: NewUser = new NewUser('name', 'username', 'email@gmail.com')

    createUser(newUser)
  }

  const handleDeleteUser = (id: number) => {
    return deleteUser(id)
  }

  const handleDeleteAll = async () => {
    const promises = []
    for (let i = 0; i < users.length; i++) {
      promises.push(deleteUser(users[i].id))
    }
    await Promise.all(promises)
  }

  function handleProviderChange(value: boolean) {
    manager.userProvider = value ? new MockUserProvider() : new ApiUserProvider()

    console.log('MockProvider', manager.userProvider instanceof MockUserProvider)
    setMockState(value)
  }

  return (
    <ScrollView style={{ padding: 16 }} contentContainerStyle={{ gap: 16 }}>
      <Button title="Add user" onPress={handleAddUser} />
      <Button title="Delete all" onPress={handleDeleteAll} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
        <Text>Provider: {mockState ? 'Mock' : 'API'}</Text>
        <Switch value={mockState} onValueChange={handleProviderChange} />
      </View>

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
