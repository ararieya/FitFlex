const exerciseList = document.getElementById("exercise-list");
const exerciseDetails = document.getElementById("exercise-details");
const workoutPlan = [];
const addToWorkoutBtn = document.getElementById("add-to-workout-btn");
const workoutPlanList = document.getElementById("workout-plan");
const clearWorkoutBtn = document.getElementById("clear-workout-btn");

function getExercises() {
  fetch("https://exercisedb.p.rapidapi.com/exercises", {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1b0024e22fmshec1498e06432befp1e088ajsne0c0128a6abb",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayExercises(data);
    })
    .catch((error) => {
      console.error("Error fetching exercises:", error);
    });
}

function displayExercises(exercises) {
  exercises.forEach((exercise) => {
    const listItem = document.createElement("li");
    listItem.textContent = exercise.name;
    listItem.addEventListener("click", () => {
      displayExerciseDetails(exercise, exerciseDetails);
    });
    exerciseList.appendChild(listItem);
  });
}
function displayExerciseDetails(exercise, exerciseDetails, index) {
    exerciseDetails.innerHTML = "";
  
    const exerciseName = document.createElement("h3");
    exerciseName.textContent = exercise.name;
    exerciseDetails.appendChild(exerciseName);
  
    const exerciseGif = document.createElement("img");
    exerciseGif.src = exercise.gifUrl;
    exerciseGif.alt = "Exercise GIF";
    exerciseGif.classList.add("img-fluid");
    exerciseDetails.appendChild(exerciseGif);
  
    const exerciseInfo = document.createElement("p");
    exerciseInfo.textContent = exercise.additionalInfo;
    exerciseDetails.appendChild(exerciseInfo);
  
    const exerciseInstructions = document.createElement("p");
    exerciseInstructions.textContent = exercise.instructions;
    exerciseDetails.appendChild(exerciseInstructions);

    const addToWorkoutBtn = document.createElement("button");
 addToWorkoutBtn.textContent = "Add to Workout Plan";
  addToWorkoutBtn.classList.add("btn", "btn-primary");
  addToWorkoutBtn.addEventListener("click", () => {
    const sets = prompt("Enter the number of sets:");
    const reps = prompt("Enter the number of reps:");
    const day = prompt("Enter the day for the workout:");

    if (sets !== null && reps !== null && day !== null) {
      addExerciseToWorkoutPlan(exercise, index, sets, reps, day);
    }
  });
  exerciseDetails.appendChild(addToWorkoutBtn);
}

function addExerciseToWorkoutPlan(exercise, index, sets, reps, day) {
  const exerciseToAdd = { ...exercise, sets, reps, day };
  workoutPlan.push(exerciseToAdd);
  updateWorkoutPlan();
  exerciseList.children[index].style.display = "none";
  saveWorkoutPlanToLocalStorage(); 
}

function updateWorkoutPlan() {
  workoutPlanList.innerHTML = "";
  workoutPlan.forEach((exercise) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${exercise.name}</strong> - Sets: ${exercise.sets}, Reps: ${exercise.reps}, Day: ${exercise.day}`;
    listItem.classList.add("list-group-item");
    workoutPlanList.appendChild(listItem);
  });
}
  
  clearWorkoutBtn.addEventListener("click", () => {
    workoutPlanList.innerHTML = "";
    workoutPlan.forEach((exercise) => {
      exerciseList.innerHTML += `<li class="list-group-item">${exercise.name}</li>`;
    });
    workoutPlan.length = 0; 
  });

  
getExercises();

