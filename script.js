const jsForm  = document.querySelector('#jsValidation');
const emailInput = document.querySelector('#emailInput');
const emailMsg = document.querySelector('#emailInput + span#emailMsg');
const countryInput = document.querySelector('#countryInput');
const countryMsg = document.querySelector('#countryInput + span#countryMsg');
const zipInput = document.querySelector('#zipInput');
const zipMsg = document.querySelector('#zipInput + span#zipMsg');
const pwInput = document.querySelector('#pwInput');
const pwMsg = document.querySelector('#pwInput + span#pwMsg');
const pwConfInput = document.getElementById("pwConfInput");
const pwConfMsg = document.querySelector('#pwConfInput + span#pwConfMsg');

const emailPattern = /[a-z0-9_%+-]+(.[a-z0-9_%+-]+)*@[a-z0-9.-]+\.[a-z]{2,}$/;
const countryPattern = /[A-Z][a-z]+/;
const zipPattern = /\p{L}\d\p{L}\s?\d\p{L}\d/iu;
const pwPattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()`~]).{8,}$/; 

function testInput(string) {
  eval(`targetInput = ${string}Input;`);
  eval(`targetMsg = ${string}Msg;`);
  eval(`targetPattern = ${string}Pattern;`);
  if(targetInput.validity.tooShort || targetInput.validity.valueMissing) {
    targetMsg.textContent = `Too short. Value should be at least ${ targetInput.minLength } characters..`;
    targetMsg.className = 'errorMsg';  
    targetInput.className = 'invalidInput';
    return false;
  } else if (!targetPattern.test(targetInput.value) || targetInput.validity.typeMismatch) {
    targetMsg.textContent = `Invalid ${string}`; 
    targetMsg.className = 'errorMsg';  
    targetInput.className = 'invalidInput';
    return false;
  } else {
    targetMsg.textContent = `Valid ${string}`;
    targetMsg.className = 'validMsg';
    targetInput.className = 'validInput';
    return true;
  }
}

function confirmPassword(){
  if(pwInput.value === pwConfInput.value){
    pwConfMsg.textContent = 'Password confirmed.';
    pwConfMsg.className = 'validMsg';
    pwConfInput.className = 'validInput';
    return true;
  } else {
    pwConfMsg.textContent = 'Password does not match.';
    pwConfMsg.className = 'errorMsg';
    pwConfInput.className = 'invalidInput';
    return false;
  }
}

emailInput.addEventListener('input', () => {
  testInput("email");
});

countryInput.addEventListener('input', () => {
  testInput("country");
});

zipInput.addEventListener('input', () => {
  testInput("zip");
});

pwInput.addEventListener('input', () => {
  testInput("pw");
});

pwConfInput.addEventListener('input', () => {
  confirmPassword();
});

jsForm.addEventListener('submit', function (event) {
  // can replace "checkValidity()" with "validity.valid"
  if(!emailInput.checkValidity() || !testInput("email")) { 
    alert(` Email address error: ${emailInput.validationMessage}`);
    emailInput.focus();
    event.preventDefault();
  }
  else if(!countryInput.checkValidity() || !testInput("country")) { 
    alert(` Country error: ${countryInput.validationMessage}`);
    countryInput.focus();
    event.preventDefault();
  }
  else if(!zipInput.checkValidity() || !testInput("zip")) { 
    alert(` Zip code error: ${zipInput.validationMessage}`);
    zipInput.focus();
    event.preventDefault();
  }
  else if(!pwInput.checkValidity() || !testInput("pw")) { 
    alert(` Password error: ${pwInput.validationMessage}`);
    pwInput.focus();
    event.preventDefault();
  }
  else if(!confirmPassword()) { 
    alert(` Passwords do not match. Please try again.`);
    pwConfInput.focus();
    event.preventDefault();
  }
  else {
    alert(`Thank you! Your form has been successfully submitted.`);
  }
});

