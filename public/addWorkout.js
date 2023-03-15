function addNewWorkout (){
    var workoutName = document.getElementById('workoutName').value
    var workoutDescription = document.getElementById('workoutDescription').value
    if (workoutName && workoutDescription){
        addWorkoutToJSON(workoutName, workoutDescription)
    }
    else{
        alert('Enter both a name, age, and a bio')
    }

}

function addWorkoutToJSON(name, description){
    let newWorkout = {Name: name, Description: description}
    var reqURL = "/"
    var newBody = JSON.stringify(newWorkout)
        fetch(reqURL,
             {method: 'POST', 
             headers: {'Content-type': 'application/json'}, 
             body: newBody
        }).then(function (res){
            return res.json()
        }).then(function (data){
            var content = document.querySelector('#allWorkouts')
            var last = content[content.length-1]  
            last.insertAdjacentHTML('afterend', "<div class = 'modal-content border bg-light' id = 'allWorkouts'></div>")
        })          
        
}


window.addEventListener('DOMContentLoaded', function (){

    var submitButton = document.getElementById('addWorkout')
    if (submitButton){
        submitButton.addEventListener('click', addNewWorkout)       
    }    

})