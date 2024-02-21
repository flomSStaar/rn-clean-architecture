import uuid from 'react-native-uuid'

export abstract class ContractObserver {
  private listeners: Map<string, () => void> = new Map()

  onChange() {
    for (const entry of this.listeners.entries()) {
      console.log('onChange:', entry[0])
      entry[1]?.()
    }
  }

  register(func: () => void): string {
    const registerId = uuid.v4().toString()
    this.listeners.set(registerId, func)

    return registerId
  }

  unregister(registerId: string): void {
    this.listeners.delete(registerId)
  }
}
