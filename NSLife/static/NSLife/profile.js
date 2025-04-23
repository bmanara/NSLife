document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#edit-profile-btn').onclick = function() {
        document.querySelector('#profile-form').style.display = 'block';
    }
    document.querySelector('#cancel-edit-profile').onclick = function() {
        document.querySelector('#profile-form').style.display = 'none';
    }
})