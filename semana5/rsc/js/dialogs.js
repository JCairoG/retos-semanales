'strict mode';
let dlgOverlay;
let dlg;
let dlgTitle;
let dlgImage;
let dlgMessage;
let dlgButton1;
let dlgButton2;
let dlgButton3;

export class Type{
  static INFO = 0;
  static ERROR = 1;
  static QUESTION = 2;
  static DENIED = 3;
  static ALERT = 4;
}

export class Buttons{
  static ACEPT = 0;
  static ACEPTCANCEL = 1;
  static ACEPTCANCEL_DEFAULT_CANCEL= 2;
  static YESNO = 3;
  static YESNO_DEFAULT_NO = 4;
  static ACEPTCANCELRETRY = 5;
  static ACEPTCANCELRETRY_DEFAULT_CANCEL = 6;
  static ACEPTCANCELRETRY_DEFAULT_RETRY = 7;
  static YESNORETRY = 8;
  static YESNORETRY_DEFAULT_NO = 9;
  static YESNORETRY_DEFAULT_RETRY = 10;
  static NO_BUTTONS = 11;
}

export class Result{
  static ACEPT_YES = 0;
  static CANCEL_NO = 1;
  static RETRY = 2;
}

export class TextAlign{
  static CENTER =0;
  static LEFT = 1;
  static RIGHT = 2;
}

class Dialog{
  constructor(){

    const link = document.createElement('link'); 
    link.rel = 'stylesheet'; 
    link.href = './rsc/css/dialogs.css'; 
    document.getElementsByTagName('head')[0].appendChild(link);

    let htmlDlg=`<div id="dialog-overlay" class="dialog-overlay">
                 <div id="dialog" class="dialog">
                  <div class="dialog__header">
                    <h3 id="dialog__header-text" class="dialog__header-text"></h3>
                  </div>
                  <div class="dialog__body">
                    <image id="dialog__body-image" class="dialog__body-image"/>
                    <h3 id="dialog__body-text" class="dialog__body-text"></h3>
                  </div>
                  <div id="dialog__footer" class="dialog__footer">
                    <button id="dialog_button1" class="dialog__footer-button"></button>
                    <button id="dialog_button2" class="dialog__footer-button"></button>
                    <button id="dialog_button3" class="dialog__footer-button"></button>
                  </div>
                 </div>
                </div>`;

    document.getElementsByTagName('body')[0].innerHTML+=htmlDlg;
    
    dlgOverlay = document.getElementById('dialog-overlay');
    dlg = document.getElementById('dialog');
    dlgTitle = document.getElementById('dialog__header-text');
    dlgImage = document.getElementById('dialog__body-image');
    dlgMessage = document.getElementById('dialog__body-text');
    dlgButton1 = document.getElementById('dialog_button1');
    dlgButton2 = document.getElementById('dialog_button2');
    dlgButton3 = document.getElementById('dialog_button3');

    dlgButton1.addEventListener('click', ()=>{});
    dlgButton2.addEventListener('click', ()=>{});
    dlgButton3.addEventListener('click', ()=>{});
  }  

