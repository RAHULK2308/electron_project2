const { app, BrowserWindow, ipcMain } = require('electron')
const path=require('path');
const ipc=require('electron').ipcMain;

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/sample.db');


db.run('CREATE TABLE IF NOT EXISTS users(name text,email text, password text,address text)', (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
})

let formwindow;
let mainWindow;


//creating new window
// const createWindow = () => {
//      win = new BrowserWindow({
//       width: 800,
//       height: 600,
//       webPreferences: {
//         nodeIntegration: true,
//         contextIsolation:false
//       }
//     })
//     //loading index.html file
//     win.loadURL('file://'+__dirname+'/src/index.html');

//     win.on('closed',function(){
//         app.quit();
//     })
//   }

//listen for app to be ready
app.on('ready',function(){
  //create window
  mainWindow = new BrowserWindow({
    width: 800,
          height: 600,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
          }
  })
  // loading index.html file
    mainWindow.loadURL('file://'+__dirname+'/src/index.html');

    mainWindow.on('closed',function(){
        app.quit();
    })
})

  //handling form window
  function createFormWindow(){
    formwindow = new BrowserWindow({
        width: 400,
        height: 400,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation:false
        }
      })
      //loading index.html file
      formwindow.loadURL('file://'+__dirname+'/src/form.html');
    
  }

ipc.on('btnclicked',function(){
createFormWindow()
})

ipc.on('formdata',function(e,data){
    let username=data.name;
    let email=data.email;
    let phonenumber=data.phonenumber;
    let address=data.address
    let items

    db.run(`INSERT INTO users(name,email,password,address)
    VALUES('${username}','${email}',
          '${phonenumber}','${address}')`, (err) => {
      if (err) {
      console.log(err);
        throw err;
              }
          })

    db.each(`SELECT * FROM users`, (err, row) => {
        if (err) {
            console.log(err);
            throw err;
        }
        mainWindow.webContents.send('data',row)
    })
    
    
    formwindow.close()
})

