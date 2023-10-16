//data :  array de objetos
let tasks = [
  { id: 1, name: "bañarse", completed: false },
  { id: 2, name: "viajar", completed: false },
  { id: 3, name: "trabajar", completed: false },
];

let addValue = document.getElementById("agregar"); //  input
let addButton = document.getElementById("confirmar"); // boton
let taksList = document.getElementById("tareass"); //   div donde se mostraran
let total = document.getElementById("total"); // donde se mostrara el total
let realizadas = document.getElementById("realizadas"); //  donde se mostrara realizadas

//agregar una tarea desde el input
const addTask = () => {
  const taksName = addValue.value;
  if (!taksName) {
    alert("tienes que anotar una tarea antes de dar click");
    return; // esto es para que no se ejecute otra parte del codigo.
  }
  const lastTask = tasks[tasks.length - 1];
  const newTask = {
    id: lastTask ? lastTask.id + 1 : 1,
    name: taksName,
    completed: false,
  };
  tasks.push(newTask);
  console.log(tasks);
  //Se agrego el render tasks para que se actualice cuando se agrega una tarea nueva
  renderTasks();
};
addButton.addEventListener("click", addTask);

//  cambio de status
const chargeStatus = (id) => {
  const taskIndex = tasks.findIndex((tasks) => tasks.id === id);
  if (tasks[taskIndex].completed === false) {
    const newObject = {
      id: tasks[taskIndex].id,
      name: tasks[taskIndex].name,
      completed: true,
    };
    tasks.splice(taskIndex, 1, newObject);
  } else {
    tasks[taskIndex].completed = false;
  }
  console.log(tasks);
  renderTasks();
};

const deleteTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  tasks.splice(taskIndex, 1);
  console.log(tasks);
  renderTasks();
};

const renderTasks = () => {
  let html = "";
  let doneCount = [];
  tasks.forEach((task) => {
    //variable para agregar clase a tarea cuando completed es "true"
    const completed = task.completed
      ? `<p id="${task.id}" class="completed">${task.name}</p>`
      : `<p id="${task.id}">
        ${task.name}
      </p>`;
    html += `
    <div class="caja">
    <p>${task.id}</p>
    ${completed}
    <button onclick="chargeStatus(${task.id})">realizada</button>
    <p> <i class="fa-solid fa-circle-minus" onclick="deleteTask(${task.id})"></i></p>
    </div>
  
    `;
    if (task.completed === true) {
      doneCount.push(task);
    }
  });
  taksList.innerHTML = html;
  total.innerHTML = tasks.length;
  realizadas.innerHTML = doneCount.length;
};

renderTasks();
