<script setup lang="ts">
import ProjectCard from '../components/projectCard.vue'

const projects = [
  {
    title: 'Bigwrapes Pixel',
    description: 'A student-business showcase platform where entrepreneurs can present their businesses and customers can discover their products.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Supabase'],
    status: 'Built',
    link: 'https://bigwrapes-pixel.online/',
  },
  {
    title: 'Bigwrapes Pixel Mobile App',
    description: 'A mobile app version of the student-business showcase, planned with additional features. Currently in progress.',
    technologies: ['React Native', 'Expo', 'TypeScript'],
    status: 'In progress',
  },
  {
    title: 'Expense Tracker',
    description: 'A personal finance app concept for recording expenses, tracking balances, and organizing spending.',
    technologies: ['JavaScript', 'Tailwind CSS'],
    status: 'Learning concept',
  },
]
const skills = ['Vue 3', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Supabase', 'React Native', 'Expo']
</script>

<template>
  <div class="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
    <header class="max-w-3xl">
      <p class="section-kicker">Wraps Code · selected work</p>
      <h1 class="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Projects I've worked on</h1>
      <p class="mt-5 text-base leading-7 text-zinc-400">A selection of projects and experiments I've worked on, including Bigwrapes Pixel and ideas that are still in progress.</p>
    </header>
    <section class="mt-12" aria-labelledby="projects-heading">
      <h2 id="projects-heading" class="sr-only">Project list</h2>
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard v-for="project in projects" :key="project.title" v-bind="project" />
      </div>
    </section>
    <section class="mt-20 border-t border-white/10 pt-12" aria-labelledby="skills-heading">
      <p class="section-kicker">Tools &amp; technologies</p>
      <h2 id="skills-heading" class="mt-3 text-2xl font-semibold text-white">What I'm working with</h2>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">These are technologies I've used in my projects or am actively learning.</p>
      <ul class="mt-6 flex flex-wrap gap-2.5">
        <li v-for="skill in skills" :key="skill" class="rounded-lg border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-300">{{ skill }}</li>
      </ul>
    </section>
  </div>
</template>
