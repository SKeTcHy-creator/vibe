
/**Консольное меню */

const readline = require('node:readline/promises');

//Категория билетов
function ticketPrice(category){
    switch(category){
        case 1: {
            return 300
        }
        case 2: {
            return 500
        }
        case 3: {
            return 900
        }
        default: 
            return 0
    }
}

//Расчет суммы билетов
function maxTickets(budget, price){
    let tiketCount = 0;
    let difference = budget

    while (difference >= price){
        difference -= price;
        tiketCount += 1;
    }

    return tiketCount
}

// Вывод для кассы билетов
function printTicketResult(category, budget){
    const price = ticketPrice(category)
    const tiketCount = maxTickets(budget, price);
    console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${tiketCount} шт.`)
}

// Рассчет стоимости доставки
function deliveryPrice(distance, total){
    if(distance <= 3 || total >= 3000){
        return costDelivery = 0;
    } else if (distance >= 4 && distance <= 10) {
        return costDelivery = 200
    } else if (distance > 10){
        return costDelivery = 200 + (distance - 10) * 25
    }
}

// Вывод доставки заказа
function printDelivery(distance, total){
    const costDelivery = deliveryPrice(distance, total)
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${costDelivery !== 0 ? costDelivery + " руб." : "бесплатна"}`)
}

// Рассчет высоты лестницы
function printSteps(height){
    if (height <= 0){
        console.log("Указанная высота лестницы не корректна")
        return
    }

    let count = 0
    for(let i = 1; i <= height; i++){
        if(i > 10){
            console.log("Дальше лестница не построена")
            break
        }
        if (i === 4){
            continue
        }
        console.log(`Ступень ${i}`)
        count ++;
    }

    console.log("Всего построено: ", count)
}

// Функция взаимодействия пользователя с программой
async function main() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout})

    console.log("Выберите задачу:");
    console.log("1 — билетная касса");
    console.log("2 — доставка заказа");
    console.log("3 — лестница");

    const action = Number(await rl.question('Ваш выбор: '))

    switch (action){
        case 1: {
            const category = Number(await rl.question("Категория билета: "))
            const budget = Number(await rl.question("Бюджет: "))
            printTicketResult(category, budget)
            break
        }
        case 2: {
            const distance = Number(await rl.question("Расстояние: "))
            const total = Number(await rl.question("Сумма заказа: "))
            printDelivery(distance, total)
            break
        }
        case 3: {
            const height = Number(await rl.question("Высота лестницы: "))
            printSteps(height)
            break
        }
        default:
            console.log('Такой задачи нет')
    }
    rl.close();
}

main();