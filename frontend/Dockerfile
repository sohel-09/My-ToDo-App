
# FROM nginx:alpine
# COPY . /usr/share/nginx/html
# EXPOSE 80
# Base image
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy frontend app files
COPY . /usr/share/nginx/html/

# Optional: copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
