const taskList=[]; 
const badList = [];
const totalSavedHours = 15;

const handleOnSubmit =e =>{ //handle on submit is being triggered everytime the click event is there.
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hours = +frmData.get("hr") //total hours being added.

  const doNotDo = {
    task,
    hours
  }
taskList.push(doNotDo); //pushing the tasklist to the array to store it.
displayTask();
savedHours();
}

const displayTask=()=>{
let str='';
taskList.map((item,index)=>{
  str+=`
  <tr>
  <td>
    <input type="checkbox" name="" id="" />
    ${item.task}
  </td>`
  if(item.hours===1){
    str+=`<td> ${item.hours} hr</td>
    <td class="text-end">
      <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">
        <i class="fa-solid fa-trash" title="Delete"></i>
      </button>
      <button class="btn btn-sm btn-warning">
        <i
          class="fa-solid fa-arrow-right"
          title="Mark as bad list"
        ></i>
      </button>
    </td>
  </tr>`
  }else{
    str+=`<td> ${item.hours} hrs</td>
    <td class="text-end">
      <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">
        <i class="fa-solid fa-trash" title="Delete"></i>
      </button>
      <button class="btn btn-sm btn-warning">
        <i
          class="fa-solid fa-arrow-right"
          title="Mark as bad list"
        ></i>
      </button>
    </td>
  </tr>`
  };
});
document.getElementById('task-list').innerHTML=str;
}

const deleteItem=(index)=>{
  taskList.splice(index,1); // remove one item from the index position 
  displayTask();
  savedHours();
}

const savedHours=()=>{
  const total = taskList.reduce((subtotal,i)=>subtotal+i.hours,0)
  if(total===0){
    document.getElementById('totalHours').innerText="";
  }else if(total===1){
    document.getElementById('totalHours').innerText=(`Total time allocated this week ${total} hr`);
  }else{
    document.getElementById('totalHours').innerText=(`Total time allocated this week ${total} hrs`);
  }
}