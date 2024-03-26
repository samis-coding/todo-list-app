#! /usr/bin/env node
import  readlineSync from 'readline-sync';
import  chalk from 'chalk';
import  ora from 'ora';

interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

let todos: Todo[] = [];

function displayMenu() {
    console.log('\nTodo List Application');
    console.log('1. ' + chalk.green('Add Todo'));
    console.log('2. ' + chalk.blue('Mark Todo as Completed'));
    console.log('3. ' + chalk.yellow('List Todos'));
    console.log('4. ' + chalk.red('Exit'));
}

function addTodo() {
    const task = readlineSync.question('Enter task: ').trim();
    if (!task) {
        console.log(chalk.red('Task cannot be empty!'));
        return;
    }
    const newTodo: Todo = {
        id: todos.length + 1,
        task: task,
        completed: false
    };
    todos.push(newTodo);
    console.log(chalk.green('Todo added successfully!'));
}

function markTodoAsCompleted() {
    const idString = readlineSync.question('Enter todo ID to mark as completed: ');
    const id = parseInt(idString);
    if (isNaN(id)) {
        console.log(chalk.red('Invalid ID. Please enter a number.'));
        return;
    }
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex].completed = true;
        console.log(chalk.blue('Todo marked as completed!'));
    } else {
        console.log(chalk.red('Todo not found!'));
    }
}

function listTodos() {
    const spinner = ora('Loading Todos...').start();
    setTimeout(() => {
        spinner.stop();
        console.log('\nTodo List:');
        if (todos.length === 0) {
            console.log(chalk.yellow('No todos found.'));
        } else {
            todos.forEach(todo => {
                console.log(`${todo.id}. [${todo.completed ? chalk.green('✓') : ' '}] ${todo.task}`);
            });
        }
    }, 1000);
}

function main() {
    let choice: number;
    do {
        displayMenu();
        const choiceString = readlineSync.question('Enter your choice number: ');
        choice = parseInt(choiceString);
        if (isNaN(choice)) {
            console.log(chalk.red('Invalid choice. Please enter a number.'));
            continue;
        }
        switch (choice) {
            case 1:
                addTodo();
                break;
            case 2:
                markTodoAsCompleted();
                break;
            case 3:
                listTodos();
                break;
            case 4:
                const cliSpinners = require('cli-spinners');

                console.log(cliSpinners.dots);
                
                console.log(chalk.red('Exiting...'));
                break;
            default:
                console.log(chalk.red('Invalid choice. Please try again.'));
        }
    } while (choice !== 4);
}

main();
