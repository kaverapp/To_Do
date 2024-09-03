const tsk_Arr = JSON.parse(localStorage.getItem('tasks')) || [];
const tsk_complete_Arr = JSON.parse(localStorage.getItem('completedTasks')) || [];
const adder_B = document.querySelector("#adTask");
const disp_T = document.querySelector("#shTask");
const take_tsk = document.querySelector("#def_T");
const container = document.querySelector(".task-container");
const Contaner_completed = document.querySelector(".taskcompleted-container");



// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tsk_Arr));
    localStorage.setItem('completedTasks', JSON.stringify(tsk_complete_Arr));
}



adder_B.addEventListener("click", (e) => {
    e.preventDefault()
    let text_I = take_tsk.value;
    if (text_I.trim() !== "") {
        tsk_Arr.push(text_I);
        take_tsk.value="";
        engine();
        saveTasks(); // Save to localStorage



    }
});



function engine() {
    container.innerHTML = "";
    tsk_Arr.forEach((ele, index) => {
        let div = document.createElement("div");
        let delBut = document.createElement("button");
        let span = document.createElement("span");
        let markComplete = document.createElement("button");



        markComplete.className = "btn btn-sm btn-primary ";
        markComplete.type = "button";
        markComplete.innerText = "pending.."

        markComplete.addEventListener("click", (e) => {
            e.preventDefault()
            markComplete.innerText = "completed";
            tsk_complete_Arr.push(ele);
            tsk_Arr.splice(index, 1);

            engine();
            engine2();
            saveTasks(); // Save to localStorage


        })



        span.textContent = ele;
        span.className = "task-text";

        delBut.innerHTML = "Delete";
        delBut.className = "btn btn-sm btn-danger delete-btn";

        div.className = `task-item`;

        div.append(span, delBut, markComplete);


        delBut.addEventListener("click", () => {
            tsk_Arr.splice(index, 1);
            engine();
            saveTasks(); // Save to localStorage

        });

        container.appendChild(div);
    });
}

function engine2() {
    Contaner_completed.innerHTML = ""; // Clear completed tasks container before rendering

    tsk_complete_Arr.forEach((ele, index) => {

        let div = document.createElement("div");
        let span = document.createElement("span");




        span.textContent = ele;
        span.className = "task-text";


        div.className = `task-item`;

        div.append(span);

        Contaner_completed.appendChild(div);
    });



}

engine();
engine2();