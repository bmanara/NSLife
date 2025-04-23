var age_group = 1;

const age_grouping = {21: 1, 24: 2, 27: 3, 30: 4, 33: 5, 36: 6, 39: 7, 42: 8, 45: 9, 48: 10, 51: 11, 54: 12, 57: 13, 60: 14}

// To get score return push_up_score[1][reps] OR push_up_score[9-14][reps]
const push_up_score = {
    1: {14: 0, 15: 1, 16: 2, 17: 4, 18: 6, 19: 8, 20: 9, 21: 10, 22: 11, 23: 12, 24: 13, 25: 14, 26: 15, 28: 16, 31: 17, 34: 18, 37: 19, 40: 20, 44: 21, 48: 22, 52: 23, 56: 24, 60: 25},
    9: {6: 0, 7: 1, 8: 2, 9: 4, 10: 6, 11: 8, 12: 9, 13: 10, 14: 11, 15: 12, 16: 13, 17: 14, 18: 15, 20: 16, 23: 17, 26: 18, 29: 19, 32: 20, 35: 21, 39: 22, 43: 23, 47: 24, 51: 25},
    10: {5: 0, 6: 1, 7: 2, 8: 4, 9: 6, 10: 8, 11: 9, 12: 10, 13: 11, 14: 12, 15: 13, 16: 14, 17: 15, 19: 16, 22: 17, 25: 18, 28: 19, 31: 20, 34: 21, 37: 22, 41: 23, 45: 24, 49: 25},
    11: {4: 0, 5: 1, 6: 2, 7: 4, 8: 6, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14, 16: 15, 18: 16, 21: 17, 24: 18, 27: 19, 30: 20, 33: 21, 36: 22, 39: 23, 43: 24, 47: 25},
    12: {3: 0, 4: 1, 5: 2, 6: 4, 7: 6, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 17: 16, 20: 17, 23: 18, 26: 19, 29: 20, 32: 21, 35: 22, 38: 23, 41: 24, 45: 25},
    13: {2: 0, 3: 1, 4: 2, 5: 4, 6: 6, 7: 8, 8: 9, 9: 10, 10: 11, 11: 12, 12: 13, 13: 14, 14: 15, 16: 16, 19: 17, 22: 18, 25: 19, 28: 20, 30: 21, 33: 22, 36: 23, 39: 24, 42: 25},
    14: {1: 0, 2: 1, 3: 2, 4: 4, 5: 6, 6: 8, 7: 9, 8: 10, 9: 11, 10: 12, 11: 13, 12: 14, 13: 15, 15: 16, 18: 17, 21: 18, 24: 19, 27: 20, 29: 21, 31: 22, 34: 23, 37: 24, 40: 25},
}

// To get score return sit_up_score[1][reps] OR sit_up_score[9-14][reps]
const sit_up_score = {
    1: {14: 0, 15: 1, 16: 2, 17: 3, 18: 4, 19: 5, 20: 6, 22: 7, 24: 8, 25: 9, 26: 10, 27: 11, 28: 12, 29: 13, 31: 14, 33: 15, 34: 16, 35: 17, 36: 18, 38: 19, 40: 20, 44: 21, 48: 22, 52: 23, 56: 24, 60: 25},
    9: {6: 0, 7: 1, 8: 2, 9: 3, 10: 4, 11: 5, 12: 6, 14: 7, 16: 8, 17: 9, 18: 10, 19: 11, 20: 12, 21: 13, 23: 14, 25: 15, 26: 16, 27: 17, 28: 18, 30: 19, 32: 20, 35: 21, 39: 22, 43: 23, 47: 24, 51: 25},
    10: {5: 0, 6: 1, 7: 2, 8: 3, 9: 4, 10: 5, 11: 6, 13: 7, 15: 8, 16: 9, 17: 10, 18: 11, 19: 12, 20: 13, 22: 14, 24: 15, 25: 16, 26: 17, 27: 18, 29: 19, 31: 20, 34: 21, 37: 22, 41: 23, 45: 24, 49: 25},
    11: {4: 0, 5: 1, 6: 2, 7: 3, 8: 4, 9: 5, 10: 6, 12: 7, 14: 8, 15: 9, 16: 10, 17: 11, 18: 12, 19: 13, 21: 14, 23: 15, 24: 16, 25: 17, 26: 18, 28: 19, 30: 20, 33: 21, 36: 22, 40: 23, 44: 24, 48: 25},
    12: {3: 0, 4: 1, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6, 11: 7, 13: 8, 14: 9, 15: 10, 16: 11, 17: 12, 18: 13, 20: 14, 22: 15, 23: 16, 24: 17, 25: 18, 27: 19, 29: 20, 32: 21, 35: 22, 38: 23, 42: 24, 46: 25},
    13: {2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 10: 7, 12: 8, 13: 9, 14: 10, 15: 11, 16: 12, 17: 13, 19: 14, 21: 15, 22: 16, 23: 17, 24: 18, 26: 19, 28: 20, 31: 21, 34: 22, 37: 23, 40: 24, 44: 25},
    14: {1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 9: 7, 11: 8, 12: 9, 13: 10, 14: 11, 15: 12, 16: 13, 18: 14, 20: 15, 21: 16, 22: 17, 23: 18, 25: 19, 27: 20, 30: 21, 33: 22, 36: 23, 39: 24, 42: 25}
}

