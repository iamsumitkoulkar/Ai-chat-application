FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY realtime-test.html /usr/share/nginx/html/realtime-test.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]