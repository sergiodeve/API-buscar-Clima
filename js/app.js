const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', ()=>{
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    
    if (ciudad == '' || pais == '') {
        mostrarError('ambos campos son obligatorios');
        return;
    }
    
    consultarAPI(ciudad, pais)
};

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        const alerta = document.createElement('div');
        
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md','mx-auto','mt-6','text-center');
    
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
        container.append(alerta);
    
        setTimeout(()=>{
            alerta.remove();
        },3000);
    }
};

function consultarAPI(ciudad, pais){

    const apiKey = '77d989d9bf0be70487ae7d094958dd1e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
    console.log(url);

    //consultamos la api
    fetch(url)
    //nos da una respuesta la requerimos en formato json
        .then(respuesta => respuesta.json())
        //ya tenemos los datos 
        .then(datos => {
            limpiarHTML()
            if (datos.cod === "404") {
                mostrarError('ciudad no encontrada');
                return;
            }
            //imprime los datos en el html
            monstrarClima(datos);
        });

};

function monstrarClima(datos){
    const {name, main:{temp, temp_min, temp_max,}} = datos;

    console.log(name)
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en: ${name}`

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-bold','text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `${max} &#8451 tempmax`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `${min} &#8451 tempmin`;
    tempMin.classList.add('text-xl');

    const divResultado = document.createElement('div');
    divResultado.classList.add('text-center', 'text-white');
    
    divResultado.append(nombreCiudad);
    divResultado.append(actual);
    divResultado.append(tempMax);
    divResultado.append(tempMin);

    resultado.append(divResultado);
};

const kelvinACentigrados = grados => parseInt(grados -273.15);
/* function kelvinACentigrados(grados){
    return parseInt(grados -273.15)
}; */

function limpiarHTML(){
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

            


       



    

