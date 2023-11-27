import { MENU } from "./menu.js"
import readline from 'readline'
import inquirer from 'inquirer'
import fs from 'fs'

// Перевірка на наявність когось!!!!

export function delUser(){
    console.clear()
    const choices = []

    try {
        const data = fs.readFileSync('persons.txt', 'utf8')
        const lines = data.split('\n')
    
        lines.forEach(line => {
            if (line.trim() !== '') {
                try {
                    const parsedData = JSON.parse(line)
                    choices.push(parsedData[0].name)
                } catch (error) {
                    console.error('Error parsing line:', error)
                }
            }
        })

        inquirer.prompt([
        {
            type: 'list',
            name: 'personToDelete',
            message: 'Choose the person to delete',
            choices: choices,
        }
        ]).then(answer => {
            const nameToDelete = answer.personToDelete
            const newData = lines.filter(line => {
                try {
                    const parsedData = JSON.parse(line)
                    return parsedData[0].name !== nameToDelete
                } catch (error) {
                    return false
                }
            });

            fs.writeFileSync('persons.txt', newData.join('\n'))

            console.log('Person deleted successfully')

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('Press Enter to return to the menu...', () => {
                rl.close()
                MENU()
            });
        }).catch(error => {
            console.error('Error occurred:', error)
        });

    } catch (error) {
        console.error('Error reading the file:', error)
    }
}
