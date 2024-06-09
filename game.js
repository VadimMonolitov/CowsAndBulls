let userFirstNum;
let compNum = generateMainNumber();
let correctPositions = [];
console.log(`Число компьютера: ${compNum}`);

while (true) {
    userFirstNum = prompt('Введите ваше число');
    if (userFirstNum.length !== 4 || new Set(userFirstNum).size !== 4) {
        alert('Повторите ввод: число должно содержать ровно 4 уникальные цифры');
    } else {
        console.log(`Число пользователя: ${userFirstNum}`);
        break;
    }
}

function getCowsBulls(num, mainNum) {
    let cows = 0, bulls = 0;

    for (let i = 0; i < num.length; i++) {
        const index = mainNum.indexOf(num[i]);
        if (index === i) {
            bulls++;
            if (!correctPositions.includes(i)) {
                correctPositions.push(i);
            }
        } else if (index > -1) {
            cows++;
        }
    }

    return `${num} - ${bulls} быков, ${cows} коров`;
}

function guess() {
    let compGuessArray = [];
    for (let i = 0; i < 4; i++) {
        if (correctPositions.includes(i)) {
            compGuessArray.push(userFirstNum[i]);
        } else {
            compGuessArray.push(Math.floor(Math.random() * 10).toString());
        }
    }
    let compGuess = compGuessArray.join('');

    let tempOut = document.getElementById('temp-out');
    tempOut.innerHTML = getCowsBulls(compGuess, userFirstNum);

    let number = document.getElementById('myNum').value;
    let out = document.getElementById('out');

    if (number.length !== 4 || isNaN(number)) {
        out.innerHTML = 'Пожалуйста, введите четырёхзначное число.';
        return;
    }

    if (number == compNum) {
        out.innerHTML = 'Победа! Число угадано';
    } else if (compGuess === userFirstNum) {
        out.innerHTML = 'Поражение! Компьютер угадал ваше число.';
    } else {
        out.innerHTML = getCowsBulls(number, compNum);
    }
}

function generateMainNumber() {
    let number = '';
    while (number.length < 4) {
        let digit = Math.floor(Math.random() * 10).toString();
        if (!number.includes(digit)) {
            number += digit;
        }
    }

    return number;
}
