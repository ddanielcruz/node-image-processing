import sharp from 'sharp'

import { listImages, withTimer } from './helpers.js'

// OUTPUT: 0.8ms
async function main() {
  const [{ filename, filepath }] = await listImages()
  console.log(`Reading metadata from image: ${filename}`)
  const metadata = await withTimer('IMAGE METADATA', () => sharp(filepath).metadata())
  console.log(metadata)
}

main()
