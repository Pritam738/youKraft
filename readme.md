# Getting Started 

This project is a simple express app, used to send messages from users using a MQ,
the data is stored in a mysqlDB

## Getting Started

Docker and docker-compose should be installed and running on your machine. 
Node.js should be installed and running locally.

## Setup enviroment 

docker-compose up // this will start the rabbitMq and mysql
 
check if the queue conslose is available on http://localhost:15673/

### Installing

Clone the Repository and run

```js
npm install/ npm i
npm run start // to run the server 
node consumer // to run the MQ consumer
```


### Api info

#### method: post 

create new users: http://localhost:3000/users/create 
req body:  {"email": "user2@domail.com", "name": "hanlk"}

create and send new message to users: http://localhost:3000/messages/send
req body: {"message": "Hi, we are testing the feature", "created_by": 1, "created_for": [3,2] }

#### method: get

get all users: http://localhost:3000/users/
get users by id: http://localhost:3000/users/<id>
get all messages send by a user: http://localhost:3000/messages/send/<id>
get all messages recived by a user: http://localhost:3000/messages/recived/<id>

ps: pass the user's id in place of <id>; in the above apis

### Sql database

The data is stored in 3 tables.

Users 
+----+-------+------------------+---------------------+---------------------+
| id | name  | email            | createdAt           | updatedAt           |
+----+-------+------------------+---------------------+---------------------+
|  1 | ted   | user@domail.com  | 2022-09-24 13:24:22 | 2022-09-24 13:24:22 |
|  2 | betty | user1@domail.com | 2022-09-24 13:25:33 | 2022-09-24 13:25:33 |
|  3 | hanlk | user2@domail.com | 2022-09-24 14:49:42 | 2022-09-24 14:49:42 |
+----+-------+------------------+---------------------+---------------------+
messages
+----+--------------------------------+------------+---------------------+---------------------+
| id | message                        | created_by | createdAt           | updatedAt           |
+----+--------------------------------+------------+---------------------+---------------------+
|  1 | Hi, we are testing the feature | 1          | 2022-09-24 14:43:33 | 2022-09-24 14:43:33 |
|  2 | Hi, we are testing the feature | 1          | 2022-09-24 14:49:56 | 2022-09-24 14:49:56 |
+----+--------------------------------+------------+---------------------+---------------------+
recivers
+----+------------+------------+---------------------+---------------------+
| id | message_id | reciver_id | createdAt           | updatedAt           |
+----+------------+------------+---------------------+---------------------+
|  1 | 1          | 1          | 2022-09-24 14:43:33 | 2022-09-24 14:43:33 |
|  2 | 1          | 2          | 2022-09-24 14:43:33 | 2022-09-24 14:43:33 |
|  3 | 2          | 3          | 2022-09-24 14:49:56 | 2022-09-24 14:49:56 |
|  4 | 2          | 2          | 2022-09-24 14:49:56 | 2022-09-24 14:49:56 |
+----+------------+------------+---------------------+---------------------+