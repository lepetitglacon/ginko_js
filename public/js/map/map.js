export const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // stylesheet location
    center: [6.0333, 47.25], // starting position [lng, lat]
    zoom: 12 // starting zoom
})

export function addMarker (lngLatArray) {
    if (lngLatArray.length !== 2) {
        throw "marker param is not a [lng, lat] formed array"
    }
    return new maplibregl.Marker()
        .setLngLat(lngLatArray)
        .addTo(map);
}