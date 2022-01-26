function coerceNumber(...args) {
  return args.map((arg) => Number(arg));
}

export default coerceNumber;
