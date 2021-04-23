export function mostrarMapas() {
    const tilesProvider = "	https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const myMap = L.map('myMap').setView([21.14, -86.85], 14)

    L.tileLayer(tilesProvider, {
        maxZoom: 18
    }).addTo(myMap)

    let marker = L.marker([21.14, -86.835]).addTo(myMap)

    const tilesProvider2 = "	https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const myMap2 = L.map('myMap2').setView([21.14, -86.85], 14)

    L.tileLayer(tilesProvider2, {
        maxZoom: 18
    }).addTo(myMap2)

    let marker2 = L.marker([21.14, -86.835]).addTo(myMap2)
}