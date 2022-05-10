'use strict'
import {dataTables} from './data.js';
import {ButtonType} from './buttons.js';

let GRID_COLLECTION=[];

class DataGridCollection{
  constructor (){
    document.addEventListener("dataChanged", (e) =>{
      this.fill(e.detail.dataIndex);
    });

    document.addEventListener("buttonClick", (e) =>{
      toggleState(e.detail.dataIndex, e.detail.buttonType);
    });
  }

  initialize = () => {
    const GRIDS = document.querySelectorAll("table");
    
    for (const grid of GRIDS) {
      const index = grid.id.split("_")[0];
      const cols = grid.getElementsByTagName("th");
      let colInfo=[];
      
      for (const col of cols) {
        const colId = col.id.split("_")[1];
        colInfo.push ({"colId": colId, "class": col.className});
      }
      GRID_COLLECTION.push({"dataIndex":index, "id":grid.id, "columns":colInfo});
      grid.addEventListener("click", this.getSelectedId);
    }
  }
  
  fill = (dataIndex) => {
    if (isNaN(dataIndex)) return;

    const data = dataTables.getTable(dataIndex);
    if (!data) return;

    for (const item of getGrids(dataIndex)){
      const grid = document.getElementById(item.id).getElementsByTagName("tbody")[0];
      grid.innerHTML = "";
      data.forEach((row)=>{
        let cellData ="";
        for (let col of item.columns){
          cellData+=`<td class="${col.class}">${row[col.colId]}</td>`;
        }
        grid.innerHTML += `<tr>${cellData}</tr>`;
      })
    }
  }
  
  getSelectedId = (e) =>{
    const td = e.target;
    const rowIndex = td.parentElement.rowIndex;
    if (rowIndex===0) return;
    try{
      const grid = td.parentElement.parentElement.parentElement;
      if (grid.classList.contains("--disabled")) return;

      const idSel =  grid.rows[rowIndex].cells[0].innerHTML;
      const dataIndex = grid.id.split("_")[0];
      if (idSel != "") dataTables.find(dataIndex,idSel);
    }catch{

    }
  }
}

const getGrids= (dataIndex) => {
  if (isNaN(dataIndex)) return;

  dataIndex = dataIndex.toString();
  return GRID_COLLECTION.filter(item =>
    item.dataIndex === dataIndex
  );
}

const toggleState= (dataIndex, buttonType) => {
  if (isNaN(dataIndex)) return;

  switch (buttonType){
    case ButtonType.ADD: 
    case ButtonType.EDIT: 
    case ButtonType.CANCEL: 
    case ButtonType.ADD_CHILD: 
    case ButtonType.EDIT_CHILD:
    case ButtonType.CANCEL_CHILD: 
      console.log('toggle state grids', buttonType);
      GRID_COLLECTION.forEach(item => {
        document.getElementById(item.id).classList.toggle("--disabled");
      });      
    break;
  }

}

export const dataGrid = new DataGridCollection();