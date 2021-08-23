exports.seed = function(knex, Promise) {
    return knex('booking').insert([
        {
            name: "Fake Event 1",
            time_start: new Date("2021-09-10 10:00"),
            time_end: new Date("2021-09-10 11:00"),
            user_id: 1,
            room_id: "C1"
        },
        {
            name: "Fake Event 2",
            time_start: new Date("2021-09-10 11:00"),
            time_end: new Date("2021-09-10 12:00"),
            user_id: 2,
            room_id: "C1"
        },
        {
            name: "Fake Event 3",
            time_start: new Date("2021-09-10 12:00"),
            time_end: new Date("2021-09-10 13:00"),
            user_id: 4,
            room_id: "C1"
        },
        {
            name: "Fake Event 4",
            time_start: new Date("2021-09-10 16:00"),
            time_end: new Date("2021-09-10 17:00"),
            user_id: 1,
            room_id: "C1"
        },
        {
            name: "Fake Event 5",
            time_start: new Date("2021-09-10 10:00"),
            time_end: new Date("2021-09-10 11:00"),
            user_id: 2,
            room_id: "C2"
        },
        {
            name: "Fake Event 6",
            time_start: new Date("2021-09-10 12:00"),
            time_end: new Date("2021-09-10 13:00"),
            user_id: 3,
            room_id: "C2"
        },
        {
            name: "Fake Event 7",
            time_start: new Date("2021-09-10 15:00"),
            time_end: new Date("2021-09-10 16:00"),
            user_id: 1,
            room_id: "C2"
        },
        {
            name: "Fake Event 8",
            time_start: new Date("2021-09-10 16:00"),
            time_end: new Date("2021-09-10 17:00"),
            user_id: 2,
            room_id: "C2"
        },
        {
            name: "Fake Event 9",
            time_start: new Date("2021-09-10 10:00"),
            time_end: new Date("2021-09-10 11:00"),
            user_id: 3,
            room_id: "C3"
        },
        {
            name: "Fake Event 10",
            time_start: new Date("2021-09-10 9:00"),
            time_end: new Date("2021-09-10 10:00"),
            user_id: 2,
            room_id: "C3"
        },
        {
            name: "Fake Event 11",
            time_start: new Date("2021-09-10 15:00"),
            time_end: new Date("2021-09-10 16:00"),
            user_id: 3,
            room_id: "C3"
        },
        {
            name: "Fake Event 12",
            time_start: new Date("2021-09-10 16:00"),
            time_end: new Date("2021-09-10 17:00"),
            user_id: 1,
            room_id: "C3"
        },
        {
            name: "Fake Event 13",
            time_start: new Date("2021-09-10 17:00"),
            time_end: new Date("2021-09-10 18:00"),
            user_id: 2,
            room_id: "C3"
        },
    ])
}