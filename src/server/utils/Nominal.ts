
type Nominal<T, Name extends string | number | Symbol> = T & { __name: Name };
