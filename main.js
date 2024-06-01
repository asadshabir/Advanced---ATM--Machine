import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
import chalk from "chalk";
const getUser = () => {
    let userData = [];
    for (let i = 1; i < 4; i++) {
        const users = {
            name: faker.person.fullName(),
            id: i,
            pin: 110 + i,
            balance: 150000 * i,
            accountNumber: Math.floor(1000 * Math.random() * 50000)
        };
        userData.push(users);
    }
    return userData;
};
// Atm Options
console.log(chalk.bold.yellow("______________________________"));
console.log(chalk.bold.yellow("| ~ ") + chalk.bold.cyan("WelCome ") + chalk.bold.blue("To ") + chalk.bold.magenta("ATM ") + chalk.bold.green("Machine") + chalk.bold.yellow(" ~ |"));
console.log(chalk.bold.yellow("______________________________\n"));
const atm_Options = async (userDetails) => {
    const enterPin = await inquirer.prompt([
        {
            name: "pinCode",
            message: "Please Enter Your Pin Code :",
            type: "number"
        }
    ]);
    const userInfo = userDetails.find(val => val.pin == enterPin.pinCode);
    if (userInfo) {
        console.log("");
        console.log(chalk.bold.magenta(`{ WelCome ~ ${chalk.bold.cyan(userInfo.name)} :) }`));
        console.log(chalk.bold.yellow("______________________________"));
        atm_Functions(userInfo);
        return;
    }
    ;
    console.log(chalk.bold.red("Invalid Pin Code .!!"));
};
//Atm Function :
const atm_Functions = async (userChoices) => {
    const features = await inquirer.prompt([
        {
            name: "options",
            message: "Select Transaction Method :",
            type: "rawlist",
            choices: ["Withdraw", "Check Balance", "Deposit", "Exit"]
        }
    ]);
    if (features.options == "Withdraw") {
        const cashOut = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter Amout :",
                type: "number"
            }
        ]);
        if (cashOut.amount > userChoices.balance) {
            console.log(chalk.bold.cyan("Oop , You Don't have insuficient balance to make this transaction .!! "));
            return;
        }
        if (cashOut.amount > 50000) {
            console.log(chalk.bold.red(`Sorry "${chalk.bold.cyan(userChoices.name)}" you can't withraw more than 50000 at once `) + chalk.bold.green(` try again !`));
            return;
        }
        console.log(chalk.bold.red("Alert .!") + chalk.bold.magenta(`The Amount Of "Rs: ${chalk.bold.red(cashOut.amount)}" has been dutucted from your accuont .!`));
        console.log(chalk.bold.green(`Your New Account Balance is , {${chalk.bold.cyan(userChoices.balance - cashOut.amount)}} `));
    }
    if (features.options == "Check Balance") {
        console.log(chalk.bold.yellow(`Your Current Account Balance is :`) + chalk.bold.green(` (Rs: ${userChoices.balance})`));
    }
    if (features.options == "Deposit") {
        const makeDeposit = await inquirer.prompt([
            {
                name: "depoAcc",
                message: "Enter Account Number  :",
                type: "number"
            },
            {
                name: "depoAmount",
                message: "Enter Dopist Amount :",
                type: "number"
            }
        ]);
        console.log(chalk.bold.cyan(`The Amount Of " Rs:${chalk.bold.yellow(makeDeposit.depoAmount)} " Successfully Send To: " ${chalk.bold.yellow(makeDeposit.depoAcc)} "`));
        console.log(chalk.bold.green(`Your New Account balance is " ${chalk.bold.magenta(makeDeposit.depoAmount + userChoices.balance)} " :)`));
    }
    if (features.options == "Exit") {
        console.log(chalk.bold.green(`Thanks For Using "ATM" ,`) + chalk.bold.magenta(` Please Come again :)`));
    }
};
const userDetails = getUser();
atm_Options(userDetails);
