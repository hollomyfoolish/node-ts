declare var global: any;
namespace Utils{
    export function toLowerDisplayName(s: string): string{
        return `I am a lower s: ${s}`;
    }
}

const root = typeof global === "object" ? global :
typeof self === "object" ? self :
typeof this === "object" ? this :
Function("return this;")();

root.Utils = Utils;

// function decorator(target: Function): void;
// function decorator(target: any, propertyKey: string | symbol): void;
// function decorator(target: any, propertyKey?: string | symbol): void {

// }