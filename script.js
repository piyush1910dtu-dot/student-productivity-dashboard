// ✅ Quote API
async function getQuote() {
    const res = await fetch("https://zenquotes.io/api/random");
    const data = await res.json();
    document.getElementById("quote").innerText = data[0].q + " — " + data[0].a;
}
getQuote();

// ✅ To-Do List
function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();
    if (task === "") return;
    
    const li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="removeTask(this)">❌</button>`;
    document.getElementById("taskList").appendChild(li);
    
    saveTasks();
    input.value = "";
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push(li.innerText.replace("❌", "").trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `${task} <button onclick="removeTask(this)">❌</button>`;
        document.getElementById("taskList").appendChild(li);
    });
}
loadTasks();

// ✅ Focus Timer (Pomodoro)
let timer;
let timeLeft = 25 * 60;

function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time’s up! Take a break.");
            timer = null;
            timeLeft = 25 * 60;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    timeLeft = 25 * 60;
    document.getElementById("timer").innerText = "25:00";
}
