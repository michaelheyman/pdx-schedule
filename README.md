# pdx-schedule

The goal of this project is to pull schedule data from Portland State University, and display it in a unified page where it displays the current term's schedule, along with RateMyProfessor ratings.

## Server

Serves up the HTML and database.

### Installing and Running

Make sure `npm` packages are installed by running `npm install`.
Run `npm start`.

## Client

Executes a GET request to receive data from Node and renders the UI accordingly.

See `client/README.md` for instructions on how to use and build.

## Scraper

Crawls and scrapes the pages to gather schedule and rating data.

See `scraper/README.md` for instructions on how to use and build.
