$(function () {

    let newtodoel = $('#newtodo')
    let addtodobtn = $('#addtodo')
    let todolist = $('#todolist')

    function refreshTodos() {
        todolist.empty();
        $.get('/todos',
            function (data) {
                for (todo of data) {
                    todolist.append($(`<li> ${todo.task}</li>`))
                }
            }
        )
    }


    refreshTodos();

    addtodobtn.click(function () {
        console.log(newtodoel.val());
        $.post('/todos',
            {task: newtodoel.val()},
            function (data,status) {
                console.log("Status:",status);
                if (data.success) {
                    console.log("Done");
                }
            }
        )

    })



})