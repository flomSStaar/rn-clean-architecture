import { UserDataContract } from '@services/users/UserDataContract'
import { ApiUserProvider } from '@services/users/ApiUserProvider'

export class Manager {
  private _userProvider: UserDataContract = new ApiUserProvider()

  get userProvider(): UserDataContract {
    return this._userProvider
  }

  set userProvider(value: UserDataContract) {
    this._userProvider = value
  }
}

export const manager = new Manager()
