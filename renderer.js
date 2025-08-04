document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("calcDisplay");
  const buttons = document.querySelectorAll(".btn[data-value]");
  const clear = document.getElementById("clear");
  const backspace = document.getElementById("backspace");
  const equal = document.getElementById("equal");
  const normalMode = document.getElementById("normalMode");
  const tvaMode = document.getElementById("tvaMode");
  const calculator = document.getElementById("calculator");
  const tvaCalculator = document.getElementById("tvaCalculator");

  normalMode.onclick = () => {
    calculator.style.display = "block";
    tvaCalculator.style.display = "none";
  };

  tvaMode.onclick = () => {
    calculator.style.display = "none";
    tvaCalculator.style.display = "block";
  };

  let expression = "";

  function updateDisplay() {
    display.value = expression;
  }

  function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
  }

  // Functie care extrage ultimul numar din expresie
  function getLastNumber(expr) {
    const parts = expr.split(/[\+\-\*\/]/);
    return parts[parts.length - 1];
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.value;
      const lastChar = expression.slice(-1);

      if (value === ".") {
        const lastNumber = getLastNumber(expression);
        // Dacă ultimul număr are deja virgulă, nu adăuga altă virgulă
        if (lastNumber.includes(".")) {
          return;
        }
        // Dacă expresia e goală sau ultimul caracter este operator, adaugă "0."
        if (expression === "" || isOperator(lastChar)) {
          expression += "0.";
          updateDisplay();
          return;
        }
      }

      if (isOperator(value) && isOperator(lastChar)) {
        expression = expression.slice(0, -1) + value;
      } else {
        expression += value;
      }
      updateDisplay();
    });
  });

  clear.onclick = () => {
    expression = "";
    updateDisplay();
  };

  backspace.onclick = () => {
    expression = expression.slice(0, -1);
    updateDisplay();
  };

  equal.onclick = () => {
    try {
      expression = eval(expression).toString();
    } catch {
      expression = "Error";
    }
    updateDisplay();
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      backspace.click();
    } else if (e.key === "Delete") {
      clear.click();
    } else if (e.key === "Enter") {
      equal.click();
    } else if (!isNaN(e.key) || isOperator(e.key) || e.key === ".") {
      let event = new Event("click");
      document.querySelector(`.btn[data-value="${e.key}"]`)?.dispatchEvent(event);
    }
  });

const pretInput = document.getElementById("pretInput");
const procentTVA = document.getElementById("procentTVA");
const pretCuTVA = document.getElementById("pretCuTVA");
const pretFaraTVA = document.getElementById("pretFaraTVA");
const valoareTVA1 = document.getElementById("valoareTVA1");
const valoareTVA2 = document.getElementById("valoareTVA2");

function sanitizeValue(val) {
  // Elimină tot ce nu e cifră sau punct
  val = val.replace(/[^0-9.]/g, '');
  // Permite un singur punct
  const parts = val.split('.');
  if (parts.length > 2) {
    val = parts[0] + '.' + parts.slice(1).join('');
  }
  return val;
}

function calculeazaTVA() {
  // Curățare și setare valori pentru ambele inputuri
  let valPret = sanitizeValue(pretInput.value);
  if (valPret !== pretInput.value) pretInput.value = valPret;

  let valProcent = sanitizeValue(procentTVA.value);
  if (valProcent !== procentTVA.value) procentTVA.value = valProcent;

  if (valPret === '' || valProcent === '') {
    pretCuTVA.value = '';
    valoareTVA1.value = '';
    pretFaraTVA.value = '';
    valoareTVA2.value = '';
    return;
  }

  const pret = parseFloat(valPret);
  const procent = parseFloat(valProcent);

  if (isNaN(pret) || isNaN(procent)) {
    pretCuTVA.value = '';
    valoareTVA1.value = '';
    pretFaraTVA.value = '';
    valoareTVA2.value = '';
    return;
  }

  const pretCu = pret + (pret * procent / 100);
  const valoareTVA = pretCu - pret;
  const pretFara = pret / (1 + procent / 100);
  const valoareTVAdinCu = pret - pretFara;

  pretCuTVA.value = pretCu.toFixed(2);
  valoareTVA1.value = valoareTVA.toFixed(2);
  pretFaraTVA.value = pretFara.toFixed(2);
  valoareTVA2.value = valoareTVAdinCu.toFixed(2);
}

pretInput.addEventListener("input", calculeazaTVA);
procentTVA.addEventListener("input", calculeazaTVA);


});
