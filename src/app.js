const csv = require('csvtojson')
const { calculateAvaragePerSellerType } = require('./report1')
const { calculatePercentageByMake } = require('./report2')
const { calculateAveragePriceOf30percentOfMostContactedListings } = require('./report3')
const { calculateTop5MostContactedPerMonth } = require('./report4')
const readline = require('readline');


const csvToArray = async (filename) => {
    const jsonArray = await csv().fromFile(filename)
    return jsonArray
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const question = (q) => {
    return new Promise((res, rej) => {
        rl.question(q, answer => {
            res(answer);
        })
    });
};

const app = async () => {
    const listingsFilePath = './listings.csv'
    const contactFilePath = './contacts.csv'
    const listingArr = await csvToArray(listingsFilePath)
    const contactsArr = await csvToArray(contactFilePath)
    let closeApp = false
    let report

    while (!closeApp) {
        console.log('Type 1 to => Average Listing Selling Price per Seller Type')
        console.log('Type 2 to => Percentual distribution of available cars by Make')
        console.log('Type 3 to => Average price of the 30% most contacted listings')
        console.log('Type 4 to => The Top 5 most contacted listings per Month')
        console.log('Type 99 to => Close the App')
        let answer = await question(' \nPlease type your choice by number? ')
        answer = Number(answer)

        if (answer === 99) {
            closeApp = true
            rl.close()
            return
        } else if (answer == 1) {
            report = calculateAvaragePerSellerType(listingArr)

        } else if (answer == 2) {
            report = calculatePercentageByMake(listingArr)

        } else if (answer == 3) {
            report = calculateAveragePriceOf30percentOfMostContactedListings(listingArr, contactsArr)

        } else if (answer == 4) {
            const monthNumber = await question(' \nType month number to report.. ')
            report = calculateTop5MostContactedPerMonth(listingArr, contactsArr, monthNumber)
        } else {
            console.log(' \nWrong Input. Aborting....')
            closeApp = true
            rl.close()
            return
        }

        console.table(report)
    }
}

app()





