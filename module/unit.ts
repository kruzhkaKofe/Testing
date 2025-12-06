export function add(a: number, b: number): number {
  return a + b;
}

export function mergeObject<
  F extends object,
  S extends object
>(first: F, second: S): F & S {
  return {
    ...first,
    ...second
  }
}


export function useCalculate() {
  function sum() {

  }



  return {

  }
}
