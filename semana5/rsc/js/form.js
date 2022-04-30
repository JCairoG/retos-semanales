'use strict';
import {dialog, Type, Buttons} from './dialogs.js';
import {validate} from './validations.js';

document.addEventListener('DOMContentLoaded', () => {
  
  const gTitle = document.title;
  
  const submitSuscribe = (e) => {
    e.preventDefault();
    if (form5Example21.value == "") form5Example21.value=inputMail.value;
    
    if (form5Example21.value == ""){
      dialog.show(`El correo no es válido`,"Subscripción", Type.ERROR);    
      form5Example21.focus();
    }
    else
      dialog.show(`Su correo ${form5Example21.value} a sido registrado`,"Subscripción", Type.INFO);
  }

  let links = document.querySelectorAll(".btn,.aside-links__nav,.nav-link");
  for (const link of links) {
    link.addEventListener('click', ()=>dialog.show("No tiene permiso para dejar esta página","",Type.DENIED));
  }

  const formValidation = (e) =>{
    e.preventDefault();
    if (validate()) dialog.show("Los datos han sido registrados satisfactoriamente", gTitle, Type.INFO, Buttons.ACEPT);
  };
  
  buttonSave.addEventListener('click', formValidation);
  frmSubscription.addEventListener('submit',submitSuscribe);

});