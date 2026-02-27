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

//Instanciar UI
const ui = new UI;
console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); //Llena el select con los años 
});