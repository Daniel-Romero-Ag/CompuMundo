import * as mapas from "./mapas.js"
import * as consultas from "./consultas.js"


const crearMenuLateral = function(categorias) {
    const $fragmentCategorias = document.createDocumentFragment()
    const $templateCategoria = document.getElementById("template-categoria").content
    const $listaCategorias = document.querySelector(".lista-categorias")
    categorias.forEach(categoria => {
        const $clonTemplateCategoria = document.importNode($templateCategoria, true)
        $clonTemplateCategoria.children[0].children[0].setAttribute("src", categoria.imgURL)
        $clonTemplateCategoria.children[0].children[1].innerText = categoria.nombre
        $clonTemplateCategoria.children[0].setAttribute("data-id", categoria.id)
        $fragmentCategorias.appendChild($clonTemplateCategoria)

    });
    $listaCategorias.appendChild($fragmentCategorias)
};

consultas.obtenerCategorias(crearMenuLateral)

//Logica de los mapas de las sucursales
mapas.mostrarMapas();




//Logica de la barra de ofertas
(function() {
    const $Ofertas = document.querySelectorAll(".oferta")
    const arrayOfertas = Array.of(...$Ofertas)
    console.log(arrayOfertas)
    arrayOfertas.forEach((oferta, indice) => {
        const indiceInicial = indice
        let indiceAuxiliar = 0
        setInterval(() => {
            oferta.style.transform = `translate(${indiceAuxiliar}00%)`;
            (indiceInicial + indiceAuxiliar == 5) ? indiceAuxiliar -= 5: indiceAuxiliar++
        }, 3000);
    });
})();

function mostrarInventario(inventario) {
    const $fragmentoInventario = document.createDocumentFragment(),
        $contenedorProductos = document.getElementById("contenedor-productos-categoria"),
        $templateProducto = document.getElementById("template-producto").content
    $contenedorProductos.children[1].classList.add("invisible")

    inventario.forEach(elemento => {
        const $clonTemplateProducto = document.importNode($templateProducto, true)
        $clonTemplateProducto.children[0].children[0].children[0].innerHTML += elemento.nombre
        $clonTemplateProducto.children[0].children[0].children[1].innerHTML += elemento.caracteristicas
        $clonTemplateProducto.children[0].children[0].children[2].innerHTML = `<strong>Precio: </strong> ${elemento.precio} <button>Comprar</button>`
        $fragmentoInventario.appendChild($clonTemplateProducto)
    });
    $contenedorProductos.style.transform = "translate(0)"
    $contenedorProductos.classList.remove("invisible")

    setTimeout(() => {
        $contenedorProductos.children[1].innerHTML = ""
        $contenedorProductos.children[1].appendChild($fragmentoInventario)
        $contenedorProductos.children[1].classList.remove("invisible")

    }, 500);

}

document.addEventListener("DOMContentLoaded", () => {
    const $contactanos = document.getElementById("contactanos"),
        $quienesSomos = document.getElementById("quienes-somos"),
        $sucursales = document.getElementById("sucursales"),
        $flechaMenu = document.querySelector(".fa-arrow-right"),
        $menuLateral = document.querySelector(".menu-lateral"),
        $ocultarMenu = document.querySelector(".fa-times")

    document.addEventListener("click", (e) => {
        e.preventDefault()

        if (e.target.parentNode.hasAttribute("data-id")) {

            consultas.obtenerProductos(mostrarInventario, { "id_cat": e.target.parentNode.getAttribute("data-id"), "nombre": e.target.parentNode.children[1].innerText })
        }
        if (e.target.matches("#btn-contactanos")) {
            $contactanos.classList.remove("invisible")
            $quienesSomos.classList.add("invisible")
            $sucursales.classList.add("invisible")
        }
        if (e.target.matches("#btn-quienes-somos")) {
            $contactanos.classList.add("invisible")
            $quienesSomos.classList.remove("invisible")
            $sucursales.classList.add("invisible")
        }
        if (e.target.matches("#btn-sucursales")) {
            $contactanos.classList.add("invisible")
            $quienesSomos.classList.add("invisible")
            $sucursales.classList.remove("invisible")
        }
        if (e.target == $flechaMenu) {
            $menuLateral.style.transform = "translate(0)"
            e.target.style.transform = "translate(170px)"
            e.target.classList.toggle("invisible")
            $ocultarMenu.classList.toggle("invisible")
            $ocultarMenu.style.transform = "translate(170px)"
        }
        if (e.target == $ocultarMenu) {
            $menuLateral.style.transform = "translate(-100%)"
            $flechaMenu.style.transform = "translate(0)"
            $ocultarMenu.style.transform = "translate(0)"
            e.target.classList.toggle("invisible")
            $flechaMenu.classList.toggle("invisible")
            const $contenedorProductos = document.getElementById("contenedor-productos-categoria")
            $contenedorProductos.classList.add("invisible")
        }
    })
})