import {App, Foo} from './service/service'
import "reflect-metadata"
import "./service/utils"
import {Validators} from "./decorator/validators"

interface LabeledValue {
    label: string;
}

class MyLabel implements LabeledValue{
    label: string;
    constructor(l: string){
        this.label = l;
    }
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
    let app = new App("Foo", 1);
    console.log(app.Name);
    console.log(app.Type);
    console.log(app.getDiscription());
    console.log(new Foo());
}

printLabel(new MyLabel('MyLable-3'));

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
        console.log('redefine property');
        console.log(target === C.prototype);
        console.log(key);
        console.log(desc);
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

class C {
    foo: Function;
    @f()
    @g()
    method(@checker(5) arg: string): string {
        return "method in C";
    }

    get name(): string{
        return 'C Name';
    }
}

C.prototype.foo = function(){
    return "method foo of class C";
}

@Reflect.metadata('inClass', 'A')
class Test {
  @Reflect.metadata('inMethod', 'B')
  public hello(): string {
    return 'hello world';
  }
}

console.log(Reflect.getMetadata('inClass', Test)); // 'A'
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'
console.log(Reflect.getMetadata('design:type', new C(), 'method'));

console.log(Utils.toLowerDisplayName("Allen"));
console.log(new C().foo())
console.log(Validators.StringValidator)

class F {
    constructor(){
        console.log('constructor of f');
    }
}

console.log(new F());
console.log(F)
console.log(F.prototype.constructor)
console.log('F.prototype.constructor === F: ', F.prototype.constructor === F)
console.log('F.prototype.constructor.prototype === F.prototype: ', F.prototype.constructor.prototype === F.prototype)

let T = F.prototype.constructor;
let P = F;
console.log(new P())
console.log(T === P);

class TF extends C{
    tp = 'tp';

}

console.log(new C().method('abcaaaaa'));


let desc = Object.getOwnPropertyDescriptor(C.prototype, 'method');
console.log(desc.value());
desc.value = function(){
    return 'override';
};
console.log(desc.value());
console.log(new C().method(''));
console.log(Object.getOwnPropertyDescriptor(C.prototype, 'method').value());
console.log(Object.getOwnPropertyDescriptor(C.prototype, 'method') === desc);
console.log(Object.getOwnPropertyDescriptor(C.prototype, 'method') === Object.getOwnPropertyDescriptor(C.prototype, 'method'));


// Object.defineProperty(C.prototype, 'method', {
//     value: function(){
//         return 'new method';
//     }
// });
console.log(new C().method(''));