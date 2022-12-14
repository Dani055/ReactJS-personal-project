# Some context
This app was made during the ReactJS course at SoftUni. It features a node backend running ExpressJS and a local MongoDB database. Front-end is done using React and is similar to the one using Angular. App most likely does not run any more due to deprecated dependencies.

## How to run locally (untested)
- You would need a locally hosted MongoDB instance on port 27017.
- Node installed
- run npm install in both client and server folders
- server is started with: node index
- react app is started with npm start

# The Idea
An application that stores cars that can be rented by other users.

## Design
* Main area
	* Guests are allowed to look at all the cars that can be rented
* User area
	* Users can rent and unrent cars, also look at their rented cars
* Admin area
	* Admins can add cars, edit them and delete them
* Additional
	* Each user has a profile page  