// 
const run_score = {
    1: {510: 50, 520: 49, 530: 48, 540: 47, 550: 46, 560: 45, 570: 44, 580: 43, 590: 42, 600: 41, 610: 40, 620: 39, 630: 38, 650: 37, 670: 36, 690: 35, 710: 34, 720: 33, 730: 32, 740: 31, 750: 30, 760: 29, 770: 28, 780: 27, 790: 26, 800: 25, 810: 24, 820: 23, 830: 22, 840: 21, 850: 20, 860: 19, 870: 18, 880: 16, 890: 14, 900: 12, 910: 10, 920: 8, 930: 6, 940: 4, 950: 2, 960: 1, 970: 0},
    4: {550: 50, 560: 49, 570: 48, 580: 47, 590: 46, 600: 45, 610: 44, 620: 43, 630: 42, 640: 41, 650: 40, 660: 39, 670: 38, 690: 37, 710: 36, 730: 35, 750: 34, 760: 33, 770: 32, 780: 31, 790: 30, 800: 29, 810: 28, 820: 27, 830: 26, 840: 25, 850: 24, 860: 23, 870: 22, 880: 21, 890: 20, 900: 19, 910: 18, 920: 16, 930: 14, 940: 12, 950: 10, 960: 8, 970: 6, 980: 4, 990: 2, 1000: 1, 1100: 0}
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#push-up-counter').innerHTML = document.querySelector("#push-up-input").innerHTML;
    document.querySelector('#sit-up-counter').innerHTML = document.querySelector('#sit-up-input').innerHTML;
    document.querySelector('#run-counter').innerHTML = document.querySelector('#run-input').innerHTML;

    document.querySelector('#age-input').onchange = age_grouper;
    document.querySelector('#push-up-input').addEventListener("input", () => change("push-up"));
    document.querySelector('#sit-up-input').addEventListener("input", () => change("sit-up"));
    document.querySelector('#run-input').addEventListener("input", () => change("run"));

    // Set default values and update DOM  
    change("push-up");
    change("sit-up");
    change("run");
});


function change(station) {
    const input = document.querySelector(`#${station}-input`);
    const value = parseInt(input.value);
    console.log(value)
    var points = 0;
    document.querySelector(`#${station}-counter`).innerHTML = `${value}`;

    // Calculate points for push up
    if (station == 'push-up') {
        if (age_group < 9){
            const group_difference = age_group - 1;
            for (var key in push_up_score[1]) {
                if (value + group_difference >= key) {
                    points = push_up_score[1][key];
                }
                else {
                    break;
                }
            }
        }
        
        else {
            for (var key in push_up_score[age_group]) {
                if (value >= key) {
                    points = push_up_score[age_group][key];
                }
                else {
                    break;
                }
            }
        }  
    }

    // Calculate points for sit up
    else if (station == 'sit-up') {
        if (age_group < 9){
            const group_difference = age_group - 1;
            for (var key in sit_up_score[1]) {
                if (value + group_difference >= key) {
                    points = sit_up_score[1][key];
                }
                else {
                    break;
                }
            }
        }
        
        else {
            for (var key in sit_up_score[age_group]) {
                if (value >= key) {
                    points = sit_up_score[age_group][key];
                }
                else {
                    break;
                }
            }
        }  
    }

    // Calculate points for run
    else if (station == 'run') {
        points = 50;
        if (age_group < 4) {
            const group_difference = age_group - 1;
            for (var key in run_score[1]) {
                if (value - (group_difference * 10) >= key) {
                    points = run_score[1][key];
                }
                else {
                    break;
                }
            }         
        }

        else {
            const group_difference = age_group - 4
            for (var key in run_score[4]) {
                if (value - (group_difference * 10) >= key) {
                    points = run_score[4][key];
                }
                else {
                    break;
                }
            }
        }
    }


    document.querySelector(`#${station}-points`).innerHTML = `${points}`
    calculate();
};


function calculate() {
    const push_up = parseInt(document.querySelector('#push-up-points').innerHTML);
    const sit_up = parseInt(document.querySelector('#sit-up-points').innerHTML);
    const run = parseInt(document.querySelector('#run-points').innerHTML);

    const total = push_up + sit_up + run;

    document.querySelector('#total-points').innerHTML = `${total}`;

    // Show user whether its a fail, pass, pass with incentive, silver or gold
    result = document.querySelector('#result')
    difference = document.querySelector('#difference')

    if (total > 84) {
        result.innerHTML = "GOLD";   
        result.style.color = "gold";
        difference.innerHTML = "";
    }
    else if (total > 74) {
        result.innerHTML = "SILVER";
        result.style.color = "silver";
        difference.innerHTML = `+ ${85 - total} points to GOLD`;
    }
    else if (total > 60) {
        result.innerHTML = "PASS (INCENTIVE)";
        result.style.color = "cadetblue";
        difference.innerHTML = `+ ${74 - total} points to SILVER`;
    }
    else if (total > 50) {
        result.innerHTML = "PASS";
        result.style.color = "cadetblue";
        difference.innerHTML = `+ ${61 - total} points to PASS (INCENTIVE)`;
    }
    else {
        result.innerHTML = "FAIL";
        result.style.color = "red";
        difference.innerHTML = `+ ${51 - total} points to PASS`;
    };
}


function age_grouper(event) {
    const input = event.target;
    var age = parseInt(input.value);

    for (var key in age_grouping) {
        if (age > key) {
            
        }
        else {
            age_group = age_grouping[key];
            break;
        }
    }
    document.querySelector("#age-group").innerHTML = `${age_group}`;
    change("push-up");
    change("sit-up");
    change("run");
    return false;
};