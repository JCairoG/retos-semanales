'strict mode';
import {validate} from './validations.js';
import {dialog, DialogType} from './dialogs.js';
import {fillClientsGallery, fillGridFeatures} from './data.js'

document.addEventListener("DOMContentLoaded", () =>{

  /*const wspLink ="https://web.whatsapp.com/send?phone=51984119920&text=Hola!%20Quisiera%20saber%20m%C3%A1s%20informaci%C3%B3n%20del%20software";*/
  const wspLink ="https://wa.me/51984119920?text=Hola!%20Quisiera%20saber%20m%C3%A1s%20informaci%C3%B3n%20del%20software";

  const hamburger = document.getElementById("header__hamburger-icon");
  const navMenu = document.getElementById("header__menu-list");
  const navLink = document.querySelectorAll(".header__menu-nav");
  const wspMsg = document.getElementById("contact-whatsApp-icon");          // scroll-to-top selection
  const copyRightDate = document.querySelector(".footer__copyright-date");
  const linkToggle = document.querySelectorAll('.toggle-trigger');
  const wspMsg2 = document.getElementById("footer__contact-wsp");
  const btnContactSend = document.getElementById("contact__button-send"); /*enviar la info*/
  const btnContactCancel = document.getElementById("contact__button-cancel"); /*cerrar el form*/
  const btnContactShow = document.getElementById("clients__button-contact"); /*abrir form*/
  
  copyRightDate.innerHTML = `Todos los derechos reservados - Perú ${new Date().getFullYear()}`;

  const showContactForm = () =>{
    let section = document.querySelector(".contact");
    section.classList.toggle('hidden');
    if (!section.classList.contains('hidden')){
      section.style.top = window.scrollY + "px";
    }
  }

  const sendContactData = () =>{
    if (validate()){
      dialog.show ("Su consulta ha sido enviada. !Pronto nos pondremos en contacto con Ud!","",DialogType.INFO);
      document.querySelector(".contact").classList.toggle('hidden');
    }
  }

  const sectionToggle = (e) => {
    let container = e.target.nextElementSibling;
    container.classList.toggle('hidden');
    if (container.classList.contains("hidden"))
      e.target.innerHTML = "¿Quiere conocer mas caracteristicas de SITEV?<br>Click aquí para ver más"
    else
    e.target.innerHTML = "Mostrando más caracteristicas de SITEV<br>Click aquí para ocultarlas"
  }

  linkToggle.forEach((element)=>{
    element.style.cursor ="pointer";
    element.addEventListener('click', sectionToggle);
  })
 
  const openWhatsAppWeb = (e) =>{
    e.preventDefault();
    const win = window.open(wspLink, '_blank');
    win.focus();
  };

  const openMenu = () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }

  const closeMenu = () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }

  navLink.forEach((nav) => {
    nav.addEventListener("click", closeMenu);
    if (nav.id="header__menu-item-contact"){
      nav.href=wspLink;
    }
  });

  hamburger.addEventListener("click", openMenu);
  wspMsg.addEventListener("click", openWhatsAppWeb);
  wspMsg2.addEventListener("click", openWhatsAppWeb);
  btnContactShow.addEventListener("click", showContactForm);
  btnContactSend.addEventListener("click", sendContactData);
  btnContactCancel.addEventListener("click", showContactForm);

  fillGridFeatures();
  fillClientsGallery();
})
