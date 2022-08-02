const config = {
  point: true,
  minus: true,
};

const install = (Vue) => {
  Vue.directive('input-number', {
    bind(el, binding, node) {
      console.log('input-number');
      doWork(el, binding, node);
    },
  });
};

const doWork = (el, binding, node) => {
  const input = el.tagName === 'INPUT' ? el : el.querySelector('input');
  if (!input) {
    return;
  }
  input.style.imeMode = 'disabled';
  input.onkeypress = (e) => {
    const flag = isNumber(e) || isBackSpace(e) || isPoint(e) || isMinus(e);
    const notAllowedPointFlag = isPoint(e) && !canInputPoint(input, e, binding);
    if (!flag || notAllowedPointFlag) {
      e.preventDefault();
    }
  };
  // 对输入法处理
  input.onkeyup = (e) => {
    let minusFlag = false;
    if (input.value && input.value[0] === '-') {
      minusFlag = canInputMinus(input, e, binding);
    }
    console.log(minusFlag);
    input.value = (minusFlag ? '-' : '') + input.value.replace(/[^\d.]/g, '');
  };
};

// 数字 0~9(48 ~ 57, 96 ~105)
const isNumber = (e) => {
  return (
    (e.keyCode >= 48 && e.keyCode <= 57) ||
    (e.keyCode >= 96 && e.keyCode <= 105)
  );
};

// 回退 BackSpace(8)
const isBackSpace = (e) => {
  return e.keyCode === 8;
};

// 点 .
const isPoint = (e) => {
  return e.key === '.';
};

// 负号 -
const isMinus = (e) => {
  return e.key === '-';
};

// 允许输入点
const canInputPoint = (input, e, binding) => {
  if (!(binding.value || config).point) {
    return false;
  }
  return input.value !== '' && !input.value.includes('.');
};

// 允许输入负号
const canInputMinus = (input, e, binding) => {
  return (binding.value || config).minus;
};

export default install;
