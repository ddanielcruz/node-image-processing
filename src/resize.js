import sharp from 'sharp'

import { listImages, withTimer } from './helpers.js'

const SAMPLE = Number.MAX_SAFE_INTEGER

// OUTPUT: 152 images in 1.25s
async function main() {
  const images = await listImages({ makeFolder: true })
  const sample = images.slice(0, SAMPLE)
  console.log(`Resizing ${sample.length} images by 50%`)

  await withTimer('RESIZING', () =>
    Promise.all(
      sample.map(async image => {
        const metadata = await sharp(image.filepath).metadata()
        await sharp(image.filepath)
          .resize({
            width: Math.ceil(metadata.width / 2),
            height: Math.ceil(metadata.height / 2)
          })
          .toFile(image.output)
      })
    )
  )
}

main()
