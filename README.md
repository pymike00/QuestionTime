# QuestionTime
**A Quora-like Single Page Application built with Django, Django REST Framework and Vue JS**

## How to set up the project to run on your local machine?

#### Download the code to your PC, unpack the zip and move inside the folder.

#### Create a new Python Virtual Environment:
```
python3 -m venv venv
```

#### Activate the environment and install all the Python/Django dependencies:

```
source ./venv/bin/activate
pip install -m ./requirements.txt
```

#### Apply the migrations as usual.

#### Time to install the Vue JS dependencies:
```
cd QuestionTime/vite-frontend
npm install
```

#### Run Vue JS Development Server:
```
npm run serve
```

#### Run Django's development server:
```
python manage.py runserver
```

#### Open up Chrome and go to 127.0.0.1:8000 and the app is now running in development mode!
