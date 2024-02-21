import { useCallback, useEffect, useState } from 'react'
import { NewUser } from '@model/users/NewUser'
import { User } from '@model/users/User'
import { manager } from '@services/manager'

export function useAllUsers(): User[] {
  const [users, setUsers] = useState<User[]>([])
  const { userProvider } = manager

  useEffect(() => {
    const registerId = userProvider.register(() => {
      userProvider.getAll().then(result => {
        setUsers([...result])
      })
    })

    userProvider.getAll().then(result => {
      setUsers([...result])
    })

    return () => {
      userProvider.unregister(registerId)
    }
  }, [userProvider])

  return users
}

export function useOneUser(id: number): User | null {
  const [user, setUser] = useState<User | null>(null)
  const { userProvider } = manager

  useEffect(() => {
    const registerId = userProvider.register(() => {
      userProvider.getById(id).then(result => {
        setUser(result)
      })
    })

    userProvider.getById(id).then(result => {
      setUser(result)
    })

    return () => {
      userProvider.unregister(registerId)
    }
  }, [id, userProvider])

  return user
}

export function useCreateUser() {
  const { userProvider } = manager

  const createUser = useCallback(
    (newUser: NewUser) => {
      return userProvider.create(newUser)
    },
    [userProvider],
  )

  return createUser
}

export function useDeleteUser() {
  const { userProvider } = manager

  const deleteUser = useCallback(
    (id: number) => {
      return userProvider.delete(id)
    },
    [userProvider],
  )

  return deleteUser
}
