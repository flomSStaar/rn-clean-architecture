import { useCallback, useEffect, useState } from 'react'
import { userProvider } from '@services/manager'
import { NewUser } from '@model/users/NewUser'

export function useAllUsers() {
  const [users, setUsers] = useState([...userProvider.getAll()])

  useEffect(() => {
    const registerId = userProvider.register(() => {
      setUsers([...userProvider.getAll()])
      console.log('cocuou')
    })

    return () => {
      userProvider.unregister(registerId)
    }
  }, [])

  return users
}

export function useOneUser(id: number) {
  const [user, setUser] = useState(userProvider.getById(id))

  useEffect(() => {
    const registerId = userProvider.register(() => {
      setUser(userProvider.getById(id))
    })

    return () => {
      userProvider.unregister(registerId)
    }
  }, [id])

  return user
}

export function useCreateUser() {
  const createUser = useCallback((newUser: NewUser) => {
    userProvider.create(newUser)
  }, [])

  return createUser
}

export function useDeleteUser() {
  const deleteUser = useCallback((id: number) => {
    userProvider.delete(id)
  }, [])

  return deleteUser
}
