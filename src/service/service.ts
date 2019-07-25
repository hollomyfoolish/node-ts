export class App{
    private name: String;
    private type: number;
    constructor(name: String, type: number){
        this.name = name;
        this.type = type;
    }
    get Name(): String {
        return this.name;
    }
    get Type(): number{
        return this.type;
    }
    getDiscription(): String{
        return `[${this.Name}, ${this.type}]`;
    }
}

export class Foo{}