import "reflect-metadata"

function checker(len: number): ParameterDecorator{
    // let key = '__checker__';
    return (target, key, paramIdx) => {
        // Reflect.defineMetadata(key, )
        let desc = Object.getOwnPropertyDescriptor(target, key);
        console.log('call checker decorator');
        let oriMethod = desc.value;
        desc.value = function(){
            console.log('checker in new function');
            if(arguments[paramIdx] === undefined){
                throw new Error(`parameter ${paramIdx} is missing`);
            }
            if(typeof arguments[paramIdx] !== 'string'){
                throw new Error(`a string is required for parameter ${paramIdx}`);
            }
            if(len < arguments[paramIdx].length){
                throw new Error(`parameter ${paramIdx} max length exceeded`);
            }
            return oriMethod.apply(this, arguments);
        }
        desc['__T'] = 't';
        return desc;
    };
}

function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class Foo {
    @f()
    @g()
    method(@checker(5) arg: string): string {
        return "method in C";
    }
    get name(): string{
        return 'C Name';
    }
}

console.log(new Foo().method('abcdefgh'));