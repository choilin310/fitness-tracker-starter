# Starter repo for Fitness Trackr Backend

- First make sure you create your database locally!
  - `createdb fitness-dev`

Directory Structure:

```js
├── README.md
├── db
│   ├── adapters
│   │   ├── activities.js
│   │   ├── routine_activities.js
│   │   ├── routines.js
│   │   └── users.js
│   ├── client.js
│   ├── seed.js
│   └── seedData.js
├── package-lock.json
├── package.json
├── routes
│   ├── activities.js
│   ├── index.js
│   ├── routine_activities.js
│   ├── routines.js
│   └── users.js
└── server.js
```

This repo serves as a starting point for your fitness tracking empire. The backend template is set up for you. You will have to complete the following:

- Complete the functions in your `db/seed.js` file. Make sure you pay attention to the order of operations, and correct table definitions.

  - Drop Tables
  - Create Tables
  - Populate Tables

- DB adapters should follow CRUD methods as needed
- Make sure to call the appropriate db method in your express routes
