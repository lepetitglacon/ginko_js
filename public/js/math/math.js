class Math {

    /**
     * return position array [lng, lat] for the vehicle
     * @param position
     * @returns {number[]}
     */
    getPosition(position) {
        return [6.033, 47.0]
    }

    getLenght(geometry) {
        if (geometry.type === 'LineString')
            return calculateLength(geometry.coordinates);
        else if (geometry.type === 'MultiLineString')
            return geometry.coordinates.reduce(function(memo, coordinates) {
                return memo + calculateLength(coordinates);
            }, 0);
        else
            return null;
    }

    calculateLength(lineString) {
        if (lineString.length<2)
            return 0;
        var result = 0;
        for (var i=1; i<lineString.length; i++)
            result += distance(lineString[i-1][0],lineString[i-1][1],
                lineString[i  ][0],lineString[i  ][1]);
        return result;
    }

    /**
     * Calculate the approximate distance between two coordinates (lat/lon)
     *
     * © Chris Veness, MIT-licensed,
     * http://www.movable-type.co.uk/scripts/latlong.html#equirectangular
     */
    distance(λ1,φ1,λ2,φ2) {
        const R = 6371000;
        const Δλ = (λ2 - λ1) * Math.PI / 180;
        φ1 = φ1 * Math.PI / 180;
        φ2 = φ2 * Math.PI / 180;
        const x = Δλ * Math.cos((φ1+φ2)/2);
        const y = (φ2-φ1);
        const d = Math.sqrt(x*x + y*y);
        return R * d;
    };
}

const math = new Math()

export default math