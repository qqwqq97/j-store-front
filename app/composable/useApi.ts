// composables/useApi.ts
import { useRuntimeConfig } from '#app'

export function useApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:8000'

  // CSRF 토큰 확보
  const getCsrf = async () => {
    await $fetch(`${baseURL}/sanctum/csrf-cookie`, {
      credentials: 'include',
    })
  }

  // 쿠키에서 XSRF-TOKEN 추출
  const getXsrfToken = () => {
    if(process.client) {
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
      return match ? decodeURIComponent(match[1]) : null
    }
    return null
  }

  // API 요청 
  const apiFetch = async <T = any>(
    url: string,
    options: any = {}
  ): Promise<T> => {
    if (process.client && !getXsrfToken()) {
      await getCsrf()
    }
    const token = getXsrfToken()

    return await $fetch<T>(`${baseURL}${url}`, {
      credentials: 'include',
      headers: {
        ...options.headers,
        ...(token && { 'X-XSRF-TOKEN': token }), // 토큰 헤더 추가!
      },
      ...options,
    })
  }

  return { apiFetch, getCsrf }
}
