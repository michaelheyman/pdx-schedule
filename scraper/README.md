# pdx-schedule-scraper

## Installation

Install `pyenv` and `pyenv-virtualenv`:

`brew install pyenv pyenv-virtualenv`

Set the global python version to 3.7.3:

`pyenv global 3.7.3`

Create `pyenv environment`:

`pyenv virtualenv -p python3.7 pdx-schedule-scraper-3.7.3`

Install required python packages:

`pip install -r requirements.txt`

## Create the database

Run the scraper and populate the database:

`python src/schedule.py`
