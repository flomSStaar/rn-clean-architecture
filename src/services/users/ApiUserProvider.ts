import { NewUser } from '@model/users/NewUser'
import { User } from '@model/users/User'
import { UserDataContract } from '@services/users/UserDataContract'

interface FetchedUser {
  id: number
  name: string
  username: string
  email: string
}

export class ApiUserProvider extends UserDataContract {
  async getAll(): Promise<User[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const json = (await response.json()) as FetchedUser[]

    const users = json.map(u => new User(u.id, u.name, u.username, u.email))

    return [...users]
  }

  async getById(id: number): Promise<User | null> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const json = (await response.json()) as FetchedUser

    const user = new User(json.id, json.name, json.username, json.email)

    return user
  }

  async create(user: NewUser): Promise<void> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        name: user.name,
        username: user.username,
        email: user.email,
      }),
    })

    console.log('ApiUserProvider:create', response.status)
    this.onChange()
  }

  async delete(id: number): Promise<boolean> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })

    console.log('ApiUserProvider:delete', response.status)
    this.onChange()

    return response.ok
  }
}
