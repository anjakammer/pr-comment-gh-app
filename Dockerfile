# https://github.com/GoogleCloudPlatform/nodejs-docker
FROM launcher.gcr.io/google/nodejs

# Copy application code.
COPY . /app/

# Install dependencies.
RUN npm --unsafe-perm install
