function mutipleArgsHelper(fn, ...args) {
  return args.map((arg) => fn(arg));
}

export default mutipleArgsHelper;
