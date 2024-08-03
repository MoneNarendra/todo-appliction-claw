
# Todo Server

Created To-Do APIS that allows users to register, login, delete and manage their to-do items. This APIS I use Node.js, and Sqlite at backend. Deploy the backend using Render.

Given an `index.js` file and a database file `todo.db` consisting of two tables `user`, and `${username}`.

**User Table**

| Column   | Type    |
| -------- | ------- |
| name     | TEXT    |
| username | TEXT    |
| password | TEXT    |
| gender   | TEXT    |

**`${username}` Table**

| Column              | Type    |
| ------------------- | ------- |
| id       | TEXT |
| task  | TEXT |
| isCompleted  | BOOLEAN |

#### Note: 
A tabel get create when user ```signIn```. The created tabel name is taken form ```username```.


 ### API 1

 #### Path: `/signIn/`

 #### Method: `POST`

- **Request**

```
Content-Type: application/json

{   
    "name":"Narendra Kumar Mone",
    "username":"narendra11",
    "password": "narendra@123",
    "gender": "Male"
}
```

- **Scenario 1**

  - **Description**:

    If the username already exists

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Username already taken
      ```



- **Scenario 2**

  - **Description**:

    Successful registration of the registrant

  - **Response**

    - **Status code**

      ```
      200
      ```

    - **Body**
      ```
      User created successfully
      ```



 ### API 2

 #### Path: `/logIn/`

 #### Method: `POST`

- **Request**

```
Content-Type: application/json

{   
    "username":"narendra11",
    "password": "narendra@123"
}
```

- **Scenario 1**

  - **Description**:

    If the username is not consistes in database

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid User
      ```

- **Scenario 2**

  - **Description**:

    Password did not matches with username 

  - **Response**

    - **Status code**

      ```
      400
      ```

    - **Body**
      ```
      Invalid Password
      ```

- **Scenario 3**

  - **Description**:

    Successful logIn

  - **Response**

    - **Status code**

      ```
      200
      ```

    - **Body**
      ```
      {jwtToken: "badbahsrueuoadnaeuhriae94q"}
      ```



 ### API 3

 #### Path: `/todo/add/`

 #### Method: `POST`

- **Request**

```
Authorization: Bearer ${jwtToken}
Content-Type: application/json

{   
    "id":"3",
    "task": "night all",
    "isCompleted": "false"
}
```

- **Scenario 1**

  - **Description**:

    User enter text then data get cretead in ```username``` database

  - **Response**
    - **Status code**
      ```
      200
      ```
    - **Body**
      ```
      created
      ```


 ### API 4

 #### Path: `/todo/allTodos/`

 #### Method: `GET`

- **Request**

```
Authorization: Bearer ${jwtToken}

```

- **Scenario 1**

  - **Description**:

    User enter text then data get cretead in ```username``` database

  - **Response**
    - **Status code**
      ```
      200
      ```
    - **Body**
      ```
      [{   "id":"3", "task": "night all", "isCompleted": "false"}, ....]
      ```
 ### API 5

 #### Path: `/todo/update/:id`

 #### Method: `PUT`

- **Request**

```
Authorization: Bearer ${jwtToken}
Content-Type: application/json

{   
    "task": "good night all",
    "isCompleted": "true"
}

```

- **Scenario 1**

  - **Description**:

    User pass the object of ```task``` and ```isCompleted``` 

  - **Response**
    - **Status code**
      ```
      200
      ```
    - **Body**
      ```
      Todo Updated Successfully
      ```
 ### API 6

 #### Path: `/todo/userDetails/`

 #### Method: `GET`

- **Request**

```
Authorization: Bearer ${jwtToken}

```

- **Scenario 1**

  - **Description**:

    Get the ```LogIn``` user details 

  - **Response**
    - **Status code**
      ```
      200
      ```
    - **Body**
      ```
      {
        "name":"Narendra Kumar Mone",
        "username":"narendra11",
        "gender": "Male"
      }
      ```


 ### API 7

 #### Path: `/todo/deleteUser/`

 #### Method: `DELETE`

- **Request**

```
Authorization: Bearer ${jwtToken}

```

- **Scenario 1**

  - **Description**:

    Get the ```LogIn``` user details 

  - **Response**
    - **Status code**
      ```
      200
      ```
    - **Body**
      ```
      deleted Succfully
      ```



