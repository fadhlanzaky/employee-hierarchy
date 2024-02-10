FROM python:3.9-slim-buster
WORKDIR /flask-backend
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5001
CMD ["gunicorn", "-b", ":5001", "run:app"]
