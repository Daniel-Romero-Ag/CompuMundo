export function obtenerCategorias(f) {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", (e) => {
        if (xhr.readyState === 4 && xhr.status < 300 && xhr.status >= 200) {
            f(JSON.parse(xhr.responseText))
        }
    })
    xhr.open("GET", "http://localhost:3000/categorias")
    xhr.send()
}

export async function obtenerProductos(mostrarInventario, categoria) {
    const productos = await fetch("http://localhost:3000/productos")
    const arrayProductos = await productos.json()
    const arrayCategoria = arrayProductos.filter(producto => producto.id_cat == categoria.id_cat)
    mostrarInventario(arrayCategoria)

}