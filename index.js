let form = document.querySelector(`#my-form`)
let users = document.querySelector(`#users`)
form.addEventListener(`submit`, saveToLocalStorage)

function saveToLocalStorage(e) {
    // e.preventDefault()
    let name = document.querySelector(`#name`).value
    let email = document.querySelector(`#email`).value
    let obj1 = {
        name: name,
        email: email
    }

    axios.post(`https://crudcrud.com/4dda68aec9d44ad3a37b5c1dced135cb/appointmentData`,obj1)
    .then((res)=>{
        console.log(res.data);
        addToList(res.data)
    })
    .catch((err)=>{console.log(err)})

    let jsonFile = JSON.stringify(obj1)
 
}


window.addEventListener('DOMContentLoaded',()=>{
    let datas;
    axios.get(`http://localhost:3000/`)
    .then(res=>{
      let datas=res.data; console.log(datas);
      datas.map((data)=>{
          addToList(data)
      })
    })
    
})
function addToList(userObj) {
    
        let li = document.createElement('li')
        li.id=userObj.id
        console.log(li);
        li.className=userObj.email
        let text = document.createTextNode(`${userObj.name}:${userObj.email}`)
        li.appendChild(text)
        let editBtn=document.createElement('input')
        editBtn.type="button"
        editBtn.value="edit"
        
        editBtn.addEventListener(`click`,()=>{
            document.querySelector(`#name`).value=userObj.name
            document.querySelector(`#email`).value=userObj.email
            li.remove()
        })
        let deleteBtn=document.createElement(`input`)
        deleteBtn.type=`button`
        deleteBtn.value=`delete`
        
        deleteBtn.addEventListener(`click`,()=>{
            
            axios.delete(`http://localhost:3000/?id=${userObj.id}`)
            console.log(userObj);
            li.remove()
            

        })
        li.appendChild(editBtn)
        li.appendChild(deleteBtn)
        users.appendChild(li)
    

   
}