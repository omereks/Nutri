const add_user = "USE nurti; INSERT INTO users VALUES (user_id, user_gender)"

const update_personal_values = "USE nurti; INSERT INTO recommended_values_per_users VALUES (id, user_id, nutrient_id, amount, recommended_values_per_usercol);"
const sum_values = "USE nurti;\n" +
    "SELECT food_id, amount\n" +
    "FROM food_eaten\n" +
    "WHERE user_id = userId"