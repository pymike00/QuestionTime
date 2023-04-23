# QuestionTime
**A Quora-like Single Page Application built with Django, Django REST Framework and Vue JS**

### How to run the project on your local machine?

#### Clone the repo and move inside it:
```
git clone https://github.com/pymike00/QuestionTime.git
cd QuestionTime
```

#### Create a new Python Virtual Environment:
```
python3 -m venv venv
```

#### Activate the venv and install Django dependencies:
```
source ./venv/bin/activate
pip install -m ./requirements.txt
```

#### Apply Django migrations:
```
python manage.py migrate
```

#### Install Node dependencies:
```
cd QuestionTime/vite-frontend
npm install
```

#### Run Vite's Development Server:
```
npm run dev
```

#### Run Django's development server:
```
python manage.py runserver
```

#### Go to http://127.0.0.1:8000 and the app is now running in development mode with Hot Module Replacement!


### What about the Vue CLI implementation?
An older version of this application used Vue CLI, which has since been replaced by Vite. You can still access the Vue CLI implementation [from this branch](https://github.com/pymike00/QuestionTime/tree/legacy-v3). 