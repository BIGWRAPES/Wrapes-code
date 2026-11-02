<script setup lang="ts">
import { ref } from 'vue'
import { transparentLogo } from '../utils/logo'
import { routeHref } from '../utils/routes'

defineProps<{ currentPath: string }>()

const menuOpen = ref(false)
const resumeDialog = ref<HTMLDialogElement | null>(null)
const logoSrc = ref('')
transparentLogo.then((src) => { logoSrc.value = src })
const links = [
  { label: 'About', path: '/', href: routeHref('/') },
  { label: 'Projects', path: '/projects', href: routeHref('/projects') },
  { label: 'Contact', path: '/contact', href: routeHref('/contact') },
]
const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`

function openResumeDialog() {
  resumeDialog.value?.showModal()
}

function closeResumeDialog() {
  resumeDialog.value?.close()
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6" aria-label="Main navigation">
      <a :href="routeHref('/')" class="flex items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400" aria-label="Wraps Code by Okw Prosper, About page">
        <img v-if="logoSrc" :src="logoSrc" alt="" class="h-10 w-10 object-contain" />
        <span class="flex flex-col leading-tight"><span class="text-sm font-semibold tracking-tight text-white sm:text-base">Wraps Code<span class="text-emerald-400">.</span></span><span class="mt-1 text-[10px] text-zinc-500">by Okw Prosper</span></span>
      </a>
      <div class="hidden items-center gap-8 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="relative rounded-lg px-3.5 py-2.5 text-sm transition-colors duration-200 hover:bg-emerald-400/10 hover:text-emerald-300 focus-visible:bg-emerald-400/10"
          :class="currentPath === link.path ? 'bg-emerald-400/10 text-emerald-300' : 'text-zinc-400'"
          :aria-current="currentPath === link.path ? 'page' : undefined"
        >
          {{ link.label }}
          <span v-if="currentPath === link.href" class="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-emerald-400" aria-hidden="true"></span>
        </a>
        <button type="button" class="rounded-lg border border-emerald-400/40 px-4 py-2.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300" @click="openResumeDialog">Resume</button>
        <a :href="routeHref('/contact')" class="rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">Let's talk</a>
      </div>
      <button type="button" class="rounded-lg border border-white/15 px-3 py-2 text-sm text-zinc-200 md:hidden" :aria-expanded="menuOpen" aria-controls="mobile-menu" @click="menuOpen = !menuOpen">
        <span class="sr-only">{{ menuOpen ? 'Close' : 'Open' }} navigation menu</span>
        <span aria-hidden="true">{{ menuOpen ? 'Close' : 'Menu' }}</span>
      </button>
    </nav>
    <div v-if="menuOpen" id="mobile-menu" class="border-t border-white/10 px-5 py-4 md:hidden">
      <div class="mx-auto flex max-w-6xl flex-col gap-1">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-lg border-l-2 px-3 py-3 text-sm transition-colors hover:bg-emerald-400/10 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
          :class="currentPath === link.path ? 'border-emerald-400 bg-emerald-400/10 font-medium text-emerald-200' : 'border-transparent text-zinc-300'"
          :aria-current="currentPath === link.path ? 'page' : undefined"
          @click="menuOpen = false"
        >{{ link.label }}</a>
        <button type="button" class="rounded-lg border-l-2 border-transparent px-3 py-3 text-left text-sm text-emerald-200 transition hover:bg-emerald-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400" @click="openResumeDialog">Resume</button>
      </div>
    </div>
    <dialog
      ref="resumeDialog"
      aria-labelledby="resume-dialog-title"
      aria-describedby="resume-dialog-description"
      class="m-auto w-[min(24rem,calc(100vw-2rem))] rounded-2xl border border-white/10 bg-zinc-900 p-6 text-zinc-100 shadow-2xl shadow-black/60 backdrop:bg-black/70"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 id="resume-dialog-title" class="text-lg font-semibold text-white">Resume</h2>
          <p id="resume-dialog-description" class="mt-1 text-sm leading-6 text-zinc-400">Would you like to view the resume or download a copy?</p>
        </div>
        <button type="button" class="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400" aria-label="Close resume options" @click="closeResumeDialog">✕</button>
      </div>
      <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <a
          :href="resumeHref"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:border-emerald-400/60 hover:text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
          @click="closeResumeDialog"
        >View resume</a>
        <a
          :href="resumeHref"
          download="Okwu-Prosper-Resume.pdf"
          class="rounded-lg bg-emerald-400 px-4 py-2.5 text-center text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
          @click="closeResumeDialog"
        >Download resume</a>
      </div>
    </dialog>
  </header>
</template>
