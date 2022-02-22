function debounce(fn, ms) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout((_) => {
      timer = null;

      fn(...args);
      // fn.apply(this, arguments);
    }, ms);
  };
}

export default debounce;
