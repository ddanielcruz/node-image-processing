import chalk from 'chalk'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FOLDER_IMAGES = path.resolve(__dirname, '..', 'images')
const FOLDER_OUTPUT = path.resolve(__dirname, '..', 'out')

export async function listImages({ makeFolder = false } = {}) {
  const images = await fs.readdir(FOLDER_IMAGES)
  const folder = path.resolve(FOLDER_OUTPUT, Date.now().toString())

  if (makeFolder) {
    await fs.mkdir(folder)
  }

  return images
    .filter(filename => filename !== '.gitkeep')
    .map(filename => {
      const [name, extension] = filename.split('.')
      return {
        name,
        extension,
        filename,
        filepath: path.resolve(FOLDER_IMAGES, filename),
        output: path.resolve(folder, filename),
        folder
      }
    })
}

export function withTimer(label, promise) {
  const coloredLabel = chalk.green(`[${label}]`)
  return new Promise(async (resolve, reject) => {
    console.time(coloredLabel)
    try {
      const output = await promise()
      resolve(output)
    } catch (error) {
      reject(error)
    } finally {
      console.timeEnd(coloredLabel)
    }
  })
}
