'strict mode';
class DialogType{
  static INFO = 0;
  static ERROR = 1;
  static QUESTION = 2;
  static DENIED = 3;
  static ALERT = 4;
}

class DialogButtons{
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

class DialogResult{
  static ACEPT_YES = 0;
  static CANCEL_NO = 1;
  static RETRY = 2;
}

class DialogTextAlign{
  static CENTER =0;
  static LEFT = 1;
  static RIGHT = 2;
}

var dlgOverlay;
var dlg;
var dlgTitle;
var dlgImage;
var dlgMessage;
var dlgButton1;
var dlgButton2;
var dlgButton3;

class DialogBox{
  constructor(){
    let htmlDlg='<div id="dialog-overlay" class="dialog-overlay">'+
                   '<div id="dialog" class="dialog">'+
                   '<div class="dialog__header">'+
                   '<h3 id="dialog__header-text" class="dialog__header-text"></h3>'+
                   '</div>'+
                   '<div class="dialog__body">'+
                   '<image id="dialog__body-image" class="dialog__body-image"/>'+
                   '<h3 id="dialog__body-text" class="dialog__body-text"></h3>'+
                   '</div>'+
                   '<div id="dialog__footer" class="dialog__footer">'+
                   '<button id="dialog_button1" class="dialog__footer-button"></button>'+
                   '<button id="dialog_button2" class="dialog__footer-button"></button>'+
                   '<button id="dialog_button3" class="dialog__footer-button"></button>'+
                   '</div></div></div>';

    document.getElementsByTagName('body')[0].innerHTML+=htmlDlg;

    dlgOverlay = document.getElementById('dialog-overlay');
    dlg = document.getElementById('dialog');
    dlgTitle = document.getElementById('dialog__header-text');
    dlgImage = document.getElementById('dialog__body-image');
    dlgMessage = document.getElementById('dialog__body-text');
    dlgButton1 = document.getElementById('dialog_button1');
    dlgButton2 = document.getElementById('dialog_button2');
    dlgButton3 = document.getElementById('dialog_button3');
  }  
  
  show (message="", title="", type = DialogType.INFO, buttons = DialogButtons.NO_BUTTONS, textAlign = DialogTextAlign.CENTER) { 
    let dlgIcon="";
    let dlgColor="";
    let dlgAlign="";
    let dlgBtnTitle1 ="";
    let dlgBtnTitle2 ="";
    let dlgBtnTitle3 ="";

    switch (type){
      case DialogType.INFO:
        dlgIcon ="./rsc/img/dlg_info.png";
        dlgColor = "#3399FF";
        if (title == "") title = "Información";
        break;

      case DialogType.ERROR:
        dlgIcon ="./rsc/img/dlg_error.png";
        dlgColor = "#FF0000";
        if (title == "") title = "Error";
        break;
      
      case DialogType.QUESTION:
        dlgIcon="./rsc/img/dlg_question.png";
        dlgColor = "#3399FF";
        if (title == "") title = "Pregunta";
        break;

      case DialogType.DENIED:
        dlgIcon="./rsc/img/dlg_denied.png";
        dlgColor = "#FF0000";
        if (title == "") title = "Denegado";
        break;

      case DialogType.ALERT:
        dlgIcon="./rsc/img/dlg_alert.png";
        dlgColor = "#FFFF00";
        if (title == "") title = "Alerta";
        break;
    }
    
    switch (buttons){
      case DialogButtons.ACEPT:
        dlgBtnTitle1 ="Aceptar";
        break;

      case DialogButtons.ACEPTCANCEL: 
        dlgBtnTitle1 ="Aceptar";
        dlgBtnTitle2 ="Cancelar";
        break;
    
      case DialogButtons.ACEPTCANCEL_DEFAULT_CANCEL:
        dlgBtnTitle1 ="Aceptar";
        dlgBtnTitle2 ="Cancelar";
        break;
      
      case DialogButtons.YESNO:
        dlgBtnTitle1 ="Si";
        dlgBtnTitle2 ="No";
        break;

      case DialogButtons.YESNO_DEFAULT_NO:
        dlgBtnTitle1 ="Si";
        dlgBtnTitle2 ="No";
        break;

      case DialogButtons.ACEPTCANCELRETRY:
        dlgBtnTitle1 ="Aceptar";
        dlgBtnTitle2 ="Cancelar";
        dlgBtnTitle3 ="Reintentar";
        break;
      
      case DialogButtons.ACEPTCANCELRETRY_DEFAULT_CANCEL:
        dlgBtnTitle1 ="Aceptar";
        dlgBtnTitle2 ="Cancelar";
        dlgBtnTitle3 ="Reintentar";
        break;
      
      case DialogButtons.ACEPTCANCELRETRY_DEFAULT_RETRY:
        dlgBtnTitle1 ="Aceptar";
        dlgBtnTitle2 ="Cancelar";
        dlgBtnTitle3 ="Reintentar";
        break;
      
      case DialogButtons.YESNORETRY:
        dlgBtnTitle1 ="Si";
        dlgBtnTitle2 ="No";
        dlgBtnTitle3 ="Reintentar";
        break;
      
      case DialogButtons.YESNORETRY_DEFAULT_NO:
        dlgBtnTitle1 ="Si";
        dlgBtnTitle2 ="No";
        dlgBtnTitle3 ="Reintentar";
        break;
      
      case DialogButtons.YESNORETRY_DEFAULT_RETRY:
        dlgBtnTitle1 ="Si";
        dlgBtnTitle2 ="No";
        dlgBtnTitle3 ="Reintentar";
        break;

      case DialogButtons.NO_BUTTONS:
          break;
    }
    
    switch (textAlign){
      case DialogTextAlign.CENTER:
        dlgAlign = "center";
        break;
        
      case DialogTextAlign.LEFT:
        dlgAlign = "left";
        break;

      case DialogTextAlign.RIGHT:
        dlgAlign = "right";
        break;
    }

    dlg.style.backgroundColor = dlgColor;
    dlgTitle.innerHTML = title;
    dlgImage.src = dlgIcon;
    dlgMessage.innerHTML = message;
    dlgMessage.style.textAlign = dlgAlign;

    dlgButton1.innerHTML = dlgBtnTitle1;

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

    if (buttons == DialogButtons.NO_BUTTONS){
      window.setTimeout(this.result, 1800, DialogResult.ACEPT_YES);
    }
  
  }

  result = (r) =>{
    dlgOverlay.style.display = "none";
  }
}

const msgBox = new DialogBox();

dlgButton1.addEventListener('click', () => msgBox.result(DialogResult.ACEPT_YES));
dlgButton2.addEventListener('click', () => msgBox.result(DialogResult.CANCEL_NO));
dlgButton3.addEventListener('click', () => msgBox.result(DialogResult.RETRY));