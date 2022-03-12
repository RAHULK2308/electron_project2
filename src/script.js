const electron=require('electron');
const {ipcRenderer}=electron;

document.getElementById('btn').addEventListener('click',()=>{
    console.log('btn clicked')
    ipcRenderer.send('btnclicked')
})

ipcRenderer.on('data',function(e,data){
    
      let ul=document.querySelector('ul')
      let li1=document.createElement('li')
      let li2=document.createElement('li')
      let li3=document.createElement('li')
      
        ul.innerText=data.name;
        li1.innerText=data.email;
        ul.appendChild(li1)
        li2.innerText=data.password;
        ul.appendChild(li2)
        li3.innerText=data.address;
        ul.appendChild(li3)
        
     
})

