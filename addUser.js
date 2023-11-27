import { MENU } from "./menu.js"
import inquirer from 'inquirer'
import fs from 'fs'

export function addUser(){
    console.clear()

    inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter your name:'},
        { type: 'input', name: 'birthday', message: 'Enter your birthday:'},
        { type: 'input', name: 'phone', message: 'Enter your phone number:'},
        { type: 'input', name: 'email', message: 'Enter your email:'}
    ]).then(answers => {
        const persons = [{
            name: answers.name,
            birthday: answers.birthday,
            phone: answers.phone,
            email: answers.email,
        }]

        fs.writeFileSync('persons.txt', '\n' + JSON.stringify(persons) + '\n', { flag: 'a' })
        console.log('New person created, waiting 5 sec...')
        
        setTimeout(() =>{
            MENU()
        }, 2000)

    }).catch(error => {
        console.error('Error occurred:', error)
    });
}
