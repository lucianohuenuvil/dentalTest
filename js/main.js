const form = document.getElementById("form"); 
let validaCorreo = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

let errores = {
    name:"El nombre es inválido",
    correo: "El correo es inválido",
    numero: "El número es inválido",
    asunto: "El asunto es inválido",
    mensaje: "El mensaje es inválido",
    success:"El formulario fue enviado correctamente"
}


  
window.onscroll = function() {myFunction()};



function myFunction() {
    var navbar = document.getElementById("navbar");
  
    if (window.pageYOffset >= 300) navbar.style.backgroundColor = "black";
    else navbar.style.backgroundColor = "transparent";

}
  

const navresponsive = () => {
    let buttonNav = document.getElementById("button-responsive");
    switch (buttonNav.style.left){
        case "":
            buttonNav.style.left = "0%"
            break;
        case "0%":
            buttonNav.style.left = "-100%";
            break;
        case "-100%":
            buttonNav.style.left = "0%";
            break;
    }
  } 
  

  
  
  

//Slide scroll page 

const scrollnav = () => $(document).ready(function(){
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
  
        var hash = this.hash;
  
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
            
            window.location.hash = hash;
        });
      } 
    });

});




/* VALIDACIÓN Y ENVÍO  DE FORMULARIO*/


const sendEmail = async() => {

    const formHTML = document.getElementById("form");
    const formData = new FormData(formHTML);
   
    return await fetch ("https://home-styloschool.cl/testmail.php", {
        method: "POST",
        body:formData
    });
    
    
};





const validarCampos = (name, number, email, asunto, message, err) => {
    if (name.length < 2 || name.length > 20){
        err.innerHTML = `Error: ${errores.name}`;
        return false;
    } else if (number.length > 11 || number.length < 8) {
        err.innerHTML = `Error: ${errores.numero}`;
        return false
    } else if (message.length < 10 ) {
        err.innerHTML = `Error: ${errores.mensaje}`;
        return false;
    } else if (!validaCorreo.test(email)){
        err.innerHTML = `Error: ${errores.correo}`;
        return false;
    } else if (asunto.length < 4){
        err.innerHTML = `Error: ${errores.asunto}`;
        return false;
    }  
    return true;

}







form.addEventListener("submit", async (e) => {
    e.preventDefault()

    let err = document.querySelector(".err");
    let name = e.target.name.value;
    let number = e.target.number.value;
    let email = e.target.email.value;
  //  let college = e.target.college.value;
    let asunto = e.target.asunto.value;
    let message = e.target.message.value;

    if(validarCampos(name, number, email, asunto, message, err)){
        /*ENVIAR FORMULARIO */
        try{
            const resp = await sendEmail();
            if (resp.status === 200){
                err.classList.remove("errorForm");
                err.classList.add("successForm");
                console.log("Enviado")
                err.innerHTML = "Se ha enviado el formulario correctamente";

            }
            else{
                err.classList.remove("successForm");
                err.classList.add("errorForm");
                throw "Error de comunicación";
            }
        } catch(Error) {
            err.classList.remove("successForm");
            err.classList.add("errorForm");                
        }
    }
    else{
        err.classList.remove("successForm");
        err.classList.add("errorForm");  
    }
})


