<script setup lang="ts">
import { ref } from 'vue'
import { transparentLogo } from '../utils/logo'
import { routeHref } from '../utils/routes'
const logoSrc = ref('')
transparentLogo.then((src) => { logoSrc.value = src })
</script>

<template>
  <div>
    <section class="mx-auto grid min-h-[calc(100svh-72px)] max-w-6xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-24">
      <div>
        <div class="mb-6 flex flex-wrap gap-2" aria-label="Areas of focus">
          <span class="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs font-medium text-emerald-200 sm:text-sm"><span class="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true"></span>Full-Stack Engineer</span>
          <span class="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 sm:text-sm">Scripting &amp; Automation</span>
          <span class="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 sm:text-sm">Database Architecture</span>
        </div>
        <h1 class="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">Okwu Prosper<span class="text-emerald-400">.</span></h1>
        <p class="mt-5 text-xl font-medium tracking-tight text-zinc-200 sm:text-2xl lg:text-3xl">Full-Stack Developer <span class="px-1 text-emerald-400" aria-hidden="true">/</span> <span class="text-emerald-300">JavaScript Specialist</span></p>
        <p class="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">I build custom, high-performance web and mobile solutions that help startups connect with their customers and teams. Using technologies like Vue 3, TypeScript, JavaScript, Tailwind CSS, and Supabase, I turn ideas into practical digital products. I’m currently developing Bigwrapes Pixel, a platform where student entrepreneurs can showcase their businesses and reach more customers.</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a :href="routeHref('/projects')" class="rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300">See my projects <span aria-hidden="true">→</span></a>
          <a :href="routeHref('/contact')" class="rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-400/60 hover:text-emerald-300">Let's talk</a>
        </div>
        <p class="mt-7 text-sm text-zinc-500">Open to collaborations, freelance projects, teaching opportunities, and career opportunities.</p>
      </div>
      <div class="relative mx-auto flex w-full max-w-sm items-center justify-center py-6">
        <div class="absolute inset-8 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden="true"></div>
        <div class="relative flex aspect-square w-full items-center justify-center rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-2xl shadow-black/40">
          <div class="absolute inset-4 rounded-[1.5rem] border border-white/5" aria-hidden="true"></div>
          <img v-if="logoSrc" :src="logoSrc" alt="Wraps Code logo" class="logo-float relative h-48 w-48 object-contain sm:h-60 sm:w-60" />
          <div class="absolute bottom-5 left-5 rounded-xl border border-white/10 bg-zinc-950/85 px-4 py-3 shadow-xl backdrop-blur">
            <p class="text-xs text-zinc-500">Currently building</p>
            <p class="mt-1 text-sm font-medium text-zinc-100">Bigwrapes Pixel</p>
          </div>
          <span class="absolute right-5 top-5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300">Web · Mobile</span>
        </div>
      </div>
    </section>

    <section class="border-y border-white/10 bg-zinc-900/30">
      <div class="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-6">
  <div>
  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">Core Expertise</p>
  <p class="mt-2 text-sm leading-6 text-zinc-300">Engineering scalable web ecosystems and production-ready applications.</p>
</div>

<div>
  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">Focus Areas</p>
  <p class="mt-2 text-sm leading-6 text-zinc-300">Advanced architectural frontend performance and cross-platform mobile development.</p>
</div>

<div>
  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">Product Philosophy</p>
  <p class="mt-2 text-sm leading-6 text-zinc-300">Delivering high-utility digital assets, seamless UX details, and measurable performance optimization.</p>
</div>

      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-24">
      <p class="section-kicker">A little about me</p>
      <div class="mt-4 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <h2 class="section-title">Curious by nature.<br />A Developer with Creativity.</h2>
        <div class="space-y-4 text-sm leading-7 text-zinc-400 sm:text-base">
          <p>I’m passionate about connecting businesses with their customers and teams. As a full-stack developer, I build custom web and mobile solutions for startups, taking ideas from concept to polished, user-friendly products.</p>
          <p>I’m currently developing Bigwrapes Pixel, a platform that helps student entrepreneurs showcase their businesses and reach potential customers. My work includes projects built with Vue 3, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Supabase, React Native, and Expo.</p>
          <a :href="routeHref('/projects')" class="inline-flex items-center gap-2 pt-2 text-sm font-medium text-emerald-300 hover:text-emerald-200">Explore the projects <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  </div>
</template>
