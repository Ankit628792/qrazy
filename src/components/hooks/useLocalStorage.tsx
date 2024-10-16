export const useLocalStorage = (key: string) => {
  const setItem = (value: any) => {
    try {
      if (typeof window === 'undefined') return
      window.localStorage.setItem(key, value)
    } catch (error) {
      console.error(
        `Error storing value in localStorage for key ${key}:`,
        error
      )
    }
  }

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key)
      if (!item) return null
      return item
    } catch (error) {
      console.log(error)
    }
  }

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.log(error)
    }
  }

  return { setItem, getItem, removeItem }
}
