import { MENU } from "./menu.js"
import readline from 'readline'
import fs from 'fs'

export function showList(){
    console.clear()

    try {
        const data = fs.readFileSync('persons.txt', 'utf8')
        const lines = data.split('\n')

        lines.forEach(line => {
            if (line.trim() !== '') {
                try {
                    const parsedData = JSON.parse(line)
                    console.table(parsedData)
                } catch (error) {
                    console.error('Error parsing line:', error)
                }
            }
        })
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl.question('Press Enter to return to the menu...', () => {
            rl.close()
            MENU()
        })

    } catch (error) {
        console.error('Error reading the file:', error)
        return Promise.reject(error)
    }
}
