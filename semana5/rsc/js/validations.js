'strict mode';
const documentReady = () => {
  var gInputs = new Array;
  const gTitle = document.title;
  
  const buttonSave = document.getElementById('buttonSave');
  const INPUTS = document.forms[0].querySelectorAll("input, select");
  
  for (const item of INPUTS) {
    if (!item.disabled) gInputs.push(item);
  }

  const setInvalidStyle = (e) => {
    const bgColor = e.parentNode.style.backgroundColor;
    e.parentNode.style.backgroundColor = "red";
    window.setTimeout(setNormalStyle, 2000, e, bgColor);
  }
  
  const setNormalStyle = (e, bgColor) => {
    e.parentNode.style.backgroundColor = bgColor;
  }
  
  const validate = () => {

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
        case "text": case "email":{
          if (!value) {
            setInvalidStyle (e);
            msgBox.show(msg, gTitle, DialogType.ERROR,DialogButtons.ACEPT);
            e.focus();
            return false;
          }else{
            item.value=value.trim();
          }
        }
        break;
        
        case "number":{
          if (!value || isNaN(value)) {
            setInvalidStyle (e);
            msgBox.show(msg, gTitle, DialogType.ERROR);
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
            msgBox.show("Seleccione una opción de la lista", gTitle, DialogType.ERROR);
            e.focus();
            return false;
          }
        }
        break;

      }
    }
  
    msgBox.show("Los datos han sido registrados satisfactoriamente", gTitle, DialogType.INFO, DialogButtons.ACEPT);
    return true;
  }

  const link = document.createElement('link'); 
  link.rel = 'stylesheet'; 
  link.href = './rsc/css/dialogs.css'; 
  document.getElementsByTagName('head')[0].appendChild(link);
  
  /*
  const link2 = document.createElement('script'); 
  link2.src = './rsc/js/dialogs.js'; 
  document.getElementsByTagName('body')[1].appendChild(link2);
  */

  buttonSave.addEventListener('click', validate);
}

document.addEventListener('DOMContentLoaded', documentReady);