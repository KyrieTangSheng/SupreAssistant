
# Use the official Node.js LTS image
FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"] 




# # Using Docker with Your Node.js Application
# 
# You can use Docker to containerize your Node.js application based on the provided `Dockerfile`. This allows you to create a consistent and isolated environment for your application to run, ensuring it behaves the same way across different systems.
# 
# ## Prerequisites
# 
# - **Docker Installed**: Make sure you have Docker installed on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started).
# 
# - **Dockerfile**: Ensure your `Dockerfile` is present in the root directory of your project.
# 
# ## Steps to Use Docker
# 
# ### 1. Navigate to Your Project Directory
# 
# Open your terminal or command prompt and navigate to the directory containing your `Dockerfile`:
# 
# ```bash
# cd path/to/your/project
# ```
# 
# ### 2. Build the Docker Image
# 
# Use the `docker build` command to create a Docker image from your `Dockerfile`. Replace `your-image-name` with a name of your choice.
# 
# ```bash
# docker build -t your-image-name .
# ```
# 
# **Example:**
# 
# ```bash
# docker build -t my-node-app .
# ```
# 
# **Explanation:**
# 
# - `docker build`: Command to build a Docker image.
# - `-t your-image-name`: Tags the image with the specified name.
# - `.`: Specifies the current directory as the build context.
# 
# ### 3. Run the Docker Container
# 
# Once the image is built, you can run it using the `docker run` command. Replace `your-image-name` with the name you used during the build.
# 
# ```bash
# docker run -p 3000:3000 your-image-name
# ```
# 
# **Example:**
# 
# ```bash
# docker run -p 3000:3000 my-node-app
# ```
# 
# **Explanation:**
# 
# - `docker run`: Command to run a container from an image.
# - `-p 3000:3000`: Maps port 3000 of your local machine to port 3000 of the container. This should match the port your application is listening on (as specified by `EXPOSE 3000` in the `Dockerfile`).
# - `your-image-name`: The name of the image you want to run.
# 
# ### 4. Verify the Application is Running
# 
# Open your web browser and navigate to `http://localhost:3000`. You should see your Node.js application running.
# 
# ## Additional Commands
# 
# ### View Running Containers
# 
# To see all running containers:
# 
# ```bash
# docker ps
# ```
# 
# ### Stop a Running Container
# 
# First, find the container ID or name using `docker ps`, then stop it using:
# 
# ```bash
# docker stop <container_id_or_name>
# ```
# 
# **Example:**
# 
# ```bash
# docker stop my-node-app-container
# ```
# 
# ### Remove an Image
# 
# To remove a Docker image:
# 
# ```bash
# docker rmi your-image-name
# ```
# 
# **Example:**
# 
# ```bash
# docker rmi my-node-app
# ```
# 
# ## Tips
# 
# - **Development Mode**: For development purposes, you might want to mount your code into the container to see changes without rebuilding the image each time. You can use the `-v` flag with `docker run` for volume mounting.
# 
#     ```bash
#     docker run -p 3000:3000 -v $(pwd):/usr/src/app your-image-name
#     ```
# 
# - **Environment Variables**: If your application requires environment variables, you can pass them using the `-e` flag.
# 
#     ```bash
#     docker run -p 3000:3000 -e NODE_ENV=production your-image-name
#     ```
# 
# - **Docker Compose**: For more complex setups involving multiple containers (like databases), consider using [Docker Compose](https://docs.docker.com/compose/).
# 
# ## Summary
# 
# 1. **Build the Image**: `docker build -t your-image-name .`
# 2. **Run the Container**: `docker run -p 3000:3000 your-image-name`
# 3. **Access the Application**: Navigate to `http://localhost:3000` in your browser.
# 
# By following these steps, you can effectively use Docker to manage and deploy your Node.js application.
# 
# # Additional Resources
# 
# - [Docker Documentation](https://docs.docker.com/)
# - [Dockerizing a Node.js Application](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
# 
# # Example Dockerfile Reference
# 
# Here's your provided `Dockerfile` for reference:
# 
# ```Dockerfile
# # Use the official Node.js LTS image
# FROM node:18
# 
# # Create and set the working directory
# WORKDIR /usr/src/app
# 
# # Copy package.json and package-lock.json
# COPY package*.json ./
# 
# # Install dependencies
# RUN npm install
# 
# # Copy the rest of the application code
# COPY . .
# 
# # Build the TypeScript code
# RUN npm run build
# 
# # Expose the application port
# EXPOSE 3000
# 
# # Define the command to run the application
# CMD ["npm", "start"]
# ```
# 
# This `Dockerfile` performs the following actions:
# 
# 1. **Base Image**: Uses Node.js version 18 as the base image.
# 2. **Working Directory**: Sets `/usr/src/app` as the working directory in the container.
# 3. **Copy Dependencies**: Copies `package.json` and `package-lock.json` to install dependencies.
# 4. **Install Dependencies**: Runs `npm install` to install the necessary packages.
# 5. **Copy Application Code**: Copies the rest of your application's code into the container.
# 6. **Build Application**: Executes `npm run build` to compile your TypeScript code.
# 7. **Expose Port**: Opens port `3000` to allow external access.
# 8. **Start Application**: Defines the default command to start your application using `npm start`.
# 
# By following the steps outlined above, you can efficiently use Docker to containerize and run your Node.js application.
