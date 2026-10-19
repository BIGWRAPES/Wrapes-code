<script setup lang="ts">
import { ref } from 'vue'
import { contactEmail, whatsappNumber } from '../config/contact'

const open = ref(false)
const message = ref('')
const status = ref('')
const suggestions = [
  'I need a website',
  'Tell me about Bigwrapes Pixel',
  "Let's discuss a project",
]

function useSuggestion(suggestion: string) {
  message.value = suggestion
  status.value = ''
}

function sendMessage() {
  const text = message.value.trim()
  if (!text) { status.value = 'Write a message before continuing.'; return }
  if (!whatsappNumber) { status.value = 'Add your WhatsApp number in src/config/contact.ts to connect this chat.'; return }
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  status.value = 'Your message is ready in WhatsApp.'
}
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
    <section
      v-if="open"
      id="talk-panel"
      class="mb-3 flex max-h-[min(34rem,calc(100svh-7rem))] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/60"
      aria-label="Let's talk chat"
    >
      <header class="flex items-center justify-between border-b border-white/10 px-4 py-3.5">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-sm font-bold tracking-tight text-emerald-300" aria-hidden="true">BP</div>
          <div>
            <p class="text-sm font-semibold text-white">Let's talk</p>
            <p class="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-400"><span class="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true"></span>Message me on WhatsApp</p>
          </div>
        </div>
        <button type="button" class="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400" aria-label="Close chat" @click="open = false">✕</button>
      </header>

      <div class="overflow-y-auto px-4 py-5 sm:px-5">
        <div class="max-w-[90%] rounded-2xl rounded-tl-sm border border-white/5 bg-zinc-800 px-4 py-3.5">
          <p class="text-sm font-medium text-white">Hello! How can I help you today?</p>
          <p class="mt-1.5 text-xs leading-5 text-zinc-400">Pick a topic or write your own message. It will open in WhatsApp for you to send.</p>
        </div>

        <div class="mt-5">
          <p class="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Quick messages</p>
          <div class="flex flex-col items-start gap-2">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              type="button"
              class="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3.5 py-2 text-left text-xs text-emerald-200 transition hover:border-emerald-300/50 hover:bg-emerald-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              @click="useSuggestion(suggestion)"
            >{{ suggestion }}</button>
          </div>
        </div>
      </div>

      <form class="border-t border-white/10 bg-zinc-950/60 p-3.5" @submit.prevent="sendMessage">
        <label for="chat-message" class="sr-only">Write a message</label>
        <div class="flex items-end gap-2 rounded-xl border border-white/10 bg-zinc-900 p-2 focus-within:border-emerald-400/50 focus-within:ring-2 focus-within:ring-emerald-400/10">
          <textarea
            id="chat-message"
            v-model="message"
            rows="1"
            maxlength="1000"
            placeholder="Write your message..."
            class="max-h-24 min-h-10 flex-1 resize-y bg-transparent px-2 py-2 text-sm leading-5 text-white outline-none placeholder:text-zinc-600"
            @input="status = ''"
          ></textarea>
          <button type="submit" class="flex h-10 shrink-0 items-center gap-2 rounded-lg bg-emerald-400 px-3 text-xs font-semibold text-zinc-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
            Send <span aria-hidden="true">↗</span>
          </button>
        </div>
        <p v-if="status" class="mt-2 px-1 text-xs leading-5 text-amber-200" role="status">{{ status }}</p>
        <div class="mt-3 flex flex-wrap items-center justify-center gap-x-1 text-[11px] text-zinc-500">
          <span>Prefer email?</span>
          <a :href="`mailto:${contactEmail}`" class="font-medium text-emerald-300 underline decoration-emerald-300/30 underline-offset-2 hover:text-emerald-200">{{ contactEmail }}</a>
        </div>
        <p class="mt-1.5 px-1 text-center text-[10px] text-zinc-600">WhatsApp opens with your message ready to send</p>
      </form>
    </section>

    <button
      type="button"
      class="flex items-center gap-2.5 rounded-full bg-emerald-400 px-5 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-950/50 transition hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
      :aria-expanded="open"
      :aria-controls="open ? 'talk-panel' : undefined"
      @click="open = !open"
    >
      <span aria-hidden="true" class="text-base">{{ open ? '×' : '✳' }}</span> {{ open ? 'Close' : "Let's talk" }}
    </button>
  </div>
</template>
