import { MENU } from "./menu.js"
import readline from 'readline'
import inquirer from 'inquirer'
import fs from 'fs'

export function editUser(){
    console.clear()
    const choices = []

    try{
        const data = fs.readFileSync('persons.txt', 'utf8')
        const lines = data.split('\n')
    
        lines.forEach(line =>{
            if(line.trim() !== ''){
                try{
                    const parsedData = JSON.parse(line)
                    choices.push(parsedData[0].name)
                }catch (error){
                    console.error('Error parsing line:', error)
                }
            }
        })

        inquirer.prompt([
        {
            type: 'list',
            name: 'personToEdit',
            message: 'Choose the person to edit',
            choices: choices
        }
        ]).then(answer => {
            const selectedUser = answer.personToEdit
            inquirer.prompt([
            {
                type: 'list',
                name: 'editField',
                message: `Choose the field to edit for ${selectedUser}`,
                choices: ['name', 'birthday', 'phone', 'email']
            }
            ]).then(fieldAnswer => {
                const selectedField = fieldAnswer.editField

                inquirer.prompt([
                { 
                    type: 'input', 
                    name: 'newValue', 
                    message: `Enter new value for ${selectedField} of ${selectedUser}`
                }
                ]).then(newValueAnswer => {
                    const newValue = newValueAnswer.newValue;
                    console.log(`Updated ${selectedField} for ${selectedUser} to ${newValue}`)

                    const indexToChange = lines.findIndex(line => {
                        try{
                            const parsedData = JSON.parse(line)
                            return parsedData[0].name === selectedUser
                        }catch (error){
                            return false
                        }
                    })

                    if(indexToChange !== -1){
                        const parsedData = JSON.parse(lines[indexToChange])
                        parsedData[0][selectedField] = newValue
                        lines[indexToChange] = JSON.stringify(parsedData)
    
                        fs.writeFileSync('persons.txt', lines.join('\n'))
                        console.log('Person edited successfully')
                    }else{
                        console.log('Person not found')
                    }
    
                    const rl = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    })
                    rl.question('Press Enter to return to the menu...', () => {
                        rl.close()
                        MENU()
                    })
                })
            })
        }).catch(error => {
            console.error('Error occurred:', error)
        })

    }catch (error){
        console.error('Error reading the file:', error)
    }
}
