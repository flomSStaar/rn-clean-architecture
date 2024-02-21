import { UserDataContract } from '@services/users/UserDataContract'
import { MockUserProvider } from '@services/users/MockUserProvider'

export const userProvider: UserDataContract = new MockUserProvider()
