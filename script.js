const taskList=[]; 
const badList = [];
const totalWeeklyHours = 168; //24*7 hours.

const handleOnSubmit =e =>{ //handle on submit is being triggered everytime the click event is there.
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hours = +frmData.get("hr") //total hours being added.
  if(hours<1){
    return alert("How can time be less than 0 ??");
  };
  const ttlBadHours = totalBadHours();
    const doNotDo = {
      task,
      hours
    }
    
    if((savedHours()+hours+ttlBadHours)>totalWeeklyHours){
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
const displayNotToDoTask=()=>{
    let str='';
    badList.map((item,index)=>{
      str+=`
      <tr>
      <td>
        <input type="checkbox" name="" id="" />
        ${item.task}
      </td>`
      if(item.hours===1){
        str+=`<td> ${item.hours} hr</td>
        <td class="text-end">
        <button class="btn btn-sm btn-warning" onclick="markAsToDo(${index})">
            <i
              class="fa-solid fa-arrow-left"
              title="Mark as bad list"
            ></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteBadItem(${index})">
            <i class="fa-solid fa-trash" title="Delete"></i>
          </button>
          
        </td>
      </tr>`
      }else{
        str+=`<td> ${item.hours} hrs</td>
        <td class="text-end">
        
          <button class="btn btn-sm btn-warning" onclick="markAsToDo(${index})">
            <i
              class="fa-solid fa-arrow-left"
              title="Mark as to-do list"
            ></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteBadItem(${index})">
          <i class="fa-solid fa-trash" title="Delete"></i>
        </button>
        </td>
      </tr>`
      };
    });
    document.getElementById('bad-list').innerHTML=str;
    }

const deleteItem=(index)=>{
  if(!confirm("Do you really want to delete this ?")){
   return;
  }

  taskList.splice(index,1); // remove one item from the index position 
  displayTask();
  savedHours();
}
const deleteBadItem=(index)=>{
  if(!confirm("Do you really want to delete this ?")){
   return;
  }

  badList.splice(index,1); // remove one item from the index position 
  displayNotToDoTask();
  totalBadHours();
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
const totalBadHours = ()=>{
  const ttlBadHours = badList.reduce((subttl,item)=>subttl+item.hours,0);
  if(ttlBadHours===0){
    document.getElementById('totalBadHr').innerText="";
  }else if(ttlBadHours===1){
    document.getElementById('totalBadHr').innerText=(`Total time saved this week ${ttlBadHours} hr`);
  }
  else{
    document.getElementById('totalBadHr').innerText=(`Total time saved this week ${ttlBadHours} hrs`);
  }
  return ttlBadHours;

}
const doNotDoTask = i =>{
  const itm= taskList.splice(i,1);
  displayTask();
  badList.push(itm[0]);
  displayNotToDoTask();
  totalBadHours();
  savedHours();
}
const markAsToDo = i =>{
  const itm= badList.splice(i,1);
  displayNotToDoTask();
  taskList.push(itm[0]);
  displayTask();
  totalBadHours();
  savedHours();
}