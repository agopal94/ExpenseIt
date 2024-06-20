FROM node:alpine

WORKDIR /gui

COPY GUI /gui

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build


FROM python:3.12

WORKDIR /code

COPY ./Server/app /code/app

COPY --from=0 /gui/dist/expense-it/* /code/gui

COPY ./Server/requirements.txt /code/requirements.txt
 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

CMD ["python", "app/main.py"]