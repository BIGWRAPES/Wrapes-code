import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const portrait = readFileSync(resolve(root, 'src/assets/resume image.JPG'))
const pageWidth = 612
const pageHeight = 792
const ink = '0.10 0.14 0.18'
const muted = '0.34 0.39 0.43'
const accent = '0.02 0.47 0.38'
const pale = '0.91 0.96 0.94'
const commands = []
const portraitSize = jpegDimensions(portrait)
const portraitCrop = { x: 210, y: 300, width: 420, height: 560 }
const portraitBox = { x: 52, y: 666, width: 60, height: 84 }

function jpegDimensions(data) {
  let offset = 2
  while (offset < data.length - 9) {
    if (data[offset] !== 0xff) { offset++; continue }
    const marker = data[offset + 1]
    if (marker === 0xd8 || marker === 0xd9) { offset += 2; continue }
    const segmentLength = data.readUInt16BE(offset + 2)
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: data.readUInt16BE(offset + 5), width: data.readUInt16BE(offset + 7), components: data[offset + 9] }
    }
    offset += segmentLength + 2
  }
  throw new Error('Could not read the resume portrait JPEG dimensions')
}

function safeText(value) {
  return value
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u2022/g, '-')
    .replace(/[^\x20-\x7e]/g, '')
}

function escapePdf(value) {
  return safeText(value).replace(/([\\()])/g, '\\$1')
}

function text(value, x, y, size = 10, font = 'F1', color = ink) {
  commands.push(`BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x} ${y} Tm (${escapePdf(value)}) Tj ET`)
}

function line(x1, y1, x2, y2, color = '0.84 0.88 0.87', width = 0.7) {
  commands.push(`${color} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S`)
}

function section(title, y) {
  text(title.toUpperCase(), 48, y, 9, 'F2', accent)
  line(48, y - 7, 564, y - 7)
}

function wrap(value, maxChars) {
  const words = value.split(/\s+/)
  const lines = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars && current) {
      lines.push(current)
      current = word
    } else current = next
  }
  if (current) lines.push(current)
  return lines
}

function paragraph(value, x, y, maxChars, lineHeight = 13, size = 9.5, color = muted) {
  const lines = wrap(value, maxChars)
  lines.forEach((entry, index) => text(entry, x, y - index * lineHeight, size, 'F1', color))
  return y - lines.length * lineHeight
}

// Header
commands.push(`${pale} rg 0 0 ${pageWidth} ${pageHeight} re f`)
commands.push(`1 1 1 rg 36 34 540 724 re f`)
commands.push(`${accent} rg 36 656 540 102 re f`)
commands.push(`1 1 1 rg ${portraitBox.x - 3} ${portraitBox.y - 3} ${portraitBox.width + 6} ${portraitBox.height + 6} re f`)
const photoScaleX = portraitBox.width / portraitCrop.width
const photoScaleY = portraitBox.height / portraitCrop.height
const photoImageWidth = portraitSize.width * photoScaleX
const photoImageHeight = portraitSize.height * photoScaleY
const photoImageX = portraitBox.x - portraitCrop.x * photoScaleX
const photoImageY = portraitBox.y - (portraitSize.height - portraitCrop.y - portraitCrop.height) * photoScaleY
commands.push(`q ${portraitBox.x} ${portraitBox.y} ${portraitBox.width} ${portraitBox.height} re W n ${photoImageWidth} 0 0 ${photoImageHeight} ${photoImageX} ${photoImageY} cm /Im1 Do Q`)
text('Okwu Prosper', 130, 731, 23, 'F2', '1 1 1')
text('FRONT-END DEVELOPER', 131, 715, 9, 'F2', '0.80 0.94 0.89')
text('okwup910@gmail.com   |   wrapes-code.onrender.com', 131, 688, 9, 'F1', '1 1 1')
text('bigwrapes-pixel.online', 131, 674, 9, 'F1', '1 1 1')

section('Professional summary', 650)
paragraph('Front-End Developer and Chemistry Education student who builds web projects with Vue 3, Vite, JavaScript, Tailwind CSS, HTML, and CSS. Created Bigwrapes Pixel, a live showcase helping student entrepreneurs present their businesses and products to customers. Also works with Node.js and Supabase database handling.', 48, 632, 103, 12.5)

section('Technical skills', 580)
text('Front end', 48, 562, 9.5, 'F2', ink)
text('Vue 3, Vite, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3', 130, 562, 9.5, 'F1', muted)
text('Backend & data', 48, 547, 9.5, 'F2', ink)
text('Node.js, Supabase, database handling', 130, 547, 9.5, 'F1', muted)
text('Tools', 48, 532, 9.5, 'F2', ink)
text('Git, GitHub, VS Code, browser developer tools', 130, 532, 9.5, 'F1', muted)

section('Selected project', 505)
text('Bigwrapes Pixel - Creator and Developer', 48, 486, 11, 'F2', ink)
text('Live student-business showcase  |  bigwrapes-pixel.online', 48, 471, 9, 'F1', accent)
let y = paragraph('Built and launched a platform where student entrepreneurs can showcase their businesses and products, helping customers discover what they offer.', 58, 451, 94, 12.5)
paragraph('Technology: HTML, CSS, JavaScript, and Supabase.', 58, y - 1, 94, 12.5)

section('Education & professional development', 395)
text("Bachelor's studies in Chemistry Education - In progress", 48, 376, 10, 'F2', ink)
text('Building analytical, research, communication, and problem-solving skills.', 48, 361, 9.2, 'F1', muted)
text('Software Engineering studies - Udemy, In progress', 48, 341, 10, 'F2', ink)
text('Coursework in software development, programming practices, and workflows.', 48, 326, 9.2, 'F1', muted)

section('Certification', 295)
text('Modern JavaScript Developer Certification - freeCodeCamp', 48, 276, 10, 'F2', ink)

section('Strengths', 248)
text('Problem solving  |  Critical thinking  |  Communication  |  Adaptability  |  Attention to detail', 48, 229, 9, 'F1', muted)

const stream = commands.join('\n')
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  `<< /Length ${Buffer.byteLength(stream, 'ascii')} >>\nstream\n${stream}\nendstream`,
  Buffer.concat([
    Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${portraitSize.width} /Height ${portraitSize.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${portrait.length} >>\nstream\n`, 'ascii'),
    portrait,
    Buffer.from('\nendstream', 'ascii'),
  ]),
]
objects[2] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> /XObject << /Im1 7 0 R >> >> /Contents 6 0 R >>`

const chunks = [Buffer.from('%PDF-1.4\n', 'ascii')]
const offsets = [0]
let currentOffset = chunks[0].length
for (let index = 0; index < objects.length; index++) {
  offsets.push(currentOffset)
  const objectHeader = Buffer.from(`${index + 1} 0 obj\n`, 'ascii')
  const objectBody = Buffer.isBuffer(objects[index]) ? objects[index] : Buffer.from(objects[index], 'ascii')
  const objectFooter = Buffer.from('\nendobj\n', 'ascii')
  chunks.push(objectHeader, objectBody, objectFooter)
  currentOffset += objectHeader.length + objectBody.length + objectFooter.length
}
const xrefOffset = currentOffset
let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (const offset of offsets.slice(1)) xref += `${String(offset).padStart(10, '0')} 00000 n \n`
xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
chunks.push(Buffer.from(xref, 'ascii'))

const output = resolve(root, 'public/resume.pdf')
mkdirSync(dirname(output), { recursive: true })
writeFileSync(output, Buffer.concat(chunks))
console.log(`Created ${output}`)
