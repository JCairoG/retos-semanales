'use strict'
import {ButtonType} from './buttons.js';
import {DataForm} from './form.js';

const documentReady = () => {
  const dataForm = new DataForm();
  dataForm.setInfo(0,"https://pokeapi.co/api/v2/pokemon/pikachu", "id");
  dataForm.fetch(0);
      
  document.addEventListener("buttonClick", (e) =>{buttonClick(e)});

  const buttonClick = (e) =>{
    switch (e.detail.buttonType){
      case ButtonType.ADD:
        /*fake id*/
        dataForm.doAction(e.detail.dataIndex, e.detail.buttonType);
        document.getElementById("0_id").value = Math.floor(Math.random()*1000)+1;
        break;
  
      default:
        dataForm.doAction(e.detail.dataIndex, e.detail.buttonType);
        break;
      }
  }
}

document.addEventListener('DOMContentLoaded', documentReady);