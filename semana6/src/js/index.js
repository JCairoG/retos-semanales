'use strict'
import {dataTables} from './data.js';
import {inputFields} from './inputs.js';
import {buttons} from './buttons.js';
import {dataGrid} from './grid.js';

const documentReady = () => {
  inputFields.initialize(); 
  buttons.initialize();
  dataGrid.initialize();
  dataTables.openTables();
}

document.addEventListener('DOMContentLoaded', documentReady);