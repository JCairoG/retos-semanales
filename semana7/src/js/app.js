'strict mode';
import {validate} from './validations.js';
import {dialog, DialogType} from './dialogs.js';
import {clientsGalleryFill, fillGridFeatures} from './data.js'

const wspLinkMobile ="https://wa.me/51984119920?";
const wspMessage="text=Hola!%20Quisiera%20saber%20m%C3%A1s%20informaci%C3%B3n%20del%20software"

let hamburger;
let navMenu;

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

const openMenu = () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const closeMenu = () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

const spinVersionCard = (e) =>{
  let versionItem;  /*main card container*/

  if (e.target.nodeName==="INPUT"){
    /*en button*/
    versionItem = e.target.previousElementSibling.parentElement;
  }else{
    /*en imagen*/
    versionItem = e.target.parentElement.parentElement.parentElement;
  }

  const cardDetails = versionItem.querySelector(".versions-item-container")
  const button = versionItem.querySelector(".versions__show-card-button");

  versionItem.classList.toggle('spin');
  cardDetails.classList.toggle('spin');
  button.classList.toggle('spin');

  if (button.classList.contains('spin')){
    button.value="Regresar"
  }else{
    button.value="¿Que incluye esta versión?"
  }

  document.documentElement.style.setProperty('--cardContainerHeight', cardDetails.offsetHeight +"px");
  document.documentElement.style.setProperty('--cardContainerWidth', cardDetails.offsetWidth +"px");
}

document.addEventListener("DOMContentLoaded", () =>{
  
  document.querySelector(".footer__copyright-date").innerHTML += `- ${new Date().getFullYear()}`;

  hamburger = document.getElementById("header__hamburger-icon");
  navMenu = document.getElementById("header__menu-list");
  
  document.querySelectorAll('.toggle-trigger').forEach((element)=>{
    element.style.cursor ="pointer";
    element.addEventListener('click', sectionToggle);
  })
 
  document.querySelectorAll(".header__menu-nav").forEach((nav) => {
    nav.addEventListener("click", closeMenu); /*add close event*/
    if (nav.id==="header__menu-item-contact"){  /*plus wsp shorcut*/
      nav.href=wspLinkMobile+wspMessage;
    }
  });

  document.querySelectorAll(".versions__show-card-button").forEach((item)=>{
    item.addEventListener("click",spinVersionCard)
  })

  document.querySelectorAll(".versions__item-image").forEach((item)=>{
    item.addEventListener("click",spinVersionCard)
  })

  document.querySelectorAll(".contact-wsp-link").forEach((link) =>{
    link.href = wspLinkMobile+wspMessage;
  })

  hamburger.addEventListener("click", openMenu);
  document.getElementById("clients__button-contact").addEventListener("click", showContactForm);
  document.getElementById("contact__button-send").addEventListener("click", sendContactData);
  document.getElementById("contact__button-cancel").addEventListener("click", showContactForm);

})

window.addEventListener("load", () =>{
  document.querySelector(".main-image-container").classList.toggle('loaded');
  fillGridFeatures();
  clientsGalleryFill();
})