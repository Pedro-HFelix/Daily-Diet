# Daily Diet API.

### Application Rules

- It should be possible to create a user.
- It should be possible to identify the user across requests.
- It should be possible to register a meal with the following information:
    
    *Meals should be associated with a user.*
    
    - Name
    - Description
    - Date and Time
    - Whether it is within the diet or not
- It should be possible to edit a meal, allowing changes to all the above data.
- It should be possible to delete a meal.
- It should be possible to list all meals of a user.
- It should be possible to view a single meal.
- It should be possible to retrieve metrics for a user.
    - Total number of registered meals.
    - Total number of meals within the diet.
    - Total number of meals outside the diet.
    - Best sequence of meals within the diet.
- The user can only view, edit, and delete the meals they created.

### Technologies Used

The Daily Diet API is built using the following technologies:

- Node.js: A JavaScript runtime environment that allows executing JavaScript code outside of a web browser.
- fastify: A web application framework for Node.js that simplifies the process of building APIs.
- knex: A SQL query builder for Node.js that provides a flexible and powerful way to interact with databases.
- TypeScript: A statically typed superset of JavaScript that compiles to plain JavaScript. It adds optional static types to JavaScript to enable better tooling and catch common errors at compile time.
- zod: A TypeScript-first schema validation library that allows you to define and validate data structures with ease.
- sqlite3: A lightweight, file-based database engine that provides a simple and efficient way to store and retrieve data. It is widely used for development and testing purposes.