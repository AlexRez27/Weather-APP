import { ref } from 'vue'

export const useToggle = (initialValue = false) => {
  const toggle = ref(initialValue)

  const showToggle = () => {
    toggle.value = true
  }

  const hideToggle = () => {
    toggle.value = false
  }
  return { toggle, showToggle, hideToggle }
}
