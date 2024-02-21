import { User } from '@model/users/User'
import { UserDataContract } from '@services/users/UserDataContract'
import { NewUser } from '@model/users/NewUser'

export class MockUserProvider extends UserDataContract {
  private users: User[] = [
    new User(1, 'Byron Fields', 'byron', 'byron.fields@reqres.in'),
    new User(2, 'Tobias Funke', 'tobias', 'tobias.funke@reqres.in'),
    new User(3, 'Michael Lawson', 'mike', 'michael.lawson@reqres.in'),
    new User(4, 'Lindsay Ferguson', 'lindsay', 'lindsay.ferguson@reqres.in'),
  ]

  private nextId: number = 5

  getAll(): User[] {
    return this.users
  }

  getById(id: number): User | null {
    return this.users.find(u => u.id === id) ?? null
  }

  create(newUser: NewUser): void {
    const userId = this.nextId
    this.nextId += 1
    const user = new User(userId, newUser.name + userId, newUser.username + userId, userId + newUser.email)

    this.users.push(user)
    console.log('MockUserProvider:create', user)

    this.onChange()
  }

  delete(id: number): boolean {
    const userIndex = this.users.findIndex(u => u.id === id)

    if (userIndex < 0) {
      return false
    }

    const deletedUser = this.users.splice(userIndex, 1)
    console.log('MockUserProvider:delete', deletedUser)

    this.onChange()
    return true
  }
}
