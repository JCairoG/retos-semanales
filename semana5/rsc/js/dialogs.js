'strict mode';
let dlgOverlay;
let dlg;
let dlgTitle;
let dlgImage;
let dlgMessage;
let dlgButton1;
let dlgButton2;
let dlgButton3;
let typeProps = [];    

export const Type = Object.freeze({
  INFO: 0,
  ERROR: 1,
  QUESTION: 2,
  DENIED: 3,
  ALERT: 4
})

export const Buttons = Object.freeze({
  ACEPT: 0,
  ACEPTCANCEL: 1,
  ACEPTCANCEL_DEFAULT_CANCEL: 2,
  YESNO: 3,
  YESNO_DEFAULT_NO: 4,
  ACEPTCANCELRETRY: 5,
  ACEPTCANCELRETRY_DEFAULT_CANCEL: 6,
  ACEPTCANCELRETRY_DEFAULT_RETRY: 7,
  YESNORETRY: 8,
  YESNORETRY_DEFAULT_NO: 9,
  YESNORETRY_DEFAULT_RETRY: 10,
  NO_BUTTONS: 11
})

export const Result = Object.freeze({
  ACEPT_YES: 0,
  CANCEL_NO: 1,
  RETRY: 2
})

export const TextAlign = Object.freeze({
  CENTER: "center",
  LEFT: "left",
  RIGHT: "right",
})

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

    typeProps = [
      {type: Type.INFO,     icon: "./rsc/img/dlg_info.png",    color: "#3399FF", title: "Informaci??n"},
      {type: Type.ERROR,    icon: "./rsc/img/dlg_error.png",   color: "#FF0000", title: "Error"},
      {type: Type.QUESTION, icon: "./rsc/img/dlg_question.png",color: "#3399FF", title: "Pregunta"},
      {type: Type.DENIED,   icon: "./rsc/img/dlg_denied.png",  color: "#FF0000", title: "Denegado"},
      {type: Type.ALERT,    icon: "./rsc/img/dlg_alert.png",   color: "#FFFF00", title: "Alerta"}
    ];

  }  

  async show(message="", title="", type = Type.INFO, buttons = Buttons.ACEPT, textAlign = TextAlign.CENTER){
    let btnText ="";
    let btnText2 ="";
    let btnText3 ="";
    let btnFocus = 1;
    
    switch (buttons){
      case Buttons.ACEPT:
        btnText ="Aceptar";
        break;

      case Buttons.ACEPTCANCEL: 
        btnText ="Aceptar";
        btnText2 ="Cancelar";
        break;
    
      case Buttons.ACEPTCANCEL_DEFAULT_CANCEL:
        btnText ="Aceptar";
        btnText2 ="Cancelar";
        btnFocus = 2;
        break;
      
      case Buttons.YESNO:
        btnText ="Si";
        btnText2 ="No";
        break;

      case Buttons.YESNO_DEFAULT_NO:
        btnText ="Si";
        btnText2 ="No";
        btnFocus = 2;
        break;

      case Buttons.ACEPTCANCELRETRY:
        btnText ="Aceptar";
        btnText2 ="Cancelar";
        btnText3 ="Reintentar";
        break;
      
      case Buttons.ACEPTCANCELRETRY_DEFAULT_CANCEL:
        btnText ="Aceptar";
        btnText2 ="Cancelar";
        btnText3 ="Reintentar";
        btnFocus = 2;
        break;
      
      case Buttons.ACEPTCANCELRETRY_DEFAULT_RETRY:
        btnText ="Aceptar";
        btnText2 ="Cancelar";
        btnText3 ="Reintentar";                        
        btnFocus = 3;
        break;
      
      case Buttons.YESNORETRY:
        btnText ="Si";
        btnText2 ="No";
        btnText3 ="Reintentar";
        break;
      
      case Buttons.YESNORETRY_DEFAULT_NO:
        btnText ="Si";
        btnText2 ="No";
        btnText3 ="Reintentar";
        btnFocus = 2;
        break;
      
      case Buttons.YESNORETRY_DEFAULT_RETRY:
        btnText ="Si";
        btnText2 ="No";
        btnText3 ="Reintentar";
        btnFocus = 3;
        break;

      case Buttons.NO_BUTTONS:
          break;
    }
    
    dlg.style.backgroundColor = typeProps[type].color;
    dlgTitle.innerHTML = (title == "" ? typeProps[type].defaultTitle: title);
    dlgImage.src = typeProps[type].icon;
    dlgMessage.innerHTML = message;
    dlgMessage.style.textAlign = textAlign;

    if (btnText != "") {
      dlgButton1.innerHTML = btnText;  
      dlgButton1.style.display = "initial";
    }

    if (btnText2 != "") {
      dlgButton2.innerHTML = btnText2;  
      dlgButton2.style.display = "initial";
    }
      
    if (btnText3 != ""){
      dlgButton3.innerHTML = btnText3;
      dlgButton3.style.display = "initial";
    }

    dlgOverlay.style.display = "flex";

    if (btnFocus === 1)
      dlgButton1.focus();
    else if(btnFocus === 2)
      dlgButton2.focus();
    else if(btnFocus === 3)
      dlgButton3.focus();

    const dlgResult = await (async () => {return new Promise(
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
    dlgButton1.style.display = "none"
    dlgButton2.style.display = "none"
    dlgButton3.style.display = "none"

    return dlgResult;
  }
}

export const dialog = new Dialog();