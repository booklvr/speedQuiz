# speedQuiz

 Description

Speed Quiz is a charades type game meant to be used in the classroom.  It is a fun, effective way for students to practice new vocabulary.  The main page is the settings page where teachers can choose the number of teams, and the time limit for each round.  The teacher can make a word list by choosing words from the provided categories or add their own words using a simple form.  If the teacher logs in these word lists can be saved and used again later.  Clicking the play buttons brings you to the game screen.  The game screen opens with modal that shows what team is next with a start button.  When the start button is clicked a three second timer counts down and then students are shown a word on the screen.  Students in a team are split into two groups, have the students can see the word and the other half cannot.  The students who can see the word must help the students who cannot guess the word using actions or descriptive students.  If a word is too challenging they can say skip, and the teacher goes onto the next word without giving a point.  When the round time is up an end of round modal pops up showing the previous teams total points, as well as the words they got correct and what words they skipped.  The points are editable in case any mistakes were made by the teacher.  



How it is built.

The Frontend

The project uses react on the frontend and react-bootstrap and sass for styling.  State is managed with react-redux.  The project also loads the state from local storage in order to persist state.  


The Backend

The project needed a backend so that teachers could save word lists for later use.  The backend is written in NodeJs using express.  It uses mongodb and mongoose for the database.  Json Web Tokens are used for user authentication.  The project also uses parcel as a web application bundler.  If I were to make this app again I don't think i would use parcel again, as it is unneccessary.  

The Server

The project is hosted by DigitalOcean using NGINX.  

How to download the code.

In your terminal type git clone https://github.com/booklvr/speedQuiz.git

1)  run yarn install in the root folder to install the node_modules
2)  cd into the frontend and run install again to donwload the node_modules file for the frontend.  
3)  cd ../ back into the root folder and create a .env file. 
  
  The .env file needs requires the following.
  MONGO_URI=
  MONGO_PASSWORD=
  MONGO_USERNAME=
  JWT_SECRET=yoursecrethere 
  PORT=3002
  NODE_ENV=development
  
 4) Go to https://www.mongodb.com/ and create a new project.  Once the project is created click Connect and Connect your application, and follow the instructions.  You will need to add your MONGO_URI, MONGO_PASSWORD, and MONGO_USERNAME to the .env file.  




