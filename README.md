# Bill Detector
## Introduction

Web application running on localhost allows users to upload images to the web and recognize the text content inside the image

## Tech

Bill Detector uses a number of open source projects to work properly:

- [ReactJS] - HTML enhanced for web apps
- [Django] - Run Server
- [Imgur] - Cloud storage images data

## Installation

Bill Detector requires [Node.js](https://nodejs.org/) v10+ to run.

Active environment _venv_ by virtual env
```sh
source venv/bin/activate
```

Open first terminal, install the frontend dependencies and unbundle UI

```sh
cd bill_detector/frontend
npm i
npm run dev
```

Open second terminal, install the backend requirements and start the server

```sh
cd bill_detector
pip install -r requiremnts.txt
python manage.py runserver
```