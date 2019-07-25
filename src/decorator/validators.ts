export interface Validator {
    validate(value: any): boolean;
}
export namespace Validators{

    export class StringValidator implements Validator{
        validate(value: any): boolean {
            if(typeof value !== 'string'){
                console.log('need a string value here');
                return false;
            }
            return value.trim().length > 0;
        }
    }

    export class NumberValidator implements Validator{
        validate(value: any): boolean {
            if(typeof value !== 'number'){
                console.log('need a numner value here');
                return false;
            }
            return value > 0;
        }
    }

}