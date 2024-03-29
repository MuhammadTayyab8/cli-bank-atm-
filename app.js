#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log("WELCOME TO BANK OF TAYYAB");
async function main() {
    let info = await inquirer.prompt([
        {
            name: "user",
            type: "string",
            message: "Enter your Account Name :",
        },
        {
            name: "pin",
            type: "number",
            message: "Enter your Account PIN : ",
        },
        {
            name: "accountType",
            type: "list",
            message: "Enter your Account Type :",
            choices: ["Current Account", "Saving Account"]
        },
        {
            name: "balance",
            type: "number",
            message: "Add Money To Your Account Balance : ",
        }
    ]);
    console.log(chalk.yellow(`\nCongratulations, ${chalk.greenBright(`Dear ${info.user}! Your ${info.accountType} account`)} has been successfully created.`));
    console.log(chalk.blue("Welcome to BANK ISLAMIC !"));
    console.log(chalk.greenBright("\nNOW YOU CAN USE OUR ATM SERVICES!\n"));
    const atm = await inquirer.prompt([
        {
            name: "Pin",
            type: "number",
            message: "Enter Your Account PIN :",
        },
    ]);
    if (atm.Pin === info.pin) {
        let ser = await inquirer.prompt([
            {
                name: "method",
                type: "list",
                message: "Please Select One Option:",
                choices: ["Withdraw", "Check Balance", "Fast Cash", "Billing"],
            }
        ]);
        if (ser.method === "Withdraw") {
            const cash = await inquirer.prompt([
                {
                    name: "withdraw",
                    type: "number",
                    message: "Enter your Amount to Withdraw :",
                }
            ]);
            if (cash.withdraw > info.balance) {
                console.log(chalk.red(`Insufficient balance! Your Balance is ${info.balance}`));
            }
            else {
                const remainingBalance = info.balance - cash.withdraw;
                console.log(`Withdrawn: ${cash.withdraw}`);
                console.log(`Remaining balance: ${remainingBalance}`);
                // Update the balance in the info object
                info.balance = remainingBalance;
            }
        }
        else if (ser.method === "Check Balance") {
            console.log(`Your balance is : ${info.balance}`);
        }
        else if (ser.method === "Fast Cash") {
            const fast = await inquirer.prompt([
                {
                    name: "fast",
                    type: "list",
                    message: "Select your amount:",
                    choices: ["500", "1000", "2000", "3000", "4000", "5000", "6000", "10000"],
                },
            ]);
            const selectedAmount = parseInt(fast.fast); // Convert the selected amount to an integer
            if (selectedAmount > info.balance) {
                console.log(chalk.red(`Insufficient balance! Your Balance is ${info.balance}`));
            }
            else {
                const remainingBalance = info.balance - selectedAmount;
                console.log(`Withdrawn: ${selectedAmount}`);
                console.log(`Remaining balance: ${remainingBalance}`);
                // Update the balance in the info object
                info.balance = remainingBalance;
            }
        }
        else if (ser.method === "Payment") {
            const payment = await inquirer.prompt([
                {
                    name: "payment",
                    type: "list",
                    message: "Select your Billing option:",
                    choices: ["K-ELECTRIC", "GAS"]
                },
            ]);
            if (payment.payment === "K-ELECTRIC" || payment.payment === "GAS") {
                let paymentDetails = {};
                if (payment.payment === "K-ELECTRIC") {
                    paymentDetails = await inquirer.prompt([
                        {
                            name: "billNumber",
                            type: "input",
                            message: "Enter your K-ELECTRIC bill number:",
                            validate: function (input) {
                                const isValidLength = input.length === 13;
                                const containsOnlyDigits = /^\d+$/.test(input);
                                if (!isValidLength || !containsOnlyDigits) {
                                    return "K-ELECTRIC bill number must be exactly 13 digits  numbers.";
                                }
                                return true;
                            }
                        }
                    ]);
                }
                const amount = await inquirer.prompt([
                    {
                        name: "amount",
                        type: "number",
                        message: `Enter the amount for ${payment.payment} payment:`
                    }
                ]);
                if (amount.amount > info.balance) {
                    console.log(chalk.red(`Insufficient balance! Your Balance is ${info.balance}`));
                }
                else {
                    const remainingBalance = info.balance - amount.amount;
                    console.log(`Payment of ${amount.amount} made for ${payment.payment}`);
                    console.log(`Remaining balance: ${remainingBalance}`);
                    // Update the balance in the info object
                    info.balance = remainingBalance;
                }
            }
            else {
                console.log("Invalid payment option selected.");
            }
        }
        else {
            console.log("Invalid option selected.");
        }
    }
    else {
        console.log("Your PIN is Wrong! Please try again.");
    }
}
main();
