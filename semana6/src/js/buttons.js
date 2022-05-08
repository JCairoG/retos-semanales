'use strict'
import {dataTables} from './data.js';
import {inputFields} from './inputs.js';
import {dialog, DialogType, DialogButtons, DialogResult} from './dialogs.js';

let BUTTON_COLLECTION =[];
let buttonProps = [];
let actionAdd = 0;

export const ButtonType = Object.freeze({
  ADD: 0,
  EDIT: 1,
  SAVE: 2,
  DELETE: 3,
  CANCEL: 4,
  SEARCH: 5,
  PRINT: 6,
  CLOSE: 7,
  ADD_CHILD: 8,
  EDIT_CHILD: 9,
  SAVE_CHILD: 10,
  DELETE_CHILD: 11,
  CANCEL_CHILD: 12,
  SEARCH_CHILD: 13,
})

class ButtonCollection{
  initialize = () => {

    buttonProps = [
      {"type": ButtonType.ADD,          "icon": "./img/dlg_info.png",    "title": "Agregar"},
      {"type": ButtonType.EDIT,         "icon": "./img/dlg_error.png",   "title": "Editar"},
      {"type": ButtonType.SAVE,         "icon": "./img/dlg_error.png",   "title": "Grabar"},
      {"type": ButtonType.DELETE,       "icon": "./img/dlg_question.png","title": "Borrar"},
      {"type": ButtonType.CANCEL,       "icon": "./img/dlg_denied.png",  "title": "Cancelar"},
      {"type": ButtonType.SEARCH,       "icon": "./img/dlg_alert.png",   "title": "Buscar"},
      {"type": ButtonType.PRINT,        "icon": "./img/dlg_alert.png",   "title": "Imprimir"},
      {"type": ButtonType.CLOSE,        "icon": "./img/dlg_alert.png",   "title": "Cerrar"},
      {"type": ButtonType.ADD_CHILD,    "icon": "./img/dlg_alert.png",   "title": "Nuevo Item"},
      {"type": ButtonType.EDIT_CHILD,   "icon": "./img/dlg_alert.png",   "title": "Modificar"},
      {"type": ButtonType.SAVE_CHILD,   "icon": "./img/dlg_alert.png",   "title": "Guardar"},
      {"type": ButtonType.DELETE_CHILD, "icon": "./img/dlg_alert.png",   "title": "Eliminar"},
      {"type": ButtonType.CANCEL_CHILD, "icon": "./img/dlg_alert.png",   "title": "Cancela"},
      {"type": ButtonType.SEARCH_CHILD, "icon": "./img/dlg_alert.png",   "title": "Buscar"}
    ];
    
    const BUTTONS = document.forms[0].querySelectorAll("button");
  
    for (const item of BUTTONS) {
      const index = item.id.split("_")[0];
      const type = item.id.split("_")[1].toUpperCase();
      let newType = 0;

      switch (type){
        case "ADD":
          if (index==="0")
            newType = ButtonType.ADD;
          else
            newType = ButtonType.ADD_CHILD;
          break;
          
        case "EDIT":
          if (index==="0")
            newType = ButtonType.EDIT;
          else
            newType = ButtonType.EDIT_CHILD;
          break;

        case "DEL":
          if (index==="0")
            newType = ButtonType.DELETE;
          else
            newType = ButtonType.DELETE_CHILD;
          break;

        case "CANCEL":
          if (index==="0")
            newType = ButtonType.CANCEL;
          else
            newType = ButtonType.CANCEL_CHILD;
          break;

        case "SEARCH":
          if (index==="0")
            newType = ButtonType.SEARCH;
          else
            newType = ButtonType.SEARCH_CHILD;
          break;

        case "PRINT":
          newType = ButtonType.PRINT;
          break;

        case "CLOSE":
          newType = ButtonType.CLOSE;
          break;
      }

      BUTTON_COLLECTION.push ({"dataIndex": index, "id": item.id, "type": newType});
      item.innerHTML = buttonProps[newType].title;
      item.addEventListener("click", onClick);
    }
  }
}

