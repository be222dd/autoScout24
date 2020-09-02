exports.calculatePercentageByMake = (listingArr) => {

    const totalAmountOfCars = listingArr.length

    const resultObject = listingArr.reduce(reducer, {})

    const resultArray = Object.keys(resultObject).map(key => {
        const percentage = calculatePercentage(resultObject[key].amountOfCars, totalAmountOfCars)

        return { make: key, percentage }
    })

    //sorting by percentage biggest numbers stays on top
    resultArray.sort((a, b) => b.percentage - a.percentage)

    return resultArray
}

const calculatePercentage = (a, b) => Math.round((a / b) * 100)


const reducer = (result, item) => {
    const seller = result[item.make]
    if (!seller) {
        result[item.make] = { amountOfCars: 1 }
        return result
    }

    result[item.make].amountOfCars += 1

    return result
}