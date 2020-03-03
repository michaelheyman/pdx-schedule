# pdx-schedule

The goal of this project is to pull schedule data from Portland State University, and display it in a unified page where it displays the current term's schedule, along with RateMyProfessor ratings.

## Server

Serves up the HTML and database.

### Installing and Running

#### NPM

Make sure `npm` packages are installed by running `npm install`.

Run `npm start`.

#### Docker

Build local docker image:

```
docker build -t pdx-schedule .
```

Run docker image:

```
docker run -p 49160:8080 -d pdx-schedule
```

If running locallly, go to http://localhost:49160.

## Client

Executes a GET request to receive data from Node and renders the UI accordingly.

See `client/README.md` for instructions on how to use and build.
