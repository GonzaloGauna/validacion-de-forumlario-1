// Variables
const formulario = document.querySelector('#form');
const btn_enviar = document.querySelector('#enviar');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');



cargarEventListeners();
function cargarEventListeners(){
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
}
// Funciones
function iniciarApp(){
    btn_enviar.disabled = true;
    btn_enviar.classList.add('btn-not-allowed');
}

function validarFormulario(e){
    if( e.target.value.length > 0 ){
        const error = document.querySelector('p.mensajeError');
        if( error !== null ){
            error.remove();
        }
        e.target.style.border = '1px solid #40c057';
    } else{
        e.target.style.border = '1px solid #f03e3e';

        mostrarError('Todos los campos son obligatorios.');
    }
    if( e.target.type === 'email' ) {
        const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if( er.test( e.target.value )) {
            e.target.style.border = '1px solid #40c057';
            console.log('Email valido...');
        } else{
            e.target.style.border = '1px solid #f03e3e';
            console.log('Email no valido...');
            mostrarError('El email no es valido');
        }
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    const errores = document.querySelectorAll('.mensajeError');

    mensajeError.textContent = mensaje;
    mensajeError.classList.add('mensajeError');

    // El mensaje de error se debe repetir.
    if( errores.length === 0 ){
        formulario.appendChild(mensajeError);
    }

}