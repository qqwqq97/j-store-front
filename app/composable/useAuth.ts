import { useApi } from '~/composable/useApi';
import { computed } from 'vue';

// 로그인 상태를 전역으로 관리
export const useAuth = () => {
  const { apiFetch } = useApi();
  // Nuxt전역 상태(global state)를 만드는 코드
  // 'user' 상태의 이름(key)
  // () => null 초기값
  // 반환값 Ref객체
  // user.value // 로그인한 유저 정보 혹은 null
  const user = useState('user', () => null);
  // user가 있으면 true, 없으면 false
  const loggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    try {
      const res = await apiFetch('/api/me', {
        method: "GET",
      });
      user.value = res.user
    } catch {
      user.value = null
    }
  }

  const logout = async() => {
    try{
      const res = await apiFetch('/api/logout', {
        method: "POST",
      });
      if(res.message === 'success') {
        user.value = null
      }
    } catch (error) {
      if(error.message) {
        alert(error.message);
      } else {
        alert('서버와 통신 중 오류가 발생했습니다.');
      }
    }
  }

  return {
    user,
    loggedIn,
    fetchUser,
    logout
  }
}