# Aether

![image](https://github.com/noahpro99/violet-2024/assets/22966838/e4e93777-89d3-447e-a1ea-0cdf3ad96765)

## Inspiration
Our inspiration was the health of pregnant women. We aimed to establish a means for them to monitor their health conveniently, providing an avenue to check in on their well-being at their own convenience and complementing their regular visits to healthcare professionals.

## What it does
The application uses an AI model designed to identify early signs of risk during the maternity phase by continuously monitoring the health data of women. It securely stores this data for a long-term analysis of the body's changes, presenting users with an intuitive and user-friendly dashboard to interact with and visualize their information. Additionally, the app sends timely and informative notifications to users, serving as a proactive reminder to help them stay vigilant about their health throughout the maternity journey.

## How we built it
Our project consists of multiple parts:
We utilized a Random Forest classifier-based machine learning model trained on open-source health data to predict and calculate the risk factors during the pregnancy phase and then backtrack the important decision impacting parameters using model additive explanation algorithms.
MongoDB was employed for authentication and secure data management.
The backend utilizes FastAPI to manage various routing and API handling.
The frontend is a progressive mobile-based application developed on React and Tailwind CSS. It incorporates OpenAPI for efficient API handling.
Google Cloud is employed for deployment and hosting.

## Challenges we ran into
The two major challenges that we ran into were:
1)  Coordinating the development and alignment of different layers within the application proved to be a complex task. Ensuring seamless collaboration between various teams and components was crucial for the success of the project.
2) Managing the flow of data from the backend to the frontend presented another formidable hurdle.

## Accomplishments that we're proud of
Accomplishments we're proud of include deploying our application and ensuring its compatibility with any mobile device, thereby making it accessible to all users. Our Progressive Web App (PWA) is hosted on a server and can be downloaded onto any mobile device. Additionally, we successfully created login and signup pages, further establishing our project as fully functional.

## What we learned
We've learned that simple parameters such as heart rate, blood pressure, sugar levels, and temperature can offer insightful information about a patient's condition, thereby enabling adjustments in routine to promote a healthy lifestyle. Additionally, this was our first experience in creating and deploying a Progressive Web App (PWA), which has significantly enhanced our skills in web development.

## What's next for Aether
The next steps would be to make inputting the data seamless. Connecting external devices to sync the data would help with data management, and implementing automated protocols on devices we use every day, like smartwatches, would make the user experience as easy as possible. Also, we want to improve our recommendation system to provide more detailed recommendations.

## Try it out
[try it out here](https://violet-2024.web.app/)

Login : demo

Password : demo
