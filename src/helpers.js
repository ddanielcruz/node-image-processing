import chalk from 'chalk'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FOLDER_IMAGES = path.resolve(__dirname, '..', 'images')

export async function listImages() {
  const images = await fs.readdir(FOLDER_IMAGES)
  return images
    .filter(filename => filename !== '.gitkeep')
    .map(filename => path.resolve(FOLDER_IMAGES, filename))
}

export function withTimer(label, promise) {
  const coloredLabel = chalk.yellow(`[${label}]`)
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

export async function createFolder(name) {
  // TODO Create a folder to host the processing results
}

export async function saveOutput(folder, name, data) {
  // TODO Save file result to output folder
}
