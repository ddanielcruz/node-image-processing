import sharp from 'sharp'

import { listImages, withTimer } from './helpers.js'

async function main() {
  const [image] = await listImages()
  console.log(`Reading metadata from image: ${image}`)
  const metadata = await withTimer('IMAGE METADATA', () => sharp(image).metadata())
  console.log(metadata)
}

main()
