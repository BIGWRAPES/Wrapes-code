import logoUrl from '../assets/my logo.png'

// Remove only the light pixels connected to the image edge, keeping white details inside the mark.
export const transparentLogo: Promise<string> = new Promise((resolve) => {
  const image = new Image()
  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) { resolve(logoUrl); return }
    context.drawImage(image, 0, 0)
    const { width, height } = canvas
    const pixels = context.getImageData(0, 0, width, height)
    const { data } = pixels
    const visited = new Uint8Array(width * height)
    const queue = new Int32Array(width * height)
    let head = 0
    let tail = 0
    const isBackground = (index: number) => {
      const offset = index * 4
      const r = data[offset], g = data[offset + 1], b = data[offset + 2]
      return Math.min(r, g, b) > 145 && Math.max(r, g, b) - Math.min(r, g, b) < 60
    }
    const add = (index: number) => {
      if (!visited[index] && isBackground(index)) { visited[index] = 1; queue[tail++] = index }
    }
    for (let x = 0; x < width; x++) { add(x); add((height - 1) * width + x) }
    for (let y = 0; y < height; y++) { add(y * width); add(y * width + width - 1) }
    while (head < tail) {
      const index = queue[head++]
      data[index * 4 + 3] = 0
      const x = index % width
      if (x > 0) add(index - 1)
      if (x + 1 < width) add(index + 1)
      if (index >= width) add(index - width)
      if (index + width < width * height) add(index + width)
    }
    context.putImageData(pixels, 0, 0)
    resolve(canvas.toDataURL('image/png'))
  }
  image.onerror = () => resolve(logoUrl)
  image.src = logoUrl
})
