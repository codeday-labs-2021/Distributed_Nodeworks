# syntax=docker/dockerfile:1

FROM python:3.9-alpine3.14

RUN mkdir -p /app

WORKDIR /app

RUN apk add --update musl-dev gcc libffi-dev

RUN python -m pip install --upgrade pip

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD [ "python", "-m" , "flask", "run"]