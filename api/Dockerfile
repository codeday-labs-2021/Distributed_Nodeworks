# syntax=docker/dockerfile:1

FROM python:3.9-alpine3.14

RUN mkdir -p /app

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE $PORT

CMD [ "python", "-m" , "flask", "run"]