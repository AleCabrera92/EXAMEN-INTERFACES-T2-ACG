var map = L.map('mapID').setView([36.721, -4.42], 17.2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let plantilla = document.querySelector("template"); 
let contenedor = document.querySelector(".routes");

fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json')
  .then(response => response.json())
  .then(data => {

    data.forEach( function(el){
        let wrap = document.createElement("div");
        
        let nuevaRuta = plantilla.content.cloneNode(true);
        nuevaRuta.querySelector("h3").textContent = el.properties.nombre;
        nuevaRuta.querySelector("p").textContent = el.properties.horario;
        nuevaRuta.querySelector(".direccion").textContent = el.properties.direccion;
        if (el.properties.telefono == "") nuevaRuta.querySelector(".telefono").remove();
        else nuevaRuta.querySelector(".telefono").textContent = el.properties.telefono;

        let x = el.properties.x;
        let y = el.properties.y;

        let marker = L.marker([x, y]).addTo(map);

        let label = '<p>' + el.properties.direccion + '</p><br/>' + '<h4>' + el.properties.nombre + '</h4>';

        marker.bindPopup(label);

        wrap.appendChild(nuevaRuta);
        
        wrap.classList.add("border");
        
        contenedor.appendChild(wrap);  
      });
  });