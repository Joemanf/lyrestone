![Lyrestone](https://i.imgur.com/KwAHlFF.png)

# Welcome to Lyrestone

Lyrestone is a application where users can create their own choose your own adventure stories for others to play.

**Technologies: React, Redux, Express, Sequelize, CSS3**

The goal of this two week full-stack project was to have 2 fully functional core MVP features finished, which include:
- Creating stories - users have the ability to create their own text based adventures.
- Playing stories - users have the ability to play stories made by other users.

## Login/Signup/Splash
When users who are not logged in try to navigate to the site, they get redirected to the splash page. From there, they can choose to log in, sign up, or log in as a demo user. This leads to easy accessibility for anyone who wants to try out the site without fully committing to making an account.<br />
![Splash](https://i.imgur.com/ylnFRwp.gif)

## Main/Story Pages (MVP #1)
When a user is logged in, it takes them to the main story page, where a selection of characters and the text "Please Select a Character" is displayed. After selecting a character, a list of every story written by users is displayed. Clicking on one of those stories will lead the user to a story which they can play through with the character they selected.<br />
![stories](https://user-images.githubusercontent.com/58833052/121404689-2dd9f400-c92a-11eb-98a5-ee14e0114293.png) <br />
![story](https://user-images.githubusercontent.com/58833052/121404671-29add680-c92a-11eb-8df7-f15837425544.png)

## Story Creation (MVP #2)
Users can create their own stories as well by selecting the "Make a story" button at the top-right of the main page. When selected, it will take the user to a newly created story that has basic information already implemented. The user starts with a "Root" of the story, which has limited editing capabilites and cannot be deleted. The title and the body of the root, however, can be. The title is what will show up as the bold text in a story, while the body will be the text that is displayed below that. The title is also what the text of the "next choice" will be. The user can click the "Add a Scene" button at the top-right of the screen, which will add a scene as a child to the current scene (maximum of 4 scenes). If the scene is not the root, the player can edit the section to change HP, as well as the requirements to enter that scene (noted by the 6 stats). To switch between scenes, a player should click on them. If a scene has no children, it is considered the end of the story, and the text "Game Over" will be displayed. When a user is satisfied with their story, they should change the story name and dexription and hit "Save Story" (all at the bottom right). The user who is the owner of said story can edit the story any time they wish by clicking the "edit" button on the main page next to their story. <br />
![edit story](https://user-images.githubusercontent.com/58833052/121407261-1e0fdf00-c92d-11eb-9b07-f9d70613427d.png)

## Run Locally
To run this app locally, follow these steps:
- Open your terminal and clone down this repo
- Install node v24.1.0
- Install postgresql v17
- Navigate to both frontend and backend and run npm i
- Open up psql (by typing psql into the command line)
  - If you do not have a superuser, create one
  - Run the command CREATE DATABASE lyrestone;
  - Exit psql by typing \q
- Create an .env file using the .env.example (you can just duplicate this file and remove the .example from the file name)
- In the backend folder, run these commands:
  - npx dotenv sequelize db:migrate
  - npx dotenv sequelize db\:seed:all (no \ in the command)
- Run npm start
- Open a new terminal window and navigate to the frontend folder
- Run npm start
- Enjoy!
