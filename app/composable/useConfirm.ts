import { ref } from 'vue'

const isOpen = ref(false)
const message = ref('')
let resolveFn = null

export function useConfirm() {
  function openConfirm(msg: string) {
    if(isOpen.value) {
      return Promise.reject(new Error('Confirm is already open!'))
    }
    message.value = msg
    isOpen.value = true

    return new Promise((resolve)  => {
      resolveFn = (value) => {
        resolve(value)
        resolveFn = null
      }
    })
  }

  function confirm() {
    isOpen.value = false
    resolveFn?.(true)
  }

  function cancel() {
    isOpen.value = false
    resolveFn?.(false)
  }

  return {
    isOpen,
    message,
    openConfirm,
    confirm,
    cancel
  }
}
