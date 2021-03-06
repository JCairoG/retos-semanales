'use strict';
import {dialog, Type, Buttons, TextAlign} from './dialogs.js';
import {validate} from './validations.js';

document.addEventListener('DOMContentLoaded', () => {
  
  const gTitle = document.title;
  
  const submitSuscribe = (e) => {
    e.preventDefault();
    if (form5Example21.value == "") form5Example21.value=inputMail.value;
    
    if (form5Example21.value == ""){
      dialog.show('El correo no es válido',"Subscripción", Type.ERROR,Buttons.ACEPT);    
      form5Example21.focus();
    }
    else
      dialog.show(`Su correo ${form5Example21.value} a sido registrado`,"Subscripción", Type.INFO);
  }

  let links = document.querySelectorAll(".btn");
  for (const link of links) {
    link.addEventListener('click', ()=>dialog.show("¿Esta seguro que quiere dejar esta página?","", Type.QUESTION, Buttons.YESNO));
  }

  links = document.querySelectorAll(".nav-link");
  for (const link of links) {
    link.addEventListener('click', ()=>dialog.show("Disponible proximamente","",Type.ALERT));
  }

  links = document.querySelectorAll(".aside-links__nav");
  for (const link of links) {
    link.addEventListener('click', ()=>dialog.show("No tiene permiso para dejar esta página","",Type.DENIED));
  }

  const INPUTS = document.forms[0].querySelectorAll("input, select");
  
  for (const item of INPUTS) {
    if (!item.disabled){
      document.getElementById(item.id).addEventListener("keyup", (e) =>{
        if (e.code=='Enter') {
          document.getElementById(item.id).dispatchEvent(new KeyboardEvent('keydown', {'code':'Tab'}))
        }})
   } 
}

  const formValidation = (e) =>{
    e.preventDefault();
    if (validate()) dialog.show("Los datos han sido registrados satisfactoriamente", gTitle, Type.INFO, Buttons.ACEPT);
  };
  
  document.oncontextmenu =()=>{
    dialog.show("Todos los derechos reservados","BootCamp FullStack 2022",Type.DENIED)
    /*return false;*/
  }

  document.getElementById("raz_soc").focus();

  document.getElementById("buttonSave").addEventListener('click', formValidation);
  document.getElementById("frmSubscription").addEventListener('submit',submitSuscribe);
});