# codeuino-task

R1: `GET/generate-key` This endpoint will generate a new key. 

R2: `POST/get-key` This endpoint will get an available key for a user, and will block that key for further use for atleast 1 minute.

R3: `PUT/unblock-key` This endpoint will unblock the blocked key and make it available for further use for all users.

R4: `DELETE/delete-key` This endpoint will delete the key specified and that key cannot be used further by anyone. 

R5: `POST/refresh-key` This endpoint will refresh the key for a user within 5 minutes of initial assigned. User can block the key for 1 minute using this endpoint.

**Further API Info with Parameters and Response Examples:** [Postman](https://documenter.getpostman.com/view/10647913/T1DqfGjh?version=latest) 


## Time Complexity

Using JS Key Value paired DataStructure (Dictionary) which has O(1) time complexity for accessing, inserting and removing. Hence all the operations by any API is O(1).

## Tests

Wrote Unit tests for the controller functions and other code using JEST library.

--- 

### Thanks, Really enjoyed working on it! ✌
