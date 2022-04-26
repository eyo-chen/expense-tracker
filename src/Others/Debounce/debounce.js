function debounce(fn, ms) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout((_) => {
      timer = null;

      fn.call(this, ...args);
    }, ms);
  };
}

export default debounce;
