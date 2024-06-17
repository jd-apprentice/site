FROM nginx:alpine3.18
COPY ./index.html /usr/share/nginx/html
COPY ./resume.pdf /usr/share/nginx/html
COPY ./index.js /usr/share/nginx/html
EXPOSE 80