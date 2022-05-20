'use strict'
let BUTTON_COLLECTION =[];
let buttonProps = [];

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

export class ButtonCollection{
  constructor (){
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
    
    const BUTTONS = document.querySelectorAll("button");
  
    for (const item of BUTTONS) {
      let index;
      let type;
      let newType = 0;

      try{
        index = item.id.split("#")[0];
        type = item.id.split("#")[1].toUpperCase();
      
      }catch{
        continue;
      
      }finally{
        if (isNaN(index)) continue;
      }
      
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

  toggleState = (dataIndex) => {
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
            button.disabled = button.classList.toggle("--btn-disabled") /*via css*/
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
            button.disabled = button.classList.toggle("--btn-disabled") /*via css*/
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
            button.disabled = button.classList.toggle("--btn-disabled") /*via css*/
            break;
    
          case ButtonType.CLOSE:
            button.disabled = button.classList.toggle("--btn-disabled") /*via css*/
            break;
        }
        
        /*actualiza estado*/
        if (newType != -1){
          item.type = newType;
          button.innerHTML = buttonProps[newType].title;
        } 
      }
    }
  }
}

const onClick = (e) => {
  const dataIndex = e.target.id.split("#")[0];
  let info = BUTTON_COLLECTION.find((item) => {
    return item.id === e.target.id;  
  });
  raiseEvent ("buttonClick", dataIndex, info.type);
}

const raiseEvent = (eventName, dataIndex, buttonType) => {
  /*informar a los grids que la informacion se ha actualizado*/
  document.dispatchEvent(new CustomEvent(eventName, {
    detail: {
     "dataIndex": dataIndex,
     "buttonType": buttonType,
    },
    bubbles: true,
    composed: true
    }
  ))
}