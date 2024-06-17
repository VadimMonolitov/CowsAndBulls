let userFirstNum;
let compNum = generateMainNumber();
let guessCount = 0;
console.log(`Число компьютера: ${compNum}`);

while (true) {
    userFirstNum = prompt('Введите ваше число');
    if (userFirstNum.length !== 4 || new Set(userFirstNum).size !== 4 || userFirstNum.includes('.')) {
        alert('Повторите ввод: число должно содержать ровно 4 уникальные цифры');
    } else {
        console.log(`Число пользователя: ${userFirstNum}`);
        break;
    }
}

function disableButton() {
    document.getElementById('guessButton').disabled = true;
}

function getCowsBulls(num, mainNum) {
    let cows = 0, bulls = 0;

    for (let i = 0; i < num.length; i++) {
        const index = mainNum.indexOf(num[i]);
        if (index === i) {
            bulls++;
        } else if (index > -1) {
            cows++;
        }
    }

    return { bulls, cows };
}

function createImage(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.width = 50;
    img.height = 50;
    return img;
}

function displayImages(result, element) {
    element.innerHTML = '';

    for (let i = 0; i < result.bulls; i++) {
        const img = createImage('image/bull.png', 'Бык');
        element.appendChild(img);
    }

    for (let i = 0; i < result.cows; i++) {
        const img = createImage('image/cow.png', 'Корова');
        element.appendChild(img);
    }
}

function guess() {
    guessCount++;
    let compGuess = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');

    if (guessCount === 14) {
        compGuess = userFirstNum;
    }

    let compOutput = document.getElementById('compOutput');
    const compResult = getCowsBulls(compGuess, userFirstNum);
    compOutput.innerHTML = `${compGuess} - ${compResult.bulls} быков, ${compResult.cows} коров`;

    displayImages(compResult, document.querySelector('.comp-result'));

    let number = document.getElementById('myNum').value;
    let userOutput = document.getElementById('userOutput');

    if (number.length !== 4 || isNaN(number) || userFirstNum.includes('.')) {
        userOutput.innerHTML = 'Пожалуйста, введите четырёхзначное число.';
        return;
    }
    const userResult = getCowsBulls(number, compNum);
    userOutput.innerHTML = `${number} - ${userResult.bulls} быков, ${userResult.cows} коров`;

    displayImages(userResult, document.querySelector('.user-result'));

    if (number === compNum) {
        out.innerHTML = 'Победа! Число угадано';
        disableButton();
    } else if (compGuess === userFirstNum) {
        userOutput.innerHTML = 'Поражение! Компьютер угадал ваше число.';
        disableButton();
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
