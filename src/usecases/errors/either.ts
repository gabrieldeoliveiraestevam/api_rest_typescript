// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Either<L,R> = Failure<L,R> | Succes<L,R>;

export class Failure<L,R> {
    value: L
    constructor(value: L){
        this.value = value
    }

    isFailure(): this is Failure<L,R>{
        return true
    }

    isSucces(): this is Succes<L,R>{
        return false
    }
}

export class Succes<L,R> {
    value: R | undefined;
    constructor(value?: R){
        this.value = value
    }

    isFailure(): this is Failure<L,R>{
        return false
    }

    isSucces(): this is Succes<L,R>{
        return true
    }
}

export const failure = <L,R>(l: L): Either<L,R> => {
    return new Failure(l);
}

export const succes = <L,R>(r?: R): Either<L,R> => {
    return new Succes(r);
}