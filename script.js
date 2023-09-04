'use strict';

//Elements selection
const userAge = document.querySelector('.user_age .input_box');
const userHeight = document.querySelector('.user_height .input_box');
const userMass = document.querySelector('.user_mass .input_box');
const inputBoxes = document.querySelectorAll('.input_box');
const btnMan = document.querySelector('#man');
const btnWoman = document.querySelector('#woman');
const btnCount = document.querySelector('.c_btn');
const btnClear = document.querySelector('.clear_button');
const resultView = document.querySelector('.result_view');
const rad = document.getElementsByName('action');
const equalLabel = document.querySelector('#equal_w');
const lowerLabel = document.querySelector('#lower_w');
const riseLabel = document.querySelector('#rise_w');

let sex, actionM, equal_w, lower_w, rise_w, radNumber;
// initial conditions
const initialConditions = function () {
  userAge.value = '';
  userHeight.value = '';
  userMass.value = '';
  console.log(rad);
  rad[0].checked = true;
  sex = 0;
  equal_w = 0;
  lower_w = 0;
  rise_w = 0;
  actionM = [1.2, 1.375, 1.55, 1.7, 1.9];
  resultView.classList.add('hidden');
};
initialConditions();

//main code

const sexEl = document.querySelectorAll('.sex');
for (let value of sexEl) {
  value.addEventListener('click', function (e) {
    e.preventDefault();
    sex === 0 ? 1 : 0;
    console.log(sex);
    sexEl.forEach(function (value) {
      value.classList.remove('active_sex');
    });
    this.classList.add('active_sex');
  });
}
const getRad = function () {
  for (let i = 0; i < rad.length; i++) {
    if (rad[i].checked) {
      radNumber = actionM[i];
    }
  }
};

btnCount.addEventListener('click', function (e) {
  e.preventDefault();
  getRad();
  if (
    !userAge.value == '' &&
    !userHeight.value == '' &&
    !userMass.value == ''
  ) {
    resultFormula(sex, userAge, userHeight, userMass);
    equalLabel.textContent = equal_w + ' ккал';
    lowerLabel.textContent = lower_w + ' ккал';
    riseLabel.textContent = rise_w + ' ккал';
    resultView.classList.remove('hidden');
  }
  for (let value of inputBoxes) {
    if (value.value == '') {
      value.classList.add('alert_input');
    }
  }
});
for (let value of inputBoxes) {
  value.addEventListener('input', function () {
    this.value = this.value.replace(/[^\d]+/, '');
  });
}

inputBoxes.forEach(function (value) {
  value.addEventListener('blur', function () {
    console.log('blur');
    for (let value of inputBoxes) {
      if (!value.value == '') {
        value.classList.remove('alert_input');
      }
    }
  });
});

btnClear.addEventListener('click', function (e) {
  e.defaultPrevented();
  resultView.classList.add('hidden');
});

const resultFormula = function (sex, userAge, userHeight, userMass) {
  if (sex == 0) {
    equal_w = (
      radNumber *
      (66.5 +
        13.75 * userMass.value +
        5.003 * userHeight.value -
        6.775 * userAge.value)
    ).toFixed(0);
  } else {
    equal_w = (
      radNumber *
      (655.1 +
        9.563 * userMass.value +
        1.85 * userHeight.value -
        4.676 * userAge.value)
    ).toFixed(0);
  }
  lower_w = (equal_w * 0.86).toFixed(0);
  rise_w = (equal_w * 1.1).toFixed(0);
};
