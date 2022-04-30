'strict mode';
import {dialog, Type, Buttons, TextAlign} from './dialogs.js';

const gTitle = document.title;
var gInputs = new Array();

const INPUTS = document.forms[0].querySelectorAll("input, select");
  
/*descarta elementos deshabilitados y otros que se requiera despues*/
for (const item of INPUTS) {
  if (!item.disabled) gInputs.push(item); 
}

const setInvalidStyle = e => {
  const bgColor = e.parentNode.style.backgroundColor;
  e.parentNode.style.backgroundColor = "red";
  window.setTimeout(()=>{
    e.parentNode.style.backgroundColor = bgColor
  }, 1500);
}
  
export const validate = () => {
  for (const item of gInputs) {
    const e = document.getElementById(item.id);
    const type = e.type.toString();
    const value = e.value;
    let msg = e.placeholder;

    if (msg != "") 
      msg = "Debe completar el campo\r" + item.placeholder + " con un dato válido";
    else 
      msg = "Debe completar este campo con un dato válido";

    switch (type) {
      case "text":{
        if (!value) {
          setInvalidStyle (e);
          let r = dialog.show(msg, gTitle, Type.ERROR)
          e.focus();
          return false;
        }else{
          item.value=value.trim();
        }
      }
      break;
      
      case "email":{
        const validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);       
        if (!validMail) {
          setInvalidStyle (e);
          dialog.show(msg, gTitle, Type.ERROR);
          e.focus();
          return false;
        }else{
          item.value = value.trim().toLowerCase();
        }
      }
      break;

      case "number":{
        if (!value || isNaN(value)) {
          setInvalidStyle (e);
          dialog.show(msg, gTitle, Type.ERROR);
          e.focus();
          return false;
        }else{
          item.value=value.trim();
        }
      }
      break; 

      case "select-one":{
        if (!value || value=="-1"){
          setInvalidStyle (e);
          dialog.show("Seleccione una opción de la lista", gTitle, Type.ERROR);
          e.focus();
          return false;
        }
      }
      break;
    }
  }
  return true;
}