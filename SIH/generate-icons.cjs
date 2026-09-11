const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')

const sizes = [192, 512]
const iconsDir = path.join(__dirname, 'public/icons')

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

function drawIcon(canvas, size) {
  const ctx = canvas.getContext('2d')

  // Background circle
  const center = size / 2
  const radius = size * 0.42

  // Gradient background
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius)
  gradient.addColorStop(0, '#3b82f6')
  gradient.addColorStop(1, '#1e40af')

  ctx.beginPath()
  ctx.arc(center, center, radius, 0, 2 * Math.PI)
  ctx.fillStyle = gradient
  ctx.fill()

  // White location pin / map marker
  ctx.fillStyle = '#ffffff'

  // Draw a map pin
  const pinWidth = size * 0.25
  const pinHeight = size * 0.35
  const pinX = center - pinWidth / 2
  const pinY = center - pinHeight * 0.6

  // Pin body (teardrop shape)
  ctx.beginPath()
  ctx.moveTo(center, pinY + pinHeight)
  ctx.bezierCurveTo(
    center, pinY + pinHeight,
    pinX, pinY + pinHeight * 0.3,
    center, pinY
  )
  ctx.bezierCurveTo(
    center, pinY,
    pinX + pinWidth, pinY + pinHeight * 0.3,
    center, pinY + pinHeight
  )
  ctx.closePath()
  ctx.fill()

  // Inner circle (hole in pin)
  ctx.beginPath()
  ctx.arc(center, pinY + pinHeight * 0.35, pinWidth * 0.22, 0, 2 * Math.PI)
  ctx.fillStyle = '#1e40af'
  ctx.fill()

  // Small dot at bottom of pin
  ctx.beginPath()
  ctx.arc(center, pinY + pinHeight * 0.95, pinWidth * 0.08, 0, 2 * Math.PI)
  ctx.fillStyle = '#ffffff'
  ctx.fill()

  // "SIH" text at bottom
  ctx.fillStyle = '#ffffff'
  ctx.font = `bold ${size * 0.12}px system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  ctx.fillText('SIH', center, size - size * 0.08)
}

sizes.forEach(size => {
  const canvas = createCanvas(size, size)
  drawIcon(canvas, size)

  const buffer = canvas.toBuffer('image/png')
  const filename = `icon-${size}.png`
  fs.writeFileSync(path.join(iconsDir, filename), buffer)
  console.log(`Generated ${filename}`)
})

console.log('All icons generated successfully!')