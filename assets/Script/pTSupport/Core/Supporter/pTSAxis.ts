
class pTSAxis implements IAxis
{
    bezier (C1: number, C2: number, C3: number, C4: number, t: number): number
    {
        var t1 = 1 - t;
        return t1 * (t1 * (C1 + (C2 * 3 - C1) * t) + C3 * 3 * t * t) + C4 * t * t * t;
    }

    quad_curve(data: interfaces.IBezier, dt: number): interfaces.IVec2
    {
        const temp = 1 - dt;
        let x = ( temp * temp * data.start.x ) + ( 2 * temp * dt * data.mid.x ) + ( dt * dt * data.end.x )
        let y = ( temp * temp * data.start.y ) + ( 2 * temp * dt * data.mid.y ) + ( dt * dt * data.end.y )
        return { x: x, y: y }
    }

    bezier_curve(data: interfaces.IBezier, delta: number): interfaces.IVec2
    {
        const x = this.bezier(data.start.x, data.start.x, data.mid.x, data.end.x, delta)
        const y = this.bezier(data.start.y, data.start.y, data.mid.y, data.end.y, delta)

        return { x: x, y: y }
    }

    array_of_curves(data: interfaces.IBezier, length: number, callback: Callback) : interfaces.IVec2[]
    {
        length = pTSpace.numeric.to_int(length);
        let arr: interfaces.IVec2[] = [];

        if(length > 0)
        {
            for (let t = 0; t <= length; t++) 
            {
                arr.push(callback(data, t / length));
            }
        }
        return arr;
    }

    array_bezier_curves(data: interfaces.IBezier, length: number): interfaces.IVec2[]
    {
        return this.array_of_curves(data, length, this.bezier_curve);
    }

    array_quadratic_curves(data: interfaces.IBezier, length: number): interfaces.IVec2[]
    {
        return this.array_of_curves(data, length, this.quad_curve);
    }
}

pTSCreator('axis', new pTSAxis())

