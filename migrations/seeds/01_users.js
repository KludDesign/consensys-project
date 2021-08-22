exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('booking').del()
      .then(() => {
        knex('user').del()
          .then(() => {
            // Inserts seed entries
            // TODO: password to be encrypted
            return knex('user').insert([
              {
                id: 1,
                first_name: 'bruce',
                last_name: 'wayne',
                email: 'bruce@gmail.com',
                password: 'wayne',
                company: 1,
              },
              {
                id: 2,
                first_name: 'clark',
                last_name: 'kent',
                email: 'clark@gmail.com',
                password: 'kent',
                company: 1,
              },
              {
                id: 3,
                first_name: 'captain',
                last_name: 'america',
                email: 'captain@gmail.com',
                password: 'america',
                company: 2,
              },
              {
                id: 4,
                first_name: 'iron',
                last_name: 'man',
                email: 'iron@gmail.com',
                password: 'man',
                company: 2,
              }
            ])
          })
    })
};