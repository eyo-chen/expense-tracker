function throttle(func, delay) {
  let wait = false;
  let latestArg = null;

  function timeoutFunc() {
    if (!latestArg) {
      wait = false;
    } else {
      func.call(this, ...latestArg);
      latestArg = null;
      setTimeout(timeoutFunc, delay);
    }
  }

  return function (...args) {
    if (wait) {
      latestArg = args;
      return;
    }

    func.call(this, ...args);
    wait = true;

    setTimeout(timeoutFunc, delay);
  };
}

export default throttle;
