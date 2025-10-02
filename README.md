# Sun Expense Tracker

Sun Expense Tracker is a full-stack (MERN) web application for tracking and visualizing your income and expenses. It features a Sankey diagram for intuitive flow visualization, multi-language support, and persistent storage using MongoDB.

## Features

- **Add, edit, and delete** income and expense entries
- **Sankey Chart** visualization using [react-google-charts](https://github.com/RakanNimer/react-google-charts)
- **Multi-language support** (i18n)
- **Persistent storage** with MongoDB
- **Responsive UI** built with React and Material-UI

## Tech Stack

- **Frontend:** React, Material-UI, react-google-charts, i18next
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB (Atlas)
- **Other:** Upstash Redis (for rate limiting)

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- (Optional) Upstash Redis account

### Installation

1. **Clone the repository:**
   git clone https://github.com/yourusername/Sun_Expense_Tracker.git
   cd Sun_Expense_Tracker

2. **Install dependencies:**
   cd client
   npm install
   cd ../server
   npm install

3. **Configure environment variables:**
   Create a `.env` file in the `server` directory:

   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token


### Running the Application

#### Start the backend server

cd server
npm start

The backend will run on [http://localhost:5001](http://localhost:5001).

#### Start the frontend

cd client
npm start

The frontend will run on [http://localhost:3000](http://localhost:3000).

### Usage

- Add income or expense entries using the provided buttons.
- Visualize your cash flow in the Sankey diagram.
- Switch languages using the language selector.
- View, edit, or delete detailed data in the table below the chart.


### Project Structure

Sun_Expense_Tracker/
├── client/      # React frontend
├── server/      # Express backend
├── README.md
└── .gitignore


### API Endpoints

- `GET /api/expenses` — Get all expenses
- `POST /api/expenses` — Add a new expense
- `PUT /api/expenses/:id` — Update an expense
- `DELETE /api/expenses/:id` — Delete an expense


### Customization

- To add more languages, update the i18n configuration in the client.
- To change chart options, edit the SankeyChart component props.


### Future Scope

- To add User Authentication, so that expenses can be tracked per user.
- To Add date filters and provide users ability to pull data based on the filters.



*Built by SunnyAthyala*