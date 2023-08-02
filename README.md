# WeatherApp Project

Welcome to the WeatherApp project, a beautiful and intuitive application that brings your local weather forecast right at your fingertips. Stay informed about the upcoming weather conditions, and plan your day effortlessly.

## Table of Contents
- [WeatherApp Project](#weatherapp-project)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Without Docker](#without-docker)
    - [With Docker](#with-docker)
  - [Testing](#testing)
    - [Unit Testing](#unit-testing)
    - [Integration Testing](#integration-testing)
  - [Deployment](#deployment)

## Prerequisites

Before diving into the WeatherApp project, ensure you have the following components installed and set up on your system:

- [OpenWeatherMap API key](https://openweathermap.org/price)
- [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm)
- [React.js](https://reactjs.org/)
- [Docker](https://www.docker.com/) and [Docker-compose](https://docs.docker.com/compose/install/) (Optional)
- [Python](https://www.python.org/downloads/) and [Robot Framework](https://robotframework.org/) (For integration tests)
- [Ansible](https://www.ansible.com/) (For Deployment)
- [Google Cloud Platform (GCP) account](https://cloud.google.com/) (For Deployment)

## Getting Started

After satisfying the prerequisites, follow these steps to run the WeatherApp project on your system:

Firstly, clone the repository and navigate into the project directory. Copy the contents of the `.env_sample` file to a new file named `.env`:

```bash
cp .env_sample .env
```

In your newly created `.env` file, replace the `APPID` value with your own OpenWeatherMap API key.

### Without Docker

To start the backend, navigate to the backend directory, install the necessary packages and run the application:

```bash
cd backend
echo APPID={{ YOUR OPENWEATHER API KEY }} > .env
echo PORT=9000 >> .env
npm ci
npm run start
```

To start the frontend, navigate to the frontend directory, install the necessary packages and run the application:

```bash
cd frontend
npm ci
npm run start
```

Your application should now be running locally, you can access it in http://localhost:8080 (NOTE: you need to allow location services for your browser).

### With Docker

If you prefer to use Docker, you can start both the frontend and the backend concurrently using Docker Compose, also make sure that the NODE_ENV variable in .env does not refer to 'test':

```bash
sed -i '' 's/NODE_ENV=.*/NODE_ENV="dev"/g' .env
docker-compose down
docker-compose up -d
```

## Testing

### Unit Testing

To run the unit tests for either the frontend or the backend, navigate to the respective directory and run the test command:

```bash
cd backend (or frontend)
npm run test
```

### Integration Testing

Before running the integration tests, ensure you have the Robot Framework and Selenium installed. Make sure to allow location services for your browser (in this case, chrome). Additionally, we need to set NODE_ENV variable in .env to 'test':

```bash
sed -i '' 's/NODE_ENV=.*/NODE_ENV="test"/g' .env
pip install robot-framework
pip install selenium==4.9.0
pip install robotframework-seleniumlibrary
```

Afterwards, rerun the docker and run the integration tests:

```bash
docker-compose down
docker-compose up -d
cd robot-tests
robot tests
```

## Deployment

Before deploying the application, authenticate your Google Cloud Platform account:

```bash
gcloud auth login
gcloud config set project [gcp-project-name]
gcloud --quiet auth configure-docker
```

Then, use Ansible to deploy the application:

```bash
ansible-playbook ansible-deployment/deploy.yml
```

This completes the deployment of the WeatherApp project on your GCP account.

Stay updated with the weather!
