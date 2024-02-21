import { User } from '@model/users/User'
import { NewUser } from '@model/users/NewUser'
import { ContractObserver } from '@utils/ContractObserver'

export abstract class UserDataContract extends ContractObserver {
  abstract getAll(): User[]

  abstract getById(id: number): User | null

  abstract create(user: NewUser): void

  abstract delete(id: number): boolean
}