  async show(message="", title="", type = Type.INFO, buttons = Buttons.ACEPT, textAlign = TextAlign.CENTER){
    let dlgIcon="";
    let dlgColor="";
    let dlgAlign="";
    let dlgBtnTitle1 ="";
    let dlgBtnTitle2 ="";
    let dlgBtnTitle3 ="";
    
    switch (type){
      case Type.INFO:
        dlgIcon ="./rsc/img/dlg_info.png";
        dlgColor = "#3399FF";
        if (title == "") title = "Información";
        break;

      case Type.ERROR:
        dlgIcon ="./rsc/img/dlg_error.png";
        dlgColor = "#FF0000";
        if (title == "") title = "Error";
        break;
      
      case Type.QUESTION:
        dlgIcon="./rsc/img/dlg_question.png";
        dlgColor = "#3399FF";
        if (title == "") title = "Pregunta";
        break;

      case Type.DENIED:
        dlgIcon="./rsc/img/dlg_denied.png";
        dlgColor = "#FF0000";
        if (title == "") title = "Denegado";
        break;

      case Type.ALERT:
        dlgIcon="./rsc/img/dlg_alert.png";
        dlgColor = "#FFFF00";
        if (title == "") title = "Alerta";
        break;
    }
    
    switch (buttons){
      case Buttons.ACEPT:
        dlgBtnTitle1 ="Aceptar";
        break;

      case Buttons.ACEPTCANCEL: 
        dlgBtnTitle1 ="Aceptar";
        dlgBtnTitle2 ="Cancelar";
        break;
    
      case Buttons.ACEPTCANCEL_DEFAULT_CANCEL:
        dlgBtnTitle1 ="Aceptar";
        dlgBtnTitle2 ="Cancelar";
        break;
      
      case Buttons.YESNO:
        dlgBtnTitle1 ="Si";
        dlgBtnTitle2 ="No";
        break;

      case Buttons.YESNO_DEFAULT_NO:
        dlgBtnTitle1 ="Si";
        dlgBtnTitle2 ="No";
        break;

      case Buttons.ACEPTCANCELRETRY:
        dlgBtnTitle1 ="Aceptar";
        dlgBtnTitle2 ="Cancelar";
        dlgBtnTitle3 ="Reintentar";
        break;
      
      case Buttons.ACEPTCANCELRETRY_DEFAULT_CANCEL:
        dlgBtnTitle1 ="Aceptar";
        dlgBtnTitle2 ="Cancelar";
        dlgBtnTitle3 ="Reintentar";
        break;
      
      case Buttons.ACEPTCANCELRETRY_DEFAULT_RETRY:
        dlgBtnTitle1 ="Aceptar";
        dlgBtnTitle2 ="Cancelar";
        dlgBtnTitle3 ="Reintentar";
        break;
      
      case Buttons.YESNORETRY:
        dlgBtnTitle1 ="Si";
        dlgBtnTitle2 ="No";
        dlgBtnTitle3 ="Reintentar";
        break;
      
      case Buttons.YESNORETRY_DEFAULT_NO:
        dlgBtnTitle1 ="Si";
        dlgBtnTitle2 ="No";
        dlgBtnTitle3 ="Reintentar";
        break;
      
      case Buttons.YESNORETRY_DEFAULT_RETRY:
        dlgBtnTitle1 ="Si";
        dlgBtnTitle2 ="No";
        dlgBtnTitle3 ="Reintentar";
        break;

      case Buttons.NO_BUTTONS:
          break;
    }
    
    switch (textAlign){
      case TextAlign.CENTER:
        dlgAlign = "center";
        break;
        
      case TextAlign.LEFT:
        dlgAlign = "left";
        break;

      case TextAlign.RIGHT:
        dlgAlign = "right";
        break;
    }

    dlg.style.backgroundColor = dlgColor;
    dlgTitle.innerHTML = title;
    dlgImage.src = dlgIcon;
    dlgMessage.innerHTML = message;
    dlgMessage.style.textAlign = dlgAlign;

    if (dlgBtnTitle1 != "") {
      dlgButton1.innerHTML = dlgBtnTitle1;  
      dlgButton1.style.display = "initial";
    }

    if (dlgBtnTitle2 != "") {
      dlgButton2.innerHTML = dlgBtnTitle2;  
      dlgButton2.style.display = "initial";
    }
      
    if (dlgBtnTitle3 != ""){
      dlgButton3.innerHTML = dlgBtnTitle3;
      dlgButton3.style.display = "initial";
    }

    dlgOverlay.style.display = "flex";
    
    const btnClicked = await (async () => {return new Promise(
      (resolve) => {
        if (buttons == Buttons.NO_BUTTONS){
          setTimeout(() => resolve(Result.ACEPT_YES), 1500);
        } else {
          dlgButton1.onclick = () => resolve(Result.ACEPT_YES);
          dlgButton2.onclick = () => resolve(Result.CANCEL_NO);
          dlgButton3.onclick = () => resolve(Result.RETRY);
        }
    })})();
    
    dlgOverlay.style.display = "none";
    return btnClicked;
  }
}

export const dialog = new Dialog();