const onClick = (e) => {
  const dataIndex = e.target.id.split("_")[0];
  
  let info = BUTTON_COLLECTION.find((item) => {
    return item.id === e.target.id;  
  });

  switch (info.type){
    case ButtonType.ADD:
      actionAdd = 1;
      toggleState(dataIndex);
      inputFields.clean(dataIndex);
      
      /*fake id*/
      document.getElementById("0_idProd").value = Math.floor(Math.random()*1000);

      break;

    case ButtonType.EDIT:
      if (!dataTables.getCurrentRecord(dataIndex)){
        dialog.show("No hay ningun registro seleccionado para modificar","",DialogType.ALERT);
        return;
      }
      actionAdd = 0;
      toggleState(dataIndex);
      break;

    case ButtonType.SAVE:
      if (!inputFields.validate(dataIndex)) return;
      
      const newData  = inputFields.getDataAsArray(dataIndex);
      if (actionAdd){
        if (!dataTables.add(dataIndex,newData)){
          dialog.show("No se pudo guardar la información", "", DialogType.ERROR, DialogButtons.ACEPT);
          return;
        }
      }else{
        if (!dataTables.update(dataIndex,newData)){
          dialog.show("Error al actualizar los datos", "", DialogType.ERROR, DialogButtons.ACEPT);
          return;
        }
      }
      toggleState(dataIndex);
      break;
  
    case ButtonType.DELETE:
      if (!dataTables.getCurrentRecord(dataIndex)){
        dialog.show("No hay ningun registro seleccionado para eliminar","",DialogType.ALERT);
        return;
      }

      dialog.show("¿Desea eliminar este registro?","",DialogType.QUESTION, DialogButtons.YESNO_DEFAULT_NO)
      .then((r) =>{
        if (r === DialogResult.CANCEL_NO) return;
        if (!dataTables.delete(dataIndex)) dialog.show("No se puedo eliminar el registro","",DialogType.ERROR);
      })
      break;

    case ButtonType.CANCEL:
      inputFields.fill(dataIndex);
      toggleState(dataIndex);
      break;

    case ButtonType.ADD_CHILD:
      if (!dataTables.getCurrentRecord(0)) return;
      inputFields.clean(dataIndex);
      toggleState(dataIndex);
      break;

    case ButtonType.SAVE_CHILD:
      toggleState(dataIndex);
      break;
  
    case ButtonType.EDIT_CHILD:
      if (!dataTables.getCurrentRecord(dataIndex)){
        dialog.show("No hay ningun registro seleccionado para modificar","",DialogType.ALERT);
        return;
      }
      toggleState(dataIndex);
      break;
  
    case ButtonType.DELETE_CHILD:
      if (!dataTables.getCurrentRecord(dataIndex)){
        dialog.show("No hay ningun registro seleccionado para eliminar","",DialogType.ALERT);
        return;
      }
      dialog.show("¿Desea eliminar este registro?","",ButtonType.QUESTION, DialogButtons.YESNO_DEFAULT_NO)
      .then((r) =>{
        if (r === DialogResult.CANCEL_NO) return;
        if (!dataTables.delete(dataIndex)) dialog.show("No se puedo eliminar el registro","",DialogType.ERROR);
      })
      break;
  
    case ButtonType.CANCEL_CHILD:
      inputFields.fill(dataIndex);
      toggleState(dataIndex);
      break;

    case ButtonType.CLOSE:

    break;
  
  }
}

const toggleState = (dataIndex) => {
  if (isNaN(dataIndex)) return;

  dataIndex = dataIndex.toString();
  
  for (const item of BUTTON_COLLECTION){
    const button = document.getElementById(item.id);

    if (item.dataIndex != dataIndex.toString()){
      button.classList.toggle("--btn-disabled")
    }else{
      let newType = -1;

      switch (item.type){
        case ButtonType.ADD:
          button.classList.toggle("--btn-disabled")
          break;
    
        case ButtonType.EDIT:
          newType = ButtonType.SAVE;
          break;

        case ButtonType.SAVE:
          newType = ButtonType.EDIT;
          break;
  
        case ButtonType.DELETE:
          newType = ButtonType.CANCEL;
          break;
    
        case ButtonType.CANCEL:
          newType = ButtonType.DELETE;
          break;

        case ButtonType.ADD_CHILD:
          newType = ButtonType.SAVE_CHILD;
          break;
    
        case ButtonType.EDIT_CHILD:
          button.classList.toggle("--btn-disabled")
          break;

        case ButtonType.SAVE_CHILD:
          newType = ButtonType.ADD_CHILD;
          break;
  
        case ButtonType.DELETE_CHILD:
          newType = ButtonType.CANCEL_CHILD;
          break;
    
        case ButtonType.CANCEL_CHILD:
          newType = ButtonType.DELETE_CHILD;
          break;

        case ButtonType.SEARCH:
          button.classList.toggle("--btn-disabled")
          break;
  
        case ButtonType.CLOSE:
          button.classList.toggle("--btn-disabled")
          break;
      }
      
      /*actualiza estado*/
      if (newType != -1){
        item.type = newType;
        button.innerHTML = buttonProps[newType].title;
      } 
    }
  };
}

export const buttons = new ButtonCollection();