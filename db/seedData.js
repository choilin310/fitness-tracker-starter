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
  {
    name: "finger planks",
    description: "strengthen finger core",
  },
  {
    name: "run real fast",
    description: "run real fast",
  },
  {
    name: "jump squat",
    description: "leap in to a squating position",
  },
];

const routines = [
  {
    creator_id: 1,
    name: "Chest Day",
    goal: "Get Buff!",
  },
  {
    creator_id: 1,
    name: "Leg Day",
    goal: "Every Day Leg Day!!",
  },
  {
    creator_id: 2,
    name: "Crossfit",
    goal: "Do everything really fast with really bad form",
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
  {
    routine_id: 2,
    activity_id: 5,
    count: 10,
    duration: 60,
  },
  {
    routine_id: 2,
    activity_id: 6,
    count: 20,
    duration: 30,
  },
  {
    routine_id: 3,
    activity_id: 1,
    count: 100,
    duration: 1,
  },
  {
    routine_id: 3,
    activity_id: 2,
    count: 100,
    duration: 1,
  },
  {
    routine_id: 3,
    activity_id: 4,
    count: 10,
    duration: 30,
  },
];

module.exports = { users, activities, routines, routine_activities };
