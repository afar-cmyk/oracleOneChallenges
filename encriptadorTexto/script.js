let inputTextoEncriptado = document.getElementById('inputTextoEncriptado');
let inputEncriptador = document.getElementById('inputEncriptador');

// Controla la visibilidad de la seccion que muestra el texto encriptado
function cambiarEstadoInterfaz(estado1, estado2) {

  function estadoInterfaz (interface, estado) {
    document.getElementById(interface).style.display = estado;
  }

  estadoInterfaz("sin-ejecutar", estado1);
  estadoInterfaz("interfaz-encriptado", estado2);
}

// Verifica el evento del textarea para activar o desactivar la interfaz
inputTextoEncriptado.addEventListener('input', function() {
  if (inputTextoEncriptado.value.length > 0) {
    cambiarEstadoInterfaz("none", "flex");
  } else {
    cambiarEstadoInterfaz("flex", "none");
  }
});


// Lee el contenido del elemento HTML textarea por su id
function conseguirTexto(idCajaTexto) {
  return new Promise((resolve) => {
    const cajaTexto = document.getElementById(idCajaTexto);

    function handleChange() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        resolve(cajaTexto.value);
      }, 100);
    }

    let timeoutId = setTimeout(() => {
      resolve(cajaTexto.value);
    }, 100);

    cajaTexto.addEventListener('input', handleChange);
    cajaTexto.addEventListener('propertychange', handleChange);
    cajaTexto.addEventListener('change', handleChange);
  });
}

// Convierte el string en un arreglo para reemplazar las vocales
function encriptarTexto(texto) {
  let arrayTexto = texto.split('');
  let arrayEncriptado = [];

  arrayTexto.forEach(letra => {
    switch (letra) {
      case 'a':
        arrayEncriptado.push('ai');
        break;
      case 'e':
        arrayEncriptado.push('enter');
        break;
      case 'i':
        arrayEncriptado.push('imes');
        break;
      case 'o':
        arrayEncriptado.push('ober');
        break;
      case 'u':
        arrayEncriptado.push('ufat');
        break;
      default:
        arrayEncriptado.push(letra);
        break;
    }
  });

  return arrayEncriptado.join('')
}

//===================================================================

//funcionalidades del boton encriptar
const botonEncriptar = document.getElementById("botonEncriptar");

botonEncriptar.addEventListener("click", async function() {
  //recibe el texto del textarea
  let texto = await conseguirTexto("inputEncriptador");

  //encripta el texto recibido y envia un evento
  inputTextoEncriptado.value = encriptarTexto(texto);
  inputTextoEncriptado.dispatchEvent(new Event('input'));

  //cambia de color el borde del textarea
  inputEncriptador.style.border = "solid thin #5865f2"
  setTimeout(()=> {
    inputEncriptador.style.border = "initial"
 }
 ,250);
});

//===================================================================

//funcionalidades del boton desencriptar
const botonDesencriptar = document.getElementById("botonDesencriptar");

botonDesencriptar.addEventListener("click", async function() {
  let texto = await conseguirTexto("inputEncriptador");

  inputTextoEncriptado.value = texto;
  inputTextoEncriptado.dispatchEvent(new Event('input'));
});

//===================================================================

//funcionalidades del boton borrar
const botonBorrar = document.getElementById("botonBorrar");

botonBorrar.addEventListener("click", async function() {
  inputEncriptador.value = "";
  inputEncriptador.dispatchEvent(new Event('input'));

  inputEncriptador.style.border = "solid thin #da373c"
  setTimeout(()=> {
    inputEncriptador.style.border = "initial"
 }
 ,250);
});

//===================================================================

//funcionalidades del boton copiar en la interfaz del mensaje encriptado
const botonCopiar = document.getElementById("botonCopiar");

botonCopiar.addEventListener("click", async function() {
  inputTextoEncriptado.style.border = "solid thin #23a55a"
  navigator.clipboard.writeText(inputTextoEncriptado.value)
  setTimeout(()=> {
    inputTextoEncriptado.style.border = "initial"
 }
 ,250);
});

//===================================================================

//funcionalidades del boton borrar en la interfaz del mensaje encriptado
const botonBorrarEncriptado = document.getElementById("botonBorrarEncriptado");

botonBorrarEncriptado.addEventListener("click", async function() {
  inputTextoEncriptado.value = "";
  inputTextoEncriptado.dispatchEvent(new Event('input'));
});

//===================================================================

//funcionalidades del boton de prueba
const botonDebug = document.getElementById("debug1");

botonDebug.addEventListener("click", async function() {
  let texto = await conseguirTexto("inputEncriptador");
  //encriptarTexto(texto, criptos)
  console.log(encriptarTexto(texto));
  inputTextoEncriptado.dispatchEvent(new Event('input'));
});


//===================================================================

const botonDebug2 = document.getElementById("debug2");
botonDebug2.addEventListener("click", async function() {
  let texto = await conseguirTexto("inputEncriptador");

  inputTextoEncriptado.value = texto;
  inputTextoEncriptado.dispatchEvent(new Event('input'));

  console.log(await conseguirTexto("inputTextoEncriptado"));
});

//===================================================================
