
declare namespace interfaces
{
    interface IAssertOption
    {
        mode?: types.AssertionMode;
        message?: string;
    }

    interface IVec2
    {
        x: number;
        y: number;
    }

    interface IVec3 extends IVec2
    {
        z: number;
    }

    interface IFraction
    {
        numerator: number;
        denominator: number;
    }

    interface IBezier
    {
        start: IVec2;
        mid: IVec2;
        end: IVec2;
    }

    interface IRooter
    {
        log(...params: any[]): void;
        warn(...params: any[]): void;
        error(...params: any[]): void;
        assert(cond: boolean | ( () => boolean ), options?: interfaces.IAssertOption): boolean;
    }
}

declare type AssertMode = 'crash' | 'break' | 'warn'
declare type ClassType<T> = {prototype: T}
declare type ConstructClass<T> = new () => T
declare type Callback = (data: interfaces.IBezier, dt: number) => interfaces.IVec2;

interface IUtils
{
    methods_as_string<T>(clasz: types.ClassType<T>): string[]

    remove_contain_char(target: string[], char: string[]): string[]
    shift<T>(array: T[], first: number, second: number, ref?: T[], option: interfaces.IAssertOption?): T[] 

    /**
     * @description
     * | Get the array which must contain the given data
     *
     * @param ret The sample to be checked.
     * @param target The target array need to be checked.
     * @param compasor A custom checker callback.
     *
     * @example
     * ```
     * interface Test
     * {
     *       id: number;
     *       data: string;
     * }
     *
     * const arr: Test[] = [{id: 2, data: 'Zero'    },
     *                      {id: 0, data: 'First'   },
     *                      {id: 1, data: 'Second'  },
     *                      {id: 0, data: 'Third'   },
     *                      {id: 0, data: 'INFINITE'}];
     *
     * const sample: Test = {id: 0, data: 'NaN'};
     * const compasor = (input: Test, index_data: Test) => {
     *       return input.id === index_data.id; //Compare the id.
     * }
     *
     * const result = pTS.utils.must_contain<Test>(sample, arr, compasor);
     *
     * // The result should be: [{id: 0, data: 'First'   },
     * //                        {id: 0, data: 'Third'   },
     * //                        {id: 0, data: 'INFINITE'}];
     *
     * ```
     */
    must_contain<T>(ret: T, target: T[], compasor?: UtilsComparator<T>): T[]

    /**
     * @description
     * | Get the array which must contain the given data
     *
     * @param sample The sample to be checked.
     * @param checker The target array need to be checked.
     * @param compasor A custom checker callback.
     *
     * @example
     * ```
     * interface Test
     * {
     *       id: number;
     *       data: string;
     * }
     *
     * const arr: Test[] = [{id: 2, data: 'Zero'    },
     *                      {id: 0, data: 'First'   },
     *                      {id: 1, data: 'Second'  },
     *                      {id: 0, data: 'Third'   },
     *                      {id: 0, data: 'INFINITE'}];
     *
     * const sample: Test = [{id: 0, data: 'NaN'} , {id: 1, data: 'NULL'}];
     * const compasor = (input: Test, index_data: Test) => {
     *       return input.id === index_data.id; //Compare the id.
     * }
     *
     * const result = pTS.utils.must_contain<Test>(sample, arr, compasor);
     *
     * // The result should be: [{id: 0, data: 'First'   },
     * //                        {id: 1, data: 'Second'  },
     * //                        {id: 0, data: 'Third'   },
     * //                        {id: 0, data: 'INFINITE'}];
     *
     * ```
     */
    includes_array<T>(sample: T[], checker: T[], compasor: UtilsComparator<T> = (input: T, index_data: T) => {return input === index_data}): T[]

    must_includes_array<T>(sample: T[], checker: T[], compasor: (checker: T[], index_data: T) => boolean = (checker: T[], index_data: T) => {return checker.includes(index_data)})

    is_deep_contain<T, K>(checker: K, target: T[], property: string): boolean

    quick_find<T>(checker: T, arr: T[])

    clone<T>(target: T, ...binding: any[])
}

interface ILogger
{
    assert_is_true(cond: unknown, option: interfaces.IAssertOption = interfaces.default_assert_option): asserts cond 
    
    assert_null<T>(cond: T, option?: interfaces.IAssertOption): asserts cond is NonNullable<T>

    assert_array_index<T>(array: T[], index: number, option?: interfaces.IAssertOption): void
    
    asserts_null(option: interfaces.IAssertOption, ...cond: any[])

    asserts_array_index(array: any[], option: interfaces.IAssertOption, ...index: number[])
}

interface IAxis
{
    bezier (C1: number, C2: number, C3: number, C4: number, t: number): number
    quad_curve(data: interfaces.IBezier, dt: number): interfaces.IVec2
    bezier_curve(data: interfaces.IBezier, delta: number): interfaces.IVec2
    array_bezier_curves(data: interfaces.IBezier, length: number): interfaces.IVec2[]
    array_quadratic_curves(data: interfaces.IBezier, length: number): interfaces.IVec2[]
}

interface INumeric
{
    /**
     * @description
     * | Convert boolean or string variable to number.
     * | Return `0` caught error.
     *
     * @param {boolean | string} target The target need to be converted to number. 
     *
     * @returns {number} Converted number.
     */
    to_number(target: boolean | string): number

    to_int(number: number): number
    
    is_number(target: any): target is number

    /**
     * @description
     * | 
     *
     */
    random_int(min: number, max: number): number

    /**
     * @description
     * | 
     *
     */
    random(min: number, max: number)

    /**
     * @description
     * | 
     * 
     */
    uun(): number

    /**
     * @description
     * | 
     *
     */
    float_rounding(num: number, rounding_num: number = 2): string
}

interface IJS 
{
    is_object(obj: any): obj is Object

    /**
     * @description
     * | Get the name of the object.
     * | If the target is `{}` or `Object`. `""` will be return. 
     *
     * @borrows Modified from <a href="http://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class">the code from stackoverflow post</a>
     *
     * @param {Object | Function} object Instance or constructor of the target object
     *
     * @returns {string} The name of the target object
     */
    get_class_name(object: Object | Function): string

    /**
     * @description
     * |
     *
     * @returns 
     */
    get_super(constructor: Function)

    /**
     * @description
     * | Checks whether the subclass is child of superclass or equals to superclass
     *
     * @param {constructor} subclass The constructor of the subclass.
     * @param {constructor} superclass The constructor of the target class.
     *
     * @returns {boolean} True if it is, False otherwise
     *
     */
    is_child_of(subclass: Function, superclass: Function): boolean

    get_template_type<T>(ctor: types.ConstructClass<T>)
}

interface IMath
{
    gcd(first: number, second: number)

    lcm(first: number, second: number)

    berize_curve(data: interfaces.IBezier, length: number): interfaces.IVec2[]

    quad_curve(data: interfaces.IBezier, length: number): interfaces.IVec2[]
}

interface IConstants
{
    class_name_tag: Readonly<string>;
    class_id_tag: Readonly<string>;
    INSTANCE_KEY: Readonly<string>;

    tiny: Readonly<number>;
    maximum: Readonly<number>;
}

declare interface ISupport
{
    numeric?: INumeric; 
    utils?: IUtils;
    logger?: ILogger;
    axis?: IAxis;

    constants?: IConstants
    js?: IJS
    math?: IMath
}

declare const pTSCreator: (key: keyof ISupport, data: any) => void

declare const pTSpace: ISupport;

