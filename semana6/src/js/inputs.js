'use strict'
import {dataTables} from './data.js';
import {dialog, DialogType, DialogButtons} from './dialogs.js';

const TITLE = document.title;

let idTimeOut = 0 ;
let INPUT_COLLECTION=[];

class InputCollection{
  constructor () {
    document.addEventListener("dataCursorMoved", (e) =>{
      this.fill(e.detail.dataIndex);
    });

    document.addEventListener("dataChanged", (e) =>{
      this.fill(e.detail.dataIndex);
    });
  } 

  initialize = () => {
    const INPUTS = document.forms[0].querySelectorAll("input, select");
  
    for (const item of INPUTS) {
      switch (item.type) {
        case "text": case "number": case "email": case "select-one": case "select":
          let msg = item.placeholder.trim();
          let dataField = "";
          let index = 0;
  
          msg = msg.replace("-","");
          msg = msg.replace(".","");
  
          if (msg === "") msg = findLabelTextForControl(item.id);
          if (msg === "") 
            msg = "Debe completar este campo con un dato válido";
          else
            msg = `Debe completar el campo\r ${msg} con un dato válido`;
  
          index = item.id.split("_")[0];
          dataField = item.id.split("_")[1];
          INPUT_COLLECTION.push ({"dataIndex":index, "id": item.id, "dataField":dataField, "validationText": msg});
      }
    }
  }
  
  fill = (dataIndex) => {
    if (isNaN(dataIndex)) return;
    this.clean(dataIndex);

    const data = dataTables.getCurrentRecord(dataIndex);
    if (!data) return;

    for (const item of getInputs(dataIndex)){
      const input = document.getElementById(item.id);
      input.value = data[item.dataField];
    }
  }
  
  clean = (dataIndex) => {
    if (isNaN(dataIndex)) return;
  
    const itemColl = getInputs(dataIndex);
    for (const item of itemColl){
      document.getElementById(item.id).value="";
    }
  }
  
  getDataAsArray = (dataIndex) => {
    if (isNaN(dataIndex)) return;
  
    let data={};
    
    const itemColl = getInputs(dataIndex);
    for (const item of itemColl){
      const e = document.getElementById(item.id);
      const type = e.type.toString(); /*mas adelante para formatear la data segun el campo*/
      const value = e.value;
      data[item.dataField]=value;
    }
    return data;
  }
 
  validate = (dataIndex) => {
    if (isNaN(dataIndex)) return;

    const itemColl = getInputs(dataIndex);
    for (const item of itemColl){
      const e = document.getElementById(item.id);
      const type = e.type.toString();
      const value = e.value;
    
      if (e.disabled || e.hidden) continue; 
    
      switch (type) {
        case "text":{
          if (!value) {
            const r = dialog.show(item.validationText, TITLE, DialogType.ERROR)
              r.then(() =>{
              setInvalidStyle (e);
              e.focus();
            })
            return false;
          }else{
            e.value=value.trim();
          }
        }
        break;
          
        case "email":{
          const validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);       
          if (!validMail) {
            setInvalidStyle (e);
            const r = dialog.show(item.validationText, TITLE, DialogType.ERROR);
            r.then(() =>{
              e.focus();
              return false;
            })
          }else{
            e.value = value.trim().toLowerCase();
          }
        }
        break;
    
        case "number":{
          if (!value || isNaN(value)) {
            const r = dialog.show(item.validationText, TITLE, DialogType.ERROR);
            r.then(() =>{
              setInvalidStyle (e);
              e.focus();
            })
            return false;
          }else{
            e.value=value.trim();
          }
        }
        break; 
    
        case "select-one":{
          if (!value || value=="-1"){
            const r = dialog.show("Seleccione una opción de la lista", TITLE, DialogType.ERROR);
            r.then(() =>{
              setInvalidStyle (e);
              e.focus();
            })
            return false;
          }
        }
        break;
      }
    }
    return true;
  }    
}

const findLabelTextForControl = (idVal) => {
  const labels = document.getElementsByTagName("label");
  for (const label of labels) {
    if (label.htmlFor === idVal) {
      return label.innerHTML.trim();
    }
  }
}

const getInputs= (dataIndex) => {
  if (isNaN(dataIndex)) return;

  dataIndex = dataIndex.toString();
  return INPUT_COLLECTION.filter(item =>
    item.dataIndex === dataIndex
  );
}

const setInvalidStyle = e => {
  clearTimeout(idTimeOut);
  e.scrollIntoView(false);
  const bgColor = e.style.backgroundColor;
  e.style.backgroundColor = "red";
  idTimeOut = setTimeout(()=>{
    e.style.backgroundColor = bgColor;
  }, 1000);
}

export const inputFields = new InputCollection();