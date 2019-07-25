import "reflect-metadata"

const V_KEYS = {
    REQUIRED: Symbol("required"),
    MAXLEN: Symbol("maxlen")
};
const VALIDATORS = {
    [V_KEYS.REQUIRED]: function(args: any[], paramIdxes: []){
        for(var i in paramIdxes){
            let idx = paramIdxes[i];
            if(args[idx] === undefined){
                throw new Error(`parameter idex ${idx} is required`);
            }
        }
    },
    [V_KEYS.MAXLEN]: function(args: any[], meta: any){
        for(var i in meta){
            if(meta.hasOwnProperty(i)){
                if(args[i].length > meta[i]){
                    throw new Error(`max length[${meta[i]}] for parameter ${i} exceeded`)
                }
            }
        }
    }
};
/**
 * method decorator
 * @param target 
 * @param key 
 * @param desc 
 */
export function Validate(target: any, key: string, desc: PropertyDescriptor){
    let oriFunc = desc.value;
    desc.value = function(){
        for(var k in V_KEYS){
            if(V_KEYS.hasOwnProperty(k)){
                let meta = Reflect.getOwnMetadata(V_KEYS[k], target, key);
                if(meta){
                    let v = VALIDATORS[V_KEYS[k]];
                    if(typeof v !== 'function'){
                        throw new Error(`no validator for ${target[key]} of check ${V_KEYS[k]}`)
                    }
                    v.call(null, arguments, meta);
                }

            }
        }
        return oriFunc.apply(this, arguments);
    }
}

export function Required(target: any, key: string, paramIdx: number){
    let meta = Reflect.getOwnMetadata(V_KEYS.REQUIRED, target, key) || [];
    meta.push(paramIdx);
    Reflect.defineMetadata(V_KEYS.REQUIRED, meta, target, key);
}

export function MaxLen(len: number): ParameterDecorator{
    return (target: any, key: string, paramIdx: number) => {
        let meta = Reflect.getOwnMetadata(V_KEYS.MAXLEN, target, key) || {};
        meta[paramIdx] = len;
        Reflect.defineMetadata(V_KEYS.MAXLEN, meta, target, key);
    }
}

export function Log(target: any, key: string, desc: PropertyDescriptor){
    // let ori = desc.value;
    // desc.value = function(){
    //     console.log(`method ${key} in ${this} is called`);
    //     return ori.apply(this, arguments);
    // };
    decorate(target, key, desc, function(){
        console.log(`method ${key} in ${this} is called`);
    });
}

export function Authenticate(target: any, key: string, desc: PropertyDescriptor){
    decorate(target, key, desc, function(){
        console.log(`method ${key} in ${this} is called`);
    });
}

function decorate(target: any, key: string, desc: PropertyDescriptor, newFunc: () => void){
    let ori = desc.value;
    desc.value = function(){
        newFunc.apply(this, arguments);
        return ori.apply(this, arguments);
    };
}