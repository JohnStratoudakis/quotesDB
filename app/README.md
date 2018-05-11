# Goals
Whenever a commit is merged to master, a new docker image is built
and sent to docker.

Then whenever the machine is brought up, it will pull the latest
version of the image and start the database, node.js app, and
any possible react app.