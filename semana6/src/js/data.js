'use strict'

let data = [];            /*guarda toda la data recuperada del endpoint*/
let curRecord = [];   /*guarda una copia de los registros seleccionados de cada tabla*/

let d0 = [
  {
    "idProd": 28,
    "name": "Billetera",
    "description": "Billetera de cuero negro",
    "reference": "REF-005",
    "price" : 900,
  },
  {
    "idProd": 145,
    "name": "Cartera",
    "description": "Cartera de cuero color café",
    "reference": "CAR-195",
    "price" : 1100
  },
  {
    "idProd": 39,
    "name": "Diseño de monedero ",
    "description": "Diseño de monedero en cuero.",
    "reference": "MON-225",
    "price" : 700
  }
];

let d1 = [
   {
    "idProd": 28,
    "idLocation": "1",
    "name": "Bodega Norte",
    "address":"Dirección de la bodega Norte",
    "stock": "28",
   },
   {
   "idProd": 28,
   "idLocation": "5",
   "name": "Bodega Sur",
   "address": "Bodega ubicada en la zona sur",
   "stock": "60",
   },
   {
    "idProd": 145,
    "idLocation": "1",
    "name": "Bodega Norte",
    "address":"Dirección de la bodega Norte",
    "stock": "80",
    },
    {
    "idProd": 145,
    "idLocation": "5",
    "name": "Bodega Sur",
    "address": "Bodega ubicada en la zona sur",
    "stock": "121",
     },
     {
    "idProd": 145,
    "idLocation": "32",
    "name": "Bodega Central",
    "address": "Bodega ubicada en el centro de la ciudad",
    "stock": "47",
    },
    {
    "idProd": 39,
    "idLocation": "1",
    "name": "Bodega Sur",
    "address": "Bodega ubicada en la zona sur",
    "stock": "69",
    },
    {
    "idProd": 39,
    "idLocation": "5",
    "name": "Bodega Norte",
    "address":"Dirección de la bodega Norte",
    "stock": "1",
    },
    {
    "idProd": 39,
    "idLocation": "32",
    "name": "Bodega Central",
    "address": "Bodega ubicada en el centro de la ciudad",
    "stock": "0",
    }
  ];

class DataTableCollection{

  add = (dataIndex, record) => {
    if (isNaN(dataIndex)) return;

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

        localStorage.setItem('CRUD', JSON.stringify(data));

        break;
      }
    }
    raiseEvent ("dataChanged", dataIndex);
    return true;
  }
  
  delete = (dataIndex) => {
    if (isNaN(dataIndex)) return;

    /*borra la data de forma local*/
    const idvalue = dataTables.getValue(dataIndex,0);
    const idName = Object.keys(curRecord[dataIndex])[0]
     
    data[dataIndex] = data[dataIndex].filter(element => {
      return element[idName].toString() != idvalue
    })

    curRecord[dataIndex] = undefined;
    raiseEvent ("dataChanged", dataIndex);

    localStorage.setItem('CRUD', JSON.stringify(data));

    return true;
  }
  
  find = (dataIndex, id) =>{
    if (isNaN(dataIndex)) return;
  
    const d = data[dataIndex] 
    const idName = Object.keys(d[0])[0];
    
    curRecord[dataIndex] = d.find(item => {
      return item[idName].toString() === id
    });
    
    raiseEvent ("dataCursorMoved", dataIndex);
  
    if (dataIndex !=0) return;

    /*child tables filtering*/
    data[1] = d1.filter(item =>{
      return item[idName].toString() === id
    });
    
    raiseEvent ("dataChanged", 1);
  }
    
  getTable = (dataIndex) =>{
    if (isNaN(dataIndex)) return;
    return data[dataIndex];
  }
  
  openTables = (dataIndex) =>{
    let localData = JSON.parse(localStorage.getItem('CRUD'));

    if (localData){
      data = localData;
    }else{
      data.push(d0);
      localStorage.setItem('CRUD', JSON.stringify(data));
    }      
    raiseEvent ("dataChanged", 0);

  }
  
  getTableCount = () =>{
    return data.length;
  }
  
  getValue = (dataIndex, dataField) => {
    if (isNaN(dataIndex)) return;
  
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