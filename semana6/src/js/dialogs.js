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
let idTimer = 0;

export const DialogType = Object.freeze({
  INFO: 0,
  ERROR: 1,
  QUESTION: 2,
  DENIED: 3,
  ALERT: 4
})

export const DialogButtons = Object.freeze({
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

export const DialogResult = Object.freeze({
  ACEPT_YES: 0,
  CANCEL_NO: 1,
  RETRY: 2
})

export const DialogTextAlign = Object.freeze({
  CENTER: "center",
  LEFT: "left",
  RIGHT: "right",
})

class Dialog{
  constructor(){
    const link = document.createElement('link'); 
    link.rel = 'stylesheet'; 
    link.href = './src/css/dialogs.css'; 
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
      {type: DialogType.INFO,     icon: "./src/img/dlg_info.png",    color: "#3399FF", defaultTitle: "Información"},
      {type: DialogType.ERROR,    icon: "./src/img/dlg_error.png",   color: "#FF0000", defaultTitle: "Error"},
      {type: DialogType.QUESTION, icon: "./src/img/dlg_question.png",color: "#3399FF", defaultTitle: "Pregunta"},
      {type: DialogType.DENIED,   icon: "./src/img/dlg_denied.png",  color: "#FF0000", defaultTitle: "Denegado"},
      {type: DialogType.ALERT,    icon: "./src/img/dlg_alert.png",   color: "#FFFF00", defaultTitle: "Alerta"}
    ];

  }  

  async show(message="", title="", type = DialogType.INFO, buttons = DialogButtons.ACEPT, textAlign = DialogTextAlign.CENTER){
    let btnText ="";
    let btnText2 ="";
    let btnText3 ="";
    let btnFocus = 1;

    switch (buttons){
      case DialogButtons.ACEPT:
        btnText ="Aceptar";
        break;

      case DialogButtons.ACEPTCANCEL: 
        btnText ="Aceptar";
        btnText2 ="Cancelar";
        break;
    
      case DialogButtons.ACEPTCANCEL_DEFAULT_CANCEL:
        btnText ="Aceptar";
        btnText2 ="Cancelar";
        btnFocus = 2;
        break;
      
      case DialogButtons.YESNO:
        btnText ="Si";
        btnText2 ="No";
        break;

      case DialogButtons.YESNO_DEFAULT_NO:
        btnText ="Si";
        btnText2 ="No";
        btnFocus = 2;
        break;

      case DialogButtons.ACEPTCANCELRETRY:
        btnText ="Aceptar";
        btnText2 ="Cancelar";
        btnText3 ="Reintentar";
        break;
      
      case DialogButtons.ACEPTCANCELRETRY_DEFAULT_CANCEL:
        btnText ="Aceptar";
        btnText2 ="Cancelar";
        btnText3 ="Reintentar";
        btnFocus = 2;
        break;
      
      case DialogButtons.ACEPTCANCELRETRY_DEFAULT_RETRY:
        btnText ="Aceptar";
        btnText2 ="Cancelar";
        btnText3 ="Reintentar";                        
        btnFocus = 3;
        break;
      
      case DialogButtons.YESNORETRY:
        btnText ="Si";
        btnText2 ="No";
        btnText3 ="Reintentar";
        break;
      
      case DialogButtons.YESNORETRY_DEFAULT_NO:
        btnText ="Si";
        btnText2 ="No";
        btnText3 ="Reintentar";
        btnFocus = 2;
        break;
      
      case DialogButtons.YESNORETRY_DEFAULT_RETRY:
        btnText ="Si";
        btnText2 ="No";
        btnText3 ="Reintentar";
        btnFocus = 3;
        break;

      case DialogButtons.NO_BUTTONS:
          break;
    }
    
    if (title == undefined || title ==="") title = typeProps[type].defaultTitle;
    
    dlg.style.backgroundColor = typeProps[type].color;
    dlgTitle.innerHTML = title;
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

    if (btnFocus === 1){
      dlgButton1.classList.toggle("dialog__footer-button--default");
      dlgButton1.focus();
    }else if(btnFocus === 2){
      dlgButton2.classList.toggle("dialog__footer-button--default");
      dlgButton2.focus();
    }else if(btnFocus === 3){
      dlgButton3.classList.toggle("dialog__footer-button--default");
      dlgButton3.focus();
    }
      
    clearTimeout(idTimer);
    
    idTimer = setTimeout(() =>{
      dlg.classList.toggle("dialog--visible"), 1000
    });

    return await (async () => {return new Promise(
      (resolve) => {
        if (buttons == DialogButtons.NO_BUTTONS){
          setTimeout(() => resolve(DialogResult.ACEPT_YES), 1500);
        } else {
          dlgButton1.onclick = () => resolve(DialogResult.ACEPT_YES);
          dlgButton2.onclick = () => resolve(DialogResult.CANCEL_NO);
          dlgButton3.onclick = () => resolve(DialogResult.RETRY);
        }
      })})().then((result) => {
        dlgOverlay.style.display = "none";
        dlgButton1.style.display = "none"
        dlgButton2.style.display = "none"
        dlgButton3.style.display = "none"
        dlg.classList.toggle("dialog--visible")

        if (btnFocus === 1)
          dlgButton1.classList.toggle("dialog__footer-button--default");
        else if(btnFocus === 2)
          dlgButton2.classList.toggle("dialog__footer-button--default");
        else if(btnFocus === 3)
          dlgButton3.classList.toggle("dialog__footer-button--default");

        return result;
      });
  }
}

export const dialog = new Dialog();