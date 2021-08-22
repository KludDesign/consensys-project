exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('meeting_room').del()
        .then(() => {
        // Inserts seed entries
        return knex('meeting_room').insert([
            { name: 'C1' },
            { name: 'C2' },
            { name: 'C3' },
            { name: 'C4' },
            { name: 'C5' },
            { name: 'C6' },
            { name: 'C7' },
            { name: 'C8' },
            { name: 'C9' },
            { name: 'C10' },
            { name: 'P1' },
            { name: 'P2' },
            { name: 'P3' },
            { name: 'P4' },
            { name: 'P5' },
            { name: 'P6' },
            { name: 'P7' },
            { name: 'P8' },
            { name: 'P9' },
            { name: 'P10' },
        ])
    })
};