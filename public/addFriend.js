
function addNewFriend(){
    var textName = document.getElementById('friendName').value
    var textAge = document.getElementById('friendAge').value
    var textBio = document.getElementById('friendBio').value

    if (textName && textAge && textBio){
        addFriendtoJSON(textName, textAge, textBio)
    }
    else{
        alert('Enter both a name, age, and a bio')
    }
}

function addFriendtoJSON(name, age, bio){
    let newFriend = {Name: name, Age: age, Bio: bio}
    var reqURL = "login"
    var newBody = JSON.stringify(newFriend)
        fetch(reqURL,
             {method: 'POST', 
             headers: {'Content-type': 'application/json'}, 
             body: newBody
        }).then(function (res){
            return res.json()
        }).then(function (data){
            window.location = '/'
            let newLength = data.length

            for (i = 0; i < newLength; i++){
                document.getElementById('friendName').innerHTML += "<br />" + data[i].Name + data[i].Age
                document.getElementById('friendBio').innerHTML += "<br />" + data[i].Bio
            } 
        }) 
         
            
}



window.addEventListener('DOMContentLoaded', function (){

    var submitButton = document.getElementById('addFriend')
    if (submitButton){
        submitButton.addEventListener('click', addNewFriend)       
    }    

})



