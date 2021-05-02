
export function pick<T, K extends keyof T = never>(object: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce((accumulator, key) => {
    return { ...accumulator, [key]: object[key] };
  }, {} as Pick<T, K>);
}