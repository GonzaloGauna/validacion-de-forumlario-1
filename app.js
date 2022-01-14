// Variables
const formulario = document.querySelector('#form');
const btn_enviar = document.querySelector('#enviar');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const reset_btn = document.querySelector('#resetBtn');



cargarEventListeners();
function cargarEventListeners(){
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Botones del formulario
    formulario.addEventListener('submit', enviarEmail);
    reset_btn.addEventListener('click', resetearFormulario);
}
// Funciones
function iniciarApp(){
    btn_enviar.disabled = true;
    btn_enviar.classList.add('btn-not-allowed');
}

function validarFormulario(e){
    if( e.target.value.length > 0 ){
        const error = document.querySelector('p.mensajeError');
        if( error ){
            error.remove();
        }
        e.target.style.border = '1px solid #40c057';
    } else{
        e.target.style.border = '1px solid #f03e3e';

        mostrarError('Todos los campos son obligatorios.');
    }
    if( e.target.type === 'email' ) {
        

        if( er.test( e.target.value )) {
            e.target.style.border = '1px solid #40c057';
            const error = document.querySelector('p.mensajeError');
            if( error ){
                error.remove();
            }
        } else{
            e.target.style.border = '1px solid #f03e3e';
            mostrarError('El email no es valido');
        }
    }
    if( er.test(email.value) && asunto.value !== '' && mensaje.value !== '' ){
        btn_enviar.disabled = false;
        btn_enviar.classList.remove('btn-not-allowed');
        const error = document.querySelector('p.mensajeError');

        if( error ){
            error.remove();
        }
    } else{
        btn_enviar.disabled = true;
        btn_enviar.classList.add('btn-not-allowed');
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

function enviarEmail(e){
    e.preventDefault();

    iniciarApp();

    // Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Margar el tiempo
    setTimeout(() => {
        spinner.style.display = 'none';

        const mensajeEnviado = document.createElement('p');
        mensajeEnviado.textContent = 'El emali se envio correctamente.';
        mensajeEnviado.classList.add('mensajeEnviado');

        // Insertar el parrafo
        formulario.insertBefore(mensajeEnviado, spinner);

        setTimeout(() => {
            mensajeEnviado.remove();

            resetearFormulario();
        }, 5000);
    }, 3000);

}

function resetearFormulario() {
    formulario.reset();
    iniciarApp();
    const error = document.querySelector('p.mensajeError');
    const resetBordes = document.querySelectorAll('.inputCampo');

    resetBordes.forEach( element => {
        element.style.removeProperty('border');
    });

    if( error ){
        error.remove();
    }
}