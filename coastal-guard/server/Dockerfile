FROM --platform=$BUILDPLATFORM python:3.10-alpine AS builder

WORKDIR /app/server

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT ["python3"]

ENV FLASK_ENV=development
ENV FLASK_APP=app.py

ENTRYPOINT ["flask"]

CMD ["run"]