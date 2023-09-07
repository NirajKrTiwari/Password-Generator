const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-btn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLength = 10;
let checkCount = 1;

handleSlider();
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize= ((passwordLength-min)*100/(max-min))+"% 100%";  
}
function setIndicator(color) {
    indicator.style.backgroundColor = color;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generteRandomNumber() {
    return getRndInteger(0, 9);
}
function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}
function generateRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[getRndInteger(0, symbols.length)];
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        // copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    console.log("clicked")
    console.log(passwordDisplay.value);
    if (passwordDisplay.value)
    {
        copyContent();
        console.log("Check")
    }
})

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    })
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

generateBtn.addEventListener('click', (e) => {
    if (checkCount <= 0)
        return;
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
    password = "";
    for (let i = 0; i < passwordLength; i++) {
        if (uppercaseCheck.checked && password.length < passwordLength) {
            password += generateUpperCase();
        }
        if (lowercaseCheck.checked && password.length < passwordLength) {
            password += generateLowerCase();
        }
        if (numbersCheck.checked && password.length < passwordLength) {
            password += generteRandomNumber();
        }
        if (symbolsCheck.checked && password.length < passwordLength) {
            password += generateRandomSymbol();
        }
    }
    password=shufflePassword(password);
    passwordDisplay.value = password;
    calcStrength();
}
)

function shufflePassword(shufflePassword)
{
    let passwordArray=shufflePassword.split("");
    for(let i=0;i<passwordArray.length;i++)
    {
        let j=getRndInteger(0,passwordArray.length);
        let temp=passwordArray[i];
        passwordArray[i]=passwordArray[j];
        passwordArray[j]=temp;
    }
    return passwordArray.join("");

}
