**Harry Potter World**

A web application dedicated to exploring the magical world of Harry Potter, featuring characters, creatures, and potions.

**Features**

\- ***User Authentication***: Secure registration and login functionality.

\- ***Role-Based Access Control***: Admins and editors have different levels of access, allowing for post creation, editing, and deletion.

\- ***Dynamic Content***: Explore the Harry Potter universe with detailed information on characters, magical creatures, and potions.

\- ***Interactive UI***: Pages are rendered dynamically using EJS templates.

***- API Integrations:***

`  `- Weather API for weather updates.

`  `- OMDB API for additional movie details.

**Installation**

**Prerequisites**

***- Node.js*** (v14 or higher)

\- ***MongoDB*** (Local or Atlas cluster)

**Steps to Set Up**

***1. Clone the repository:***

`   `git clone https://github.com/your-username/harry-potter-world.git

`   `cd harry-potter-world



***2. Install dependencies:***

`   `npm install

`   `***3. Create a `.env` file in the root directory with the following content:***

`   `MONGO\_URI=your\_mongodb\_connection\_string

`   `EMAIL\_USER=your\_email\_address

`   `EMAIL\_PASS=your\_email\_password

`   `OMDB\_API\_KEY=your\_omdb\_api\_key

`   `WEATHER\_API\_KEY=your\_weather\_api\_key

`   `SESSION\_SECRET=your\_session\_secret

***4. Run the application:***

`   `npm start

`   `The app will run at `http://localhost:3000`.

**Project Structure**

harry-potter-world/

├── app.js             # Main application file

├── config/

│   └── db.js          # MongoDB configuration

├── controllers/       # Business logic for routes

│   ├── authController.js

│   └── mainController.js

├── middleware/        # Middleware for role-based access control

│   └── authMiddleware.js

├── models/            # Mongoose schemas

│   ├── itemModel.js

│   └── userModel.js

├── public/            # Static files

│   ├── css/

│   │   └── styles.css

│   └── js/            # (Empty, for custom scripts if needed)

├── routes/            # Route definitions

│   ├── auth.js

│   └── main.js

├── views/             # EJS templates

│   ├── index.ejs

│   ├── characters.ejs

│   ├── creatures.ejs

│   ├── potions.ejs

│   └── ... (other pages)

├── .env               # Environment variables

├── package.json       # Project metadata and dependencies

└── README.md          # Project documentation


` `**Usage**

**User Roles**

1\. ***Admin***: Full access to create, edit, and delete posts.

2\. ***Editor***: Can create and edit posts but not delete.

3\. ***Viewer***: Can only view posts.

**Available Pages**

\- `/` - Homepage

\- `/login` - Login page

\- `/register` - Registration page

\- `/characters` - View Harry Potter characters

\- `/creatures` - View magical creatures

\- `/potions` - View magical potions

` `**API Integration**

**Weather API**

Used to fetch real-time weather updates for a magical touch.

` `**OMDB API**

Displays additional movie details related to the Harry Potter series.

` `**Database Seeding**

To populate the database with initial data:

***1. Create a file named `seed.js` with the following content:***

`   `const mongoose = require('mongoose');

`   `const Item = require('./models/itemModel');

`   `const seedData = async () => {

`       `try {

`           `await mongoose.connect(process.env.MONGO\_URI);

`           `const items = [

`               `{ type: 'character', title: 'Harry Potter', description: 'The Boy Who Lived.' },

`               `{ type: 'creature', title: 'Hippogriff', description: 'A majestic creature.' },

`               `{ type: 'potion', title: 'Polyjuice Potion', description: 'Transforms the drinker.' }

`           `];

`           `await Item.insertMany(items);

`           `console.log('Database seeded!');

`           `process.exit();

`       `} catch (error) {

`           `console.error('Error seeding database:', error);

`           `process.exit(1);

`       `}

`   `};

`   `seedData();

***2. Run the script:***

`   `node seed.js


**Known Issues**

1\. ***Deprecation Warnings***: The options `useNewUrlParser` and `useUnifiedTopology` are deprecated in MongoDB driver 4.0+. They can be safely removed.

2\. ***JavaScript Folder Empty***: Static JavaScript functionality can be added later to enhance interactivity.

` `**Future Enhancements**

\- Add user profile management.

\- Implement pagination for large datasets.

\- Include more details about magical spells and locations.

**Contributors**

\- *Assel Khaidarova* - Developer

` `**License**

This project is licensed under the MIT License.
