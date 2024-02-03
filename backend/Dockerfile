# Specify the base image
FROM python:3.10.13

# Set the working directory inside the container
WORKDIR /app

# Copy the source code into the container
COPY . .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose the port on which the application will run
EXPOSE 5000

# Define the command to run the application
CMD python main.py

