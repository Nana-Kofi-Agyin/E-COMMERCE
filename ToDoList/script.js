document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if(taskText) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');

        const taskContent = document.createElement('span');
        taskContent.textContent = taskTest;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListner('click', function(){
            taskText.removechild(taskList);
        });

        li.appendChild(taskContent);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        taskInput.value = '';
    }
});