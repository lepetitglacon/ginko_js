console.log("test")

import Api from "./api/api.js"
import {map, addMarker} from "./map/map.js"
import math from "./math/math.js"

const api = new Api()
let temps = await api.trGetTempsLieu('flore')
let bus = await api.trGetDetailsVehicule(temps.objets.listeTemps[0].numVehicule)
console.log(bus, "bus")
console.log(temps)
let foundName = temps.objets.nomExact
let item = temps.objets.listeTemps[0]
console.log(item)
let marker = addMarker([item.longitude, item.latitude])
let marker2 = addMarker(math.getPosition("test"))

console.log(await api.drGetLines(), "lines")
console.log(math.getLenght())

console.log(foundName)