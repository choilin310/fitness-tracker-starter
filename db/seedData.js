// Create dummy data to seed into your DB
const users = [
  {
    username: "cedric",
    password: "test1",
  },
  {
    username: "chris",
    password: "test2",
  },
  {
    username: "hanz",
    password: "test3",
  },
];

const activities = [
  {
    name: "benchpress",
    description: "lift a safe amount, but push yourself!",
  },
  {
    name: "curls",
    description: "work those biceps!",
  },
  {
    name: "pushups",
    description: "are you pushing yourself up or pushing the earth down?",
  },
];

const routines = [
  {
    creator_id: 1,
    name: "Chest Day",
    goal: "Get Buff!",
  },
  {
    creator_id: 2,
    name: "Leg Day",
    goal: "Every Day Leg Day!!",
  },
];
const routine_activities = [
  {
    routine_id: 1,
    activity_id: 1,
    count: 4,
    duration: 20,
  },
  {
    routine_id: 1,
    activity_id: 2,
    count: 8,
    duration: 15,
  },
  {
    routine_id: 1,
    activity_id: 3,
    count: 4,
    duration: 15,
  },
];

module.exports = { users, activities, routines, routine_activities };
