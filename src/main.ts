import { loadData } from './data/load'
import { setupOffline } from './offline'
import './style.css'

// 데이터를 먼저 받아 채운 뒤에 앱을 불러온다. 화면 모듈들이 불러올 때부터 채워진 데이터를 쓰기 때문이다
async function start() {
  const root = document.getElementById('app')!
  root.innerHTML = '<p class="boot">일정을 불러오는 중이에요…</p>'
  try {
    await loadData()
  } catch {
    root.innerHTML = '<div class="boot"><p>일정을 불러오지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.</p>'
      + '<button class="btn solid" type="button" onclick="location.reload()">다시 시도</button></div>'
    return
  }
  const [{ createApp }, { default: App }] = await Promise.all([import('vue'), import('./App.vue')])
  root.innerHTML = ''
  createApp(App).mount(root)
  setupOffline()
}

start()
