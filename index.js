const exerciseList = document.getElementById('exercise-list');
const exerciseDetails = document.getElementById('exercise-details');

function getExercises() {
    fetch('https://exercisedb.p.rapidapi.com/exercises', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1b0024e22fmshec1498e06432befp1e088ajsne0c0128a6abb',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayExercises(data);
    })
    .catch(error => {
        console.error('Error fetching exercises:', error);
    });
}

    function displayExercises(exercises) {
    
        exercises.forEach(exercise => {
            const listItem = document.createElement('li');
            listItem.textContent = exercise.name;
            listItem.addEventListener('click', () => {
                displayExerciseDetails(exercise, exerciseDetails);
            });
            exerciseList.appendChild(listItem);
        });
    }
    function displayExerciseDetails(exercise, exerciseDetails) {
        exerciseDetails.innerHTML = '';
    
        const exerciseName = document.createElement('h3');
        exerciseName.textContent = exercise.name;
        exerciseDetails.appendChild(exerciseName);
    
        const exerciseGif = document.createElement('img');
        exerciseGif.src = exercise.gifUrl; 
        exerciseGif.alt = 'Exercise GIF';
        exerciseDetails.appendChild(exerciseGif);
    
        const exerciseInfo = document.createElement('p');
        exerciseInfo.textContent = exercise.additionalInfo; 
        exerciseDetails.appendChild(exerciseInfo);
    }
    getExercises();




