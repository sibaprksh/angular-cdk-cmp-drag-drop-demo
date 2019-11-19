import * as uuid from 'uuid';

import { DndService } from '../dnd.service';

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

        //DndService.setId(this.uId);
    }    
}