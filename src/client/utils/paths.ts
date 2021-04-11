
// https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgApzACwCIQM4JTAAOYwA9iMgN4BQyyIcAthAFzJ5hEgDmA3PU4BXAEboseDgGUxEzHkEBfWrTABPYilniMC5AF5kUCHAAmlADbrkACnm4CRUhSoAfTt1C8AlAG0AXUFVGGEQBDJKZAArclBbADok4j0pTx5eQJ8aIRMwYSgqFMkE2PiAcgB6cp8Ek2JLRAhbEAgAd2QAJQheAFEAD2JbKuoARgAaJXLx5HLeGpmqmuUQsIjXZGKFAHkYAB55PGQIfsgQMyOdQ4A+Wy20w5mUk3B5Q1nq7LoGPIKi1LqEDMwiQtlsiAQTz02QM1xyDAYwBgdg0WnIyK2hgMRnKXAyNXhCJ+EHyhUJRIYSQSEPGQgpyD8WwCHGoaAAggAVAASHDKIDucBeYHkUKw2RU9IlCKlDAgljwKG+FN+ZKV9KpNLpFMZegSTFYzM2qV2AqwCTwclSMz5AqFIqNZv1EB8Pi1DBlyClSlpRLVCNQnJ5Rrtei1UtdKloCEoXGM5HIYHe9xNfiEfqdHHKlnICDglmmWotukkHFT9LmLAg5S1ASE3rTWozsysoCrPoRRcOpbds14lYL9L9RKbWfIolE6gH9JExYU3enCPKUHjzGrC9rkprddoAWQcCO0ZAXB8wUPeHIlggCWzvFsy4TJ9oQA
// https://www.typescriptlang.org/play?#code/FAMwrgdgxgLglgewgAgFYLhAFAOjwBwEMYALAZwC5kyYAnTAcwG0BdASmQG9hllaBTGGFooipMjnSYsAcgD0MtjgH4ANoSj8sEfgHdkAJX4MAogA98suZwCMAGgC+Mu8hkNFL+YoDcwB8GBMGH5aEA1+ZAAFYnIuHiiAQQAVAAkqGnoIBl9-YCgkGmRMfDAYZABeON5I5LTXBTt41QQoQlUqbl5q2qoZZtbVZ3jeBkIAW34O4a6a1N7RiZlp-14HRt4kVUxJqpme103toa7kZoAjM4BPKZPuuddzq+Pb2gQEMZvbu7qZV-elr4rLpraYLHadW6zH5ggHA+L+XLgaDwJDIMTkADyIAAPJFkPwzMEIAATMhRGJkAB8WHRlCiLiIAggMGipAqaIpOChbCoeIh+QghXR7Kk2EZ-GZrJIDM53ICvAEQhEyAxZ1Q-FgOAldDg-DINIpSgExLAmiwWA0UBcTHwr3wLgAbm0wPx2BVKbsFYJhCgISc8DhLetbja7SwqLaEPgKuVKjIoTJkAB+DlsiMUrFYJ2qF0y0hsZbw4O8P17e7iyUxZbIQhkyLxNg5AICwp-MqVWmZ4qlRt5AoIVT8HDNBhYNu9oA

function join(...paths: string[]) {
  return paths.join('/').replace(new RegExp('/{1,}', 'g'), '/');
}

interface Paths {
  PATH: string;
}

export function pathsOf<P extends Paths>(paths: P, parentPath = paths.PATH): P {
  const path = join(parentPath, paths.PATH)

  return Object.entries(paths).reduce((acc, [prop, value]) => {
    return {
      ...acc,
      [prop]: prop === 'PATH' ? path : pathsOf(value, path)
    }
  },
    {
      PATH: parentPath
    } as P
  );
}
