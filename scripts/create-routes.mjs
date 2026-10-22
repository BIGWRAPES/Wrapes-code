import { mkdir, copyFile } from 'node:fs/promises'

for (const route of ['projects', 'contact']) {
  const routeDirectory = new URL(`../dist/${route}/`, import.meta.url)
  await mkdir(routeDirectory, { recursive: true })
  await copyFile(new URL('../dist/index.html', import.meta.url), new URL('index.html', routeDirectory))
}
