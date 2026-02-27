//Constructores

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI(){

}

//Creando prototypes
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


//Instanciar UI
const ui = new UI;
console.log(ui);

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

    ui.mostrarMensaje('Datos llen   ados correctamente', 'correcto');
    //Instanciar el seguro 
    //Utilizar el prototype que va a cotizar
    console.log('Cotizando....')
}