import { User } from '@model/users/User'
import { NewUser } from '@model/users/NewUser'
import { ContractObserver } from '@utils/ContractObserver'

export abstract class UserDataContract extends ContractObserver {
  abstract getAll(): Promise<User[]>

  abstract getById(id: number): Promise<User | null>

  abstract create(user: NewUser): Promise<void>

  abstract delete(id: number): Promise<boolean>
}
