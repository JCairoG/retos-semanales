'use strict'
import {dialog} from './dialogs.js';

let data = [];            /*guarda toda la data recuperada del endpoint*/
let curRecord = [];       /*guarda una copia de los registros seleccionados de cada tabla*/
let tableInfo = [];

class DataTableCollection{
  add = (dataIndex, record) => {
    if (isNaN(dataIndex)) return;

    /*si es child, agrega el valor del parent id*/
    if (!isNaN(tableInfo[dataIndex].parentIndex)){
      const parentValue = this.getValue(tableInfo[dataIndex].parentIndex, tableInfo[dataIndex].parentField);
      record[tableInfo[dataIndex].parentField] = parentValue;
    }

    /*por ahora agrega la data de forma local*/
    data[dataIndex].push(record); 
    raiseEvent ("dataChanged", dataIndex);
    return true;
  }
  
  update = (dataIndex, record) => {
    if (isNaN(dataIndex)) return;
    /*por ahora actualiza la data de forma local*/
    
    const id = Object.values(record)[0].toString();
    for (let i = 0; data[dataIndex].length; i++){
      if (Object.values(data[dataIndex][i])[0].toString() === id){
        data[dataIndex][i] = record;
        curRecord[dataIndex] = record;
        break;
      }
    }
    raiseEvent ("dataChanged", dataIndex);
    return true;
  }
  
  delete = (dataIndex) => {
    if (isNaN(dataIndex)) return;

    /*borra la data de forma local*/
    const idvalue = this.getValue(dataIndex,0);
    const idName = Object.keys(curRecord[dataIndex])[0]
     
    data[dataIndex] = data[dataIndex].filter(element => {
      return element[idName].toString() != idvalue
    })

    curRecord[dataIndex] = undefined;
    raiseEvent ("dataChanged", dataIndex);

    return true;
  }

  setInfo = (dataIndex, dataSource, idName ="", parentIndex="", parentField="") => {
    tableInfo.push({"dataIndex" : dataIndex, "source" : dataSource, "idName": idName, "parentIndex": parentIndex, "parentField": parentField});
  }

  find = (dataIndex, id) => {
    if (isNaN(dataIndex)) return;

    const d = data[dataIndex]; 
    let idName = tableInfo[dataIndex].idName;
    
    if (idName==="") return;

    if (d.length === undefined){
      /*es un json de un solo registro*/
      curRecord[dataIndex] = d;
    }else{
      curRecord[dataIndex] = d.find(item => {
        return item[idName].toString() === id
      });
    }

    raiseEvent ("dataCursorMoved", dataIndex);
    
    tableInfo.forEach(async info => {
      if (info.parentIndex.toString() === dataIndex.toString()){
        const parentValue = this.getValue(info.parentIndex, info.parentField);

        await this.fetch(info.dataIndex);
        data[info.dataIndex] = data[info.dataIndex].filter(row =>{
          return row[info.parentField] === parentValue;
        });
        raiseEvent ("dataChanged", info.dataIndex);
      }
    })
  }

  fetch = async (dataIndex, method = "GET") => {
    dialog.showWait ("Conectando al servidor",document.title);

    try{
      const response = await fetch(tableInfo[dataIndex].source, {method: method});
      data[dataIndex] = await response.json();

      let idName = tableInfo[dataIndex].idName;
      try{
        if (idName===""){
          /*lo busca de forma automatica*/
          idName = Object.keys(data[dataIndex][0])[0];
          tableInfo["idName"] = idName;
        }
      }catch {
        console.log("Error al obtener el ID");
      }

      raiseEvent ("dataChanged", dataIndex)
      dialog.closeWait();
      return true;

    } catch (error) {
      dialog.closeWait();
      dialog.showWait ("Error al conectar al servidor\r" + error,document.title);
      setTimeout(() => dialog.closeWait() ,2500);
      return false;
    }
  }

  getTable = (dataIndex) =>{
    if (isNaN(dataIndex)) return;
    return data[dataIndex];
  }

  getTableCount = () =>{
    return data.length;
  }
  
  getValue = (dataIndex, dataField) => {
    if (isNaN(dataField)) {
      return curRecord[dataIndex][dataField];
    }else{
      return Object.values(curRecord[dataIndex])[dataField];
    }
  }
  
  getCurrentRecord = (dataIndex) =>{
    if (isNaN(dataIndex)) return;
    return curRecord[dataIndex];
  }
}

export const dataTables = new DataTableCollection();

const raiseEvent = (eventName, dataIndex) => {
  /*informar a los grids que la informacion se ha actualizado*/
  document.dispatchEvent(new CustomEvent(eventName, {
    detail: {
     "dataIndex": dataIndex,
    },
    bubbles: true,
    composed: true
    }
  ))
}
