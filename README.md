--for dev--

TODO: sql proxy when run on cloud shell (using project db-nmptudw19)
sudo mkdir /cloudsql
sudo chmod 777 /cloudsql
cloud_sql_proxy -dir=/cloudsql &

Run at localhost:
    remove/comment like this: at models/Accounts.js
    // dialectOptions: {
    //     socketPath: process.env.DB_HOST
    // },

Run sequelize-auto: 
    npx sequelize-auto -o "./models" -d dbbanhang -h 34.124.152.222 -u root -p 3306 -x 12345678 -e mysql