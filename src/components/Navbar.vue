<script setup lang="ts">
import { ref } from 'vue'
import { transparentLogo } from '../utils/logo'

defineProps<{ currentPath: string }>()

const menuOpen = ref(false)
const logoSrc = ref('')
transparentLogo.then((src) => { logoSrc.value = src })
const links = [
  { label: 'About', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6" aria-label="Main navigation">
      <a href="/" class="flex items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400" aria-label="Wraps Code by Okw Prosper, About page">
        <img v-if="logoSrc" :src="logoSrc" alt="" class="h-10 w-10 object-contain" />
        <span class="flex flex-col leading-tight"><span class="text-sm font-semibold tracking-tight text-white sm:text-base">Wraps Code<span class="text-emerald-400">.</span></span><span class="mt-1 text-[10px] text-zinc-500">by Okw Prosper</span></span>
      </a>
      <div class="hidden items-center gap-8 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="relative rounded-lg px-3.5 py-2.5 text-sm transition-colors duration-200 hover:bg-emerald-400/10 hover:text-emerald-300 focus-visible:bg-emerald-400/10"
          :class="currentPath === link.href ? 'bg-emerald-400/10 text-emerald-300' : 'text-zinc-400'"
          :aria-current="currentPath === link.href ? 'page' : undefined"
        >
          {{ link.label }}
          <span v-if="currentPath === link.href" class="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-emerald-400" aria-hidden="true"></span>
        </a>
        <a href="/contact" class="rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">Let's talk</a>
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
          :class="currentPath === link.href ? 'border-emerald-400 bg-emerald-400/10 font-medium text-emerald-200' : 'border-transparent text-zinc-300'"
          :aria-current="currentPath === link.href ? 'page' : undefined"
          @click="menuOpen = false"
        >{{ link.label }}</a>
      </div>
    </div>
  </header>
</template>
