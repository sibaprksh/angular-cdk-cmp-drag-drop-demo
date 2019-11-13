import * as uuid from 'uuid';

export class Item {
    name: string;
    clazz: any;
    selector: any;
    uId: string;
    children: Item[];

    constructor(options: {
        name: string,
        clazz?: any,
        selector?: any,
        children?: Item[] 
    }) {
        this.name = options.name;
        this.clazz = options.clazz;
        this.selector = options.selector;
        this.uId = uuid.v4();
        this.children = options.children || [];
    }    
}