
type UtilsComparator<T> = (input: T, index_data: T) => boolean;

class pTSUtils implements IUtils
{
    methods_as_string<T>(clasz: ClassType<T>): string[]
    {
        const prototype = clasz.prototype;
        return Object.getOwnPropertyNames(prototype).filter( p => typeof prototype[p] === 'function')
    }

    remove_contain_char(target: string[], char: string[]): string[]
    {
        const vamps = target.filter( ret =>
        {
            for(const temp of char)
            {
                if(ret.includes(temp)) return false; 
            }
            return true;
        });

        return vamps;
    }


    shift<T>(array: T[], first: number, second: number, ref?: T[], option: interfaces.IAssertOption = {mode: 'crash', message: ''}): T[] 
    {
        if(first === second) return array;

        pTSpace.logger.asserts_array_index(array, option, first, second);

        const temp = array[first];

        if(first < second)
        {
            for(let i = first + 1; i <= second; i++) array[i - 1] = array[i];
        }
        else 
        {
            for(let i = first; i !== second; i--) array[i] = array[i-1];
        }

        array[second] = temp;

        if(!!ref) ref = array;
        return array;
    }
    
    
    must_contain<T>(ret: T, target: T[], compasor?: UtilsComparator<T>): T[]
    {
        const vamps = target.filter( temp =>
        {
            if(!!compasor) return compasor(ret, temp);

            return temp === ret;
        })
        return vamps;
    }

    includes_array<T>(sample: T[], checker: T[], compasor: UtilsComparator<T> = (input: T, index_data: T) => { return input === index_data }): T[]
    {
        const arr: T[] = [];

        for(const ret of checker) {
            if(sample.some( s => compasor(s, ret) )) arr.push(ret);
        }

        return arr;
    }

    must_includes_array<T>(sample: T[], checker: T[], compasor: (checker: T[], index_data: T) => boolean = (checker: T[], index_data: T) => { return checker.includes(index_data)})
    {
        return sample.every( e => compasor(checker, e) );
    }

    /**
     * @deprecated  Using `Array.includes(ret)` instead.
     */
    is_contain<T>(ret: T, target: T[]): boolean
    {
        return this.must_contain(ret, target).length > 0;
    }

    is_deep_contain<T, K>(checker: K, target: T[], property: string): boolean
    {
        if(target.length <= 0) return false;
        if(typeof checker != typeof target[0][property]) return false;

        const vamps = target.filter( ret =>
        {
            if (checker === ret[property]) return true;
            return false;
        });

        return vamps.length > 0;
    }

    quick_find<T>(checker: T, arr: T[])
    {
        for(const ret of arr)
        {
            if(checker === ret) return true;
        }

        return false;
    }
    
    clone<T>(target: T, ...binding: any[])
    {
        let temp = target.constructor;

        let cloner = new (temp.bind(target, ...binding));

        for(let att in target)
        {
            if(typeof target[att] === 'object') cloner[att] === this.clone(target[att], ...binding);
            else cloner[att] = target[att];
        }
    }
}

pTSCreator('utils', new pTSUtils())
 

