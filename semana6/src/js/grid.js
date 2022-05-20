'use strict'
import {dataTables} from './data.js';
import {elementState} from './elementState.js';

let GRID_COLLECTION=[];

export class DataGridCollection{
  constructor (){
    document.addEventListener("dataChanged", (e) =>{
      this.fill(e.detail.dataIndex);
    });

    document.addEventListener("toggleState", (e) =>{
      toggleState(e.detail.dataIndex);
    });
    
    const GRIDS = document.querySelectorAll("table");
    
    for (const grid of GRIDS) {
      const index = grid.id.split("#")[0];
      const cols = grid.getElementsByTagName("th");
      let colInfo=[];
      
      for (const col of cols) {
        const colId = col.id.split("#")[1];
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
      
      if (!data) continue;
      
      if (data.length === undefined){
        /*es un json de un solo registro*/
        let cellData ="";
        
        /*
        Object.entries(data).forEach(([key, value]) => {
          console.log(key,value);
        });
        */

        for (let col of item.columns){
          const keys = col.colId.split(".");
          let colValue;
          if (keys.length===1)
            colValue = data[keys[0]];
          else if (keys.length===2)
            colValue = data[keys[0]][keys[1]];
          else if (keys.length===3)
            colValue = data[keys[0]][keys[1]][keys[2]];
            
          cellData+=`<td class="${col.class}">${colValue}</td>`;
        }
        grid.innerHTML += `<tr>${cellData}</tr>`;

      }else{
        
        data.forEach((row)=>{
          let cellData ="";
          for (let col of item.columns){
            cellData+=`<td class="${col.class}">${row[col.colId]}</td>`;
          }
          grid.innerHTML += `<tr>${cellData}</tr>`;
        })

      }
    }
  }
  
  getSelectedId = (e) =>{
    const td = e.target;
    const rowIndex = td.parentElement.rowIndex;
    if (rowIndex===0) return;

    try{
      const grid = td.parentElement.parentElement.parentElement;
      const status = grid.getAttribute("status");
      const toggle = grid.getAttribute("toggled");
      if (status ==="disabled" || (status ==="enabled" && toggle ==="1")) return;

      const idSel =  grid.rows[rowIndex].cells[0].innerHTML;
      const dataIndex = grid.id.split("#")[0];
      
      if (idSel != "") dataTables.find(dataIndex,idSel);
      
    }catch{

    }
  }

  toggleState = (dataIndex) => {
    if (isNaN(dataIndex)) return;
  
    dataIndex = dataIndex.toString();
    
    GRID_COLLECTION.forEach((item)=>{
      const grid = document.getElementById(item.id);
      elementState.toggleState(grid);
    })
  }
}

const getGrids= (dataIndex) => {
  if (isNaN(dataIndex)) return;

  dataIndex = dataIndex.toString();
  return GRID_COLLECTION.filter(item =>
    item.dataIndex === dataIndex
  );
}