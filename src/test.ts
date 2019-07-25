import {Required, Validate, MaxLen} from "./decorator/decortors"

class Foo{
    @Validate
    foo(@Required @MaxLen(5) v: string): string{
        return 'foo';
    }
}

let f = new Foo();

try{
    console.log(f.foo(''));
}catch(e){
    console.log(e);
}
try{
    console.log(f.foo('123456'));
}catch(e){
    console.error(e);
}
try{
    console.log(f.foo(undefined));
}catch(e){
    console.error(e);
}

class P1{
    innerCall(){
        return `inner call in class P1`;
    }
}

class P2 extends P1{
    foo: string;
    constructor(foo: string){
        super();
        this.foo = foo;
    }
}

class Generic<T extends new (foo: string) => P1>{
    t: T;
    setT(t: T): Generic<T>{
        this.t = t;
        return this;
    }
    call(){
        console.log(new this.t('aa').innerCall());
    }
}

new Generic().setT(P2).call();
new Generic().setT(P1).call();