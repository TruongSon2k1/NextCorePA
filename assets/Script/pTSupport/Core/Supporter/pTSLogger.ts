   
const default_assert_option: interfaces.IAssertOption = {
    mode: 'crash',
    message: ''
}

class pTSLogger implements ILogger
{
    assert_is_true(cond: unknown, option: interfaces.IAssertOption = default_assert_option): asserts cond 
    {
        if(!cond)
        {
            const msg = `Assertion failed: ${option.message ?? '[no-message]'}`;
            switch(option.mode)
            {
                case "crash":
                    throw new Error(msg);
                case "break":
                    console.warn(msg);
                    debugger;        
                    return;
                case "warn":
                    console.warn(msg);
                    return;
            }
        }
    }
    
    assert_null<T>(cond: T, option?: interfaces.IAssertOption): asserts cond is NonNullable<T>
    {
        this.assert_is_true(!(cond === null || cond === undefined), option);
    }

    assert_array_index<T>(array: T[], index: number, option?: interfaces.IAssertOption): void
    {
        this.assert_is_true(index >= 0 && index < array.length, { mode: option.mode, message: `The array's index at ${index} is out of range: [0 - ${array.length}]`});
    }
    
    asserts_null(option: interfaces.IAssertOption, ...cond: any[])
    {
        for(const ret of cond)
        {
            this.assert_null(ret, option);
        }
    }

    asserts_array_index(array: any[], option: interfaces.IAssertOption, ...index: number[])
    {
        for(const ret of index)
        {
            this.assert_array_index(array, ret, option);
        }
    }
}

pTSCreator('logger', new pTSLogger());
