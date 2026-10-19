<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import ContactPage from './pages/ContactPage.vue'
import AboutPage from './pages/AboutPage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import ChatWidget from './components/ChatWidget.vue'

const currentPath = ref(window.location.pathname.replace(/\/$/, '') || '/')
const titles: Record<string, string> = {
  '/': 'About',
  '/projects': 'Projects',
  '/contact': 'Contact',
}
const descriptions: Record<string, string> = {
  '/': "I'm Okw Prosper of Wraps Code, building useful web products and learning through projects like Bigwrapes Pixel.",
  '/projects': "Explore projects and experiments by Okw Prosper of Wraps Code.",
  '/contact': "Get in touch with Okw Prosper of Wraps Code about projects and collaborations.",
}

function updateMetadata(path: string) {
  document.title = `${titles[path] || 'About'} | Wraps Code by Okw Prosper`
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (description) description.content = descriptions[path] || descriptions['/']
}

function onPopState() {
  currentPath.value = window.location.pathname.replace(/\/$/, '') || '/'
  updateMetadata(currentPath.value)
}

function onNavigate(event: MouseEvent) {
  const anchor = (event.target as HTMLElement).closest('a')
  if (!anchor || anchor.target === '_blank' || anchor.origin !== window.location.origin) return
  const path = anchor.pathname.replace(/\/$/, '') || '/'
  if (!titles[path]) return
  event.preventDefault()
  window.history.pushState({}, '', path)
  currentPath.value = path
  updateMetadata(path)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  updateMetadata(currentPath.value)
  document.addEventListener('click', onNavigate)
  window.addEventListener('popstate', onPopState)
})
onUnmounted(() => {
  document.removeEventListener('click', onNavigate)
  window.removeEventListener('popstate', onPopState)
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-zinc-100">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <Navbar :current-path="currentPath" />
    <main id="main-content" tabindex="-1">
      <AboutPage v-if="currentPath === '/'" />
      <ProjectsPage v-else-if="currentPath === '/projects'" />
      <ContactPage v-else-if="currentPath === '/contact'" />
      <AboutPage v-else />
    </main>
    <footer class="border-t border-white/10 px-6 py-7 text-center text-sm text-zinc-500">
      © {{ new Date().getFullYear() }} Wraps Code   · Built with Creativity.
    </footer>
    <ChatWidget />
  </div>
</template>
