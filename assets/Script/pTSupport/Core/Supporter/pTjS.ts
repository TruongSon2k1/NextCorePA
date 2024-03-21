

class pTjS implements IJS
{
    is_object(obj: any): obj is Object {
        return obj instanceof Object || typeof obj === 'object';
    }

    get_class_name(object: Object | Function): string {
        if (typeof object === 'function') {
            const prototype = object.prototype;

            const tag = pTSpace.constants.class_name_tag;

            if (prototype && prototype.hasOwnProperty(tag) && prototype[tag]) {
                return prototype[tag];
            }

            let ret: string = "";

            if (object.name) {ret = object.name}

            if (object.toString) {
                let arr: any;
                const str = object.toString();

                if (str.charAt(0) === '[') arr = str.match(/\[\w+\s*(\w+)\]/);
                else arr = str.match(/function\s*(\w+)/);

                if (arr && arr.length === 2) ret = arr[1];
            }

            return ret != 'Object' ? ret : "";
        }
        else if (object && object.constructor) return this.get_class_name(object.constructor)

        return '';
    }

    get_super(constructor: Function) {
        const prototype = constructor.prototype;
        const dunder_prototype = prototype && Object.getPrototypeOf(prototype);

        return dunder_prototype && dunder_prototype.constructor;
    }

    is_child_of(subclass: Function, superclass: Function): boolean {
        if (subclass && superclass) {
            if (typeof subclass !== 'function') return false;
            if (typeof superclass !== 'function') return false;

            if (subclass === superclass) return true;

            while (true) {
                subclass = this.get_super(subclass as Function);

                if (!subclass) return false;

                if (subclass === superclass) return true;
            }
        }

        return false;
    }

    get_template_type<T>(ctor: ConstructClass<T>) {
        return typeof (new ctor())
    }
}


pTSCreator('js', new pTjS())
