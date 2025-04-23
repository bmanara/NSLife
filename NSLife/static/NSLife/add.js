document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#add-reservist").onclick = () => {
        document.querySelector('#reservist-form').style.display = 'block';
    }
    document.querySelector("#cancel-add").onclick = () => {
        document.querySelector('#reservist-form').style.display = 'none';
    }
    document.querySelectorAll('.delete-manning').forEach(function(button) {
        button.onclick = confirm_delete;
    })
    document.querySelector('#delete_').onclick = delete_;
})

var manning_id = 0;

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function confirm_delete(event) {
    const button = event.target;
    manning_id = button.dataset.id;
    document.querySelector('#manning-id').innerHTML = `${manning_id}`;
}


function delete_() {
    const csrftoken = getCookie("csrftoken")

    fetch(`delete/manning/${manning_id}`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken
        }
    });
    
    document.querySelector(`#manning-${manning_id}`).style.display = 'none';

    return false;
}