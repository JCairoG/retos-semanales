'use strict'
import {dataTables} from './data.js';
import {inputFields} from './inputs.js';
import {buttons, ButtonType} from './buttons.js';
import {dataGrid} from './grid.js';

const documentReady = () => {
  inputFields.initialize(); 
  buttons.initialize();
  dataGrid.initialize();
  dataTables.openTables();


  document.addEventListener("buttonClick", (e) =>{buttonClick(e)});

  const buttonClick = (e) =>{
    switch (e.detail.buttonType){
      case ButtonType.ADD:
        /*fake id*/
        document.getElementById("0_idProd").value = Math.floor(Math.random()*1000);
        break;

    }
  }

}

document.addEventListener('DOMContentLoaded', documentReady);


