// Create dummy data to seed into your DB
const users = [
    {
        username: 'cedric',
        password: 'test1'
    },
    {
        username: 'chris',
        password: 'test2'
    },
    {
        username: 'hanz',
        password: 'test3'
    }
];
const activities = [
    {
        name: 'benchpress',
        description: 'lift a safe amount, but push yourself!'
    },
    {
        name: 'curls',
        description: 'work those biceps!'
    },
    {
        name: 'pushups',
        description: 'are you pushing yourself up or pushing the earth down?'
    },

];
const routines = [];
const routine_activities = [];

module.exports = { users, activities, routines, routine_activities };
