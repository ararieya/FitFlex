function getExercises(limit){
    fetch('https://exercisedb.p.rapidapi.com/exercises',{
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
            console.log(data); 
        })
        .catch(error => {
            console.error('Error fetching exercises:', error);           
        });
    }



