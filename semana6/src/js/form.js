'use strict'
import {dataTables} from './data.js';
import {ButtonCollection, ButtonType} from './buttons.js';
import {InputCollection} from './inputs.js';
import {DataGridCollection} from './grid.js';
import {dialog, DialogType, DialogButtons, DialogResult} from './dialogs.js';

let actionAdd = 0;
let buttons;
let inputFields;
let dataGrid;

export class DataForm {
  constructor (){
    inputFields = new InputCollection(); 
    dataGrid = new DataGridCollection();
    buttons = new ButtonCollection();
  }

  setInfo = (dataIndex, dataSource, idName, parentIndex, parentField) =>{
    dataTables.setInfo(dataIndex, dataSource, idName, parentIndex, parentField);
  }

  fetch = (dataIndex) =>{
    dataTables.fetch(dataIndex);  /* debe abrirse al final para que envie el evento*/
  }
  
  doAction = (dataIndex, buttonType) => {
    switch (buttonType){
      case ButtonType.ADD:
        actionAdd = 1;
        toggleElementsState(dataIndex, actionAdd)
        break;
  
      case ButtonType.EDIT:
        if (!dataTables.getCurrentRecord(dataIndex)){
          dialog.show("No hay ningun registro seleccionado para modificar","",DialogType.ALERT);
          return;
        }
        actionAdd = 0;
        toggleElementsState(dataIndex, actionAdd)
        break;
  
      case ButtonType.SAVE:
        if (!inputFields.validate(dataIndex)) return;
        
        const newData  = inputFields.getDataAsArray(dataIndex);
        if (actionAdd){
          if (!dataTables.add(dataIndex, newData)){
            dialog.show("No se pudo guardar la información", "", DialogType.ERROR, DialogButtons.ACEPT);
            return;
          }
        }else{
          if (!dataTables.update(dataIndex,newData)){
            dialog.show("Error al actualizar los datos", "", DialogType.ERROR, DialogButtons.ACEPT);
            return;
          }
        }
        actionAdd = 0;
        toggleElementsState(dataIndex)
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
        toggleElementsState(dataIndex)
        inputFields.fill(dataIndex);
        break;
  
      case ButtonType.ADD_CHILD:
        if (!dataTables.getCurrentRecord(0)) return;
        actionAdd=1;
        toggleElementsState(dataIndex, actionAdd);
        break;
  
      case ButtonType.SAVE_CHILD:
        const newData2  = inputFields.getDataAsArray(dataIndex);
        if (actionAdd){
          if (!dataTables.add(dataIndex,newData2)){
            dialog.show("No se pudo guardar la información", "", DialogType.ERROR, DialogButtons.ACEPT);
            return;
          }
        }else{
          if (!dataTables.update(dataIndex,newData2)){
            dialog.show("Error al actualizar los datos", "", DialogType.ERROR, DialogButtons.ACEPT);
            return;
          }
        }
        actionAdd = 0;
        toggleElementsState(dataIndex)
        break;
    
      case ButtonType.EDIT_CHILD:
        if (!dataTables.getCurrentRecord(dataIndex)){
          dialog.show("No hay ningun registro seleccionado para modificar","",DialogType.ALERT);
          return;
        }
        toggleElementsState(dataIndex)
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
        toggleElementsState(dataIndex);
        inputFields.fill(dataIndex);
        break;
  
      case ButtonType.CLOSE:
        break;
    }
  }
}

const toggleElementsState = (dataIndex, addNew=0) =>{
  buttons.toggleState(dataIndex);
  inputFields.toggleState(dataIndex);
  dataGrid.toggleState(dataIndex);
  if (addNew===1) inputFields.clean(dataIndex);
}