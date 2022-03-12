const electron=require('electron');
const {ipcRenderer}=electron;

document.getElementById('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=document.getElementById('username').value;
    const email=document.getElementById('email').value;
    const phonenumber=document.getElementById('phonenumber').value;
    const address=document.getElementById('address').value;
    
    ipcRenderer.send('formdata',{
        name,
        email,
        phonenumber,
        address
    })

})