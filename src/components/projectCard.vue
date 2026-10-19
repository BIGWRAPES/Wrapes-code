<script setup lang="ts">
defineProps<{
  title: string
  description: string
  technologies: string[]
  status: string
  link?: string
}>()
</script>

<template>
  <article class="group flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-900/55 p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/35 hover:bg-zinc-900/90">
    <div class="mb-5 flex items-center justify-between gap-3">
      <div class="rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-3 text-emerald-300" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/></svg>
      </div>
      <span class="rounded-full border border-white/10 bg-zinc-950 px-3 py-1 text-xs text-zinc-300">{{ status }}</span>
    </div>
    <h2 class="text-xl font-semibold tracking-tight text-white">{{ title }}</h2>
    <p class="mt-3 flex-1 text-sm leading-6 text-zinc-400">{{ description }}</p>
    <ul class="mt-5 flex flex-wrap gap-2" :aria-label="`${title} technologies`">
      <li v-for="technology in technologies" :key="technology" class="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-300">{{ technology }}</li>
    </ul>
    <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-emerald-200">
      Visit project <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>
    </a>
  </article>
</template>
