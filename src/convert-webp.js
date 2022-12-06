import sharp from 'sharp'
import path from 'path'

import { listImages, withTimer } from './helpers.js'

// OUTPUT: 154 images in 7s
async function main() {
  const images = await listImages({ makeFolder: true })
  console.log(`Converting ${images.length} images to .webp`)
  await withTimer('CONVERT WEBP', () =>
    Promise.all(
      images.map(({ name, filepath, folder }) =>
        sharp(filepath)
          .webp()
          .toFile(path.resolve(folder, `${name}.webp`))
      )
    )
  )
}

main()
