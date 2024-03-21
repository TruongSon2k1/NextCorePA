
class pTSMath implements IMath 
{
    gcd(first: number, second: number) {
        return second === 0 ? first : this.gcd(second, first % second);
    }

    lcm(first: number, second: number) {
        return (first * second) / this.gcd(first, second);
    }

    berize_curve(data: interfaces.IBezier, length: number): interfaces.IVec2[] {
        return pTSpace.axis.array_bezier_curves(data, length);
    }

    quad_curve(data: interfaces.IBezier, length: number): interfaces.IVec2[] {
        return pTSpace.axis.array_quadratic_curves(data, length);
    }
}

pTSCreator('math', new pTSMath());

