document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByName('exercise-type').forEach(function(button) {
        button.oninput = change_location;
    })
})


function change_location() {
    var value = 0;
    document.getElementsByName('exercise-type').forEach(function(button) {
        if (button.checked) {
            value = button.value;
        }
    })  

    const ippt_element = document.querySelector('#ippt-locations');
    const nsfit_element = document.querySelector('#nsfit-locations');
    const score_element = document.querySelector('#score');

    if (value == "ippt") {
        ippt_element.setAttribute("required", "true");
        ippt_element.setAttribute("name", "locations");
        ippt_element.style.display = "block";

        nsfit_element.removeAttribute("required");
        nsfit_element.setAttribute("name", "disabled");
        nsfit_element.style.display = "none";

        score_element.style.display = "block";
    }

    else if (value == "nsfit") {
        nsfit_element.setAttribute("required", "true");
        nsfit_element.style.display = "block";
        nsfit_element.setAttribute("name", "locations");

        ippt_element.removeAttribute("required");
        ippt_element.setAttribute("name", "disabled");
        ippt_element.style.display = "none";

        score_element.style.display = "none";
    }
}
