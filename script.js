const taskList=[]; 
const badList = [];
const totalWeeklyHours = 168; //24*7 hours.

const handleOnSubmit =e =>{ //handle on submit is being triggered everytime the click event is there.
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hours = +frmData.get("hr") //total hours being added.
  if(hours<1){
    return alert("How can time be less than 1 hour ??");
  };
    const doNotDo = {
      task,
      hours
    }

    if((savedHours()+hours)>totalWeeklyHours){
      alert("The total number of hours in a week is 168");
    }else{
      taskList.push(doNotDo); //pushing the tasklist to the array to store it.
      displayTask();
      savedHours();
    }
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
      <button class="btn btn-sm btn-warning" onclick="doNotDoTask(${index})">
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
      <button class="btn btn-sm btn-warning" onclick="doNotDoTask(${index})">
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
  if(!confirm("Do you really want to delete this ?")){
   return;
  }

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
  }
  else{
    document.getElementById('totalHours').innerText=(`Total time allocated this week ${total} hrs`);
  }
  return total;
}

const doNotDoTask = i =>{
  const itm= taskList.splice(i,1);
  displayTask();
  badList.push(itm[0]);
}