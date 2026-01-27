// 전역 미들웨어
// 파일이름에 .global붙으면 nuxt가 자동으로 전역 미들웨어라고 인식함
// 프론트메모리(js메모리)는 새로고침하면 초기화. 백메모리는(세션 쿠키..)는 보존
// 초가화되면 useState로 설정한 키값도 초기화되서 user.value = null이 되어버림
// 다시 fetchUser()호출해서 user복구해야하는데 레이아웃에서만 하면 페이지 전환마다 실행 안 될수있음
// 각 페이지마다 호출할수없음 -> 중복... 최악임
// 따라서 전역미들웨어로 fetchUser자동호출되도록한다
// 모든 루트 진입시 자동 실행

import { useAuth } from '~/composable/useAuth';

export default defineNuxtRouteMiddleware(async () => {
  if(process.server) return 
  const auth = useAuth();

  if(auth.user.value !== null) return

  try {
    await auth.fetchUser()
  } catch {
    return
  }  

})