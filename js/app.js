//Constructores

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI(){

}

//Creando prototypes
Seguro.prototype.cotizarSeguro = function(){
    /*
        1= americano 1.15
        2= asiatico 1.05
        3= europe 1.35
    */
    let cantidad;
    const base = 2000;
    const diferencia = new Date().getFullYear() - this.year;

    switch (this.marca) {
        case '1':
                cantidad = base * 1.15
            break;
        case '2':
                cantidad = base * 1.05
            break;
        case '3':
                cantidad = base * 1.35
            break;
        default:
            break;
    }
    //Leer el año

    //por cada año que sea mas viejo se le resta un 3%

    cantidad = cantidad - (((diferencia*3.0)*cantidad)/100);
    
    /*
        SI el seguro es basico se multiplica por un 30%
        SI el seguro es completo se multiplica por un 50%
    
    */
   if(this.tipo === 'basico'){
    cantidad = cantidad*1.30;
   }else{
        cantidad = cantidad*1.50;
   }
    console.log(cantidad);
    return cantidad;
}


//Si necesitara usar el this. no puedo utilizar una arrow function
//puesto que no agarra las propiedades del objeto 
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
    min = max -20;

    const selectYear = document.querySelector('#year');

    for (let index = max; index > min; index--) {

        let option = document.createElement('option');
        option.value = index;
        option.textContent = index;
        selectYear.appendChild(option);
        
    }
};

//Muestra alertas en pantalla
UI.prototype.mostrarMensaje = function(mensaje, tipo){
    const div = document.createElement('div');
    
    if (tipo === 'error'){
        //Estas clases esta predefinidas en la hoja de estilos
        div.classList.add('mensaje', 'error');
    }else{
        div.classList.add('mensaje', 'correcto');

    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;
    
    //Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
            div.remove();
        }, 3000);
}

//Mostrar el resultado de la cotizacion 
UI.prototype.mostrarResultado = function(total, seguro){
    //Distructor
    const {marca, year, tipo} = seguro;
    //Marca trae valor 1,2 o 3 hay que asignar
    let marcaString;
    switch (marca) {
        case '1':
            marcaString = 'Americano';
            break;
        case '2':
            marcaString = 'Asiatico';
            break;
        case '3':
            marcaString = 'Europeo';
            break;
        default:
            marcaString = "undifine"
            break;
    }
    //Crear el resuldato
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class= "header">Resumen de seguro cotizado: </p>
        <p class= "font-bold" > Marca: <span class= "font-normal" > ${marcaString} </span></p>
        <p class= "font-bold" > Año: <span class= "font-normal" > ${year} </span></p>
        <p class= "font-bold" > Tipo: <span class= "font-normal" > ${tipo} </span></p>
        <p class= "font-bold" > Total: $<span class= "font-normal" > ${total} </span></p>



    `;
    const resultadoDiv = document.querySelector('#resultado');

    //Mostar el spiner 
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';

        //Se borra el spiner pero se muestra el resultado
        resultadoDiv.appendChild(div);

    }, 3000);
}


//Instanciar UI
const ui = new UI;

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); //Llena el select con los años 
});

//Escuchar los eventos que pasan en el HTML
eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    //Validar todos los campos 

    //Leer marca seleccionada
    const marca = document.querySelector('#marca').value;
    
    //Leer año seleccionada
    const year = document.querySelector('#year').value;

    //Leer tipo seleccionada //Como es un combo box asì es como se obtiene la casilla seleccionada de las dos opciones 
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if( marca === '' || year === '' || tipo ===''){
        console.log("No paso la vlidacion de datos completos");
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    //Aqui hay un error por que si lo preciona varias veces el mensaje no se sobrepone si no que salen mas 
    ui.mostrarMensaje('Cotizando....', 'correcto');

    //Ocultar las cotizaciones previas 
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }
    //Instanciar el seguro 
    const seguro = new Seguro(marca, year, tipo);
    //Utilizar el prototype que va a cotizar

    const total = seguro.cotizarSeguro();

    ui.mostrarResultado(total, seguro);
}