import { addUser } from "./addUser.js"
import { delUser } from "./delUser.js"
import { showList } from "./showList.js"
import { editUser } from "./editDate.js"

import inquirer from 'inquirer'

MENU()

export function MENU(){
    console.clear()

    inquirer.prompt([{
        name: "menu",
        message: "What do you wont to do?",
        type: "list",
        choices: ["Add User", "Del User", "List User`s", "Edit date", "Exit"]
    }])
    .then(function (answer) {
        switch(answer.menu){
            case "Add User": addUser(); break
            case "Del User": delUser(); break
            case "List User`s": showList(); break
            case "Edit date": editUser(); break
            case "Exit": console.clear(); process.exit(0)
        }
    })
}
  



  
