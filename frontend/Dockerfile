FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY realtime-test.html /usr/share/nginx/html/realtime-test.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]