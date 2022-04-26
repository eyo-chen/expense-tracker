function mutipleArgsHelper(fn, ...args) {
  return args.map(fn);
}

export default mutipleArgsHelper;
