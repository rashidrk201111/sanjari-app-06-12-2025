#!/bin/sh
set -e

# Create logs directory if it doesn't exist
mkdir -p logs/nginx

# Set proper permissions
chown -R 1001:1001 /var/log/nginx /var/cache/nginx/
chmod -R 755 /var/log/nginx /var/cache/nginx/

# Start Nginx
echo "Starting Nginx..."
exec nginx -g 'daemon off;'
