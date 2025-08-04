
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

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.value;
      const lastChar = expression.slice(-1);
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

  function calculeazaTVA() {
    const pret = parseFloat(pretInput.value);
    const procent = parseFloat(procentTVA.value);

    if (isNaN(pret) || isNaN(procent)) return;

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
