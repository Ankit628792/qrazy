import { create } from 'zustand'

const countryDropdownData = [
  { id: 1, value: '1', label: 'Option 1' },
  { id: 2, value: '2', label: 'Option 2' },
  { id: 3, value: '3', label: 'Option 3' }
]

type SettingsManagementState = {
  countryDropdownData: typeof countryDropdownData
}

const useSettingsStore = create<SettingsManagementState>((set) => ({
  countryDropdownData
}))

export default useSettingsStore
