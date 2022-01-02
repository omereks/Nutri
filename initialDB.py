# python -m pip install mysql-connector-python
# python -m pip install pandas
import math

import mysql.connector
import pandas as pd

FLAG100 = 0
FLAGDEl = 1





arrNutrirnts = [1085,1003,1008,1093,1087,1242,1114,1241,1178,1106]


def init_mysql():
    db = mysql.connector.connect(host="localhost",
                                 port="3306",
                                 user="root",
                                 passwd="111111",
                                 )
    return db


db = init_mysql()
mycursor = db.cursor()

#drop existing schema:
if FLAGDEl == 1:
    print("delete all DB")
    mycursor.execute("DROP DATABASE `nurti`")

#create schema
print("create new DB")
mycursor.execute("CREATE SCHEMA `nurti`")

#creat tables:

#Food
print("create food table..")
# TODO added name food
mycursor.execute("CREATE TABLE `nurti`.`food` ( \
                    `food_id` INT NOT NULL, \
                    `category` VARCHAR(999) NULL, \
                    `main_food` VARCHAR(999) NULL, \
                    `description` VARCHAR(999) NULL, \
                    PRIMARY KEY (`food_id`))")


empdata = pd.read_csv('food.csv', index_col=False, delimiter = ',')
empdata.head()
print("start upload food..")
maxRows = 1048576
p = 0
for i,row in empdata.iterrows():
    try:
        if i % 100000 == 0:
            print(str(p) + "%")
            p = p + 10
        food_id = row[0]
        food_category = row[1]
        food_description = row[2]
        query = "INSERT INTO `nurti`.`food` (`food_id`,`category`, `main_food`, `description`) VALUES (%s, %s, %s, %s);"
        if type(food_description) is float and math.isnan(food_description):
            food_description = "empty"
        main_food_split = food_description.split(',')
        main_food = main_food_split[0]
        food_description = food_description.replace(",", "")
        food_description = food_description.replace("\"", "")
        
        val = (food_id, food_category, main_food, food_description)
        mycursor.execute(query, val) 
        if FLAG100 == 1 and i == 100:
            break
    except:
        print("skip")
db.commit()

print("finished upload food")

#Nutrient
print("create nutrient table")
mycursor.execute("CREATE TABLE `nurti`.`nutrient` (" \
                "`nutrient_id` INT NOT NULL," \
                "`nutrient_name` VARCHAR(999) NULL," \
                "`unit` VARCHAR(45) NULL," \
                "PRIMARY KEY (`nutrient_id`));")


empdata = pd.read_csv('nutrient.csv', index_col=False, delimiter = ',')
empdata.head()
print("start upload nutrient..")
p = 0
for i,row in empdata.iterrows():
    if i % 40 == 0:
        print(str(p) + "%")
        p = p + 10
    if row[0] not in arrNutrirnts:
        continue
    nutrient_id = row[0]
    nutrient_name = row[1]
    unit = row[2]
    query = "INSERT INTO `nurti`.`nutrient` (`nutrient_id`, `nutrient_name`, `unit`) VALUES (%s,%s,%s)"
    val = (nutrient_id, nutrient_name, unit)
    mycursor.execute(query, val)
    if FLAG100 == 1 and i == 100:
        break
db.commit()
print("finish upload nutrient")


#food_values
print("create food_values table")
mycursor.execute("CREATE TABLE `nurti`.`food_values` (" \
                    "`ID` INT NOT NULL," \
                    "`food_id` INT NULL," \
                    "`nutrient_id` INT NULL," \
                    "`amount` VARCHAR(45) NULL," \
                    "PRIMARY KEY (`ID`));")


empdata = pd.read_csv('food_nutrient.csv', index_col=False, delimiter = ',')
empdata.head()
print("start upload food_values..")
p = 0
for i,row in empdata.iterrows():
    if FLAG100 == 1 and i == 100:
        break
    if i % 500000 == 0:
        print(str(p) + "%")
        p = p + 10
    if row[2] not in arrNutrirnts:
        continue
    ID = i+1
    food_id = row[1]
    nutrient_id = row[2]
    amount = row[3]
    query = "INSERT INTO `nurti`.`food_values` (`ID`, `food_id`, `nutrient_id`, `amount`) VALUES (%s,%s,%s,%s);"
    val = (ID, food_id, nutrient_id, amount)
    mycursor.execute(query, val)

db.commit()
print("finish upload food_values")

#food_eaten
print("create food_eaten table")
mycursor.execute("CREATE TABLE `nurti`.`food_eaten` (" \
                    "`id` INT NOT NULL AUTO_INCREMENT," \
                    "`user_id` INT NULL," \
                    "`food_id` VARCHAR(45) NULL," \
                    "`amount` INT NULL," \
                    "PRIMARY KEY (`id`));")

print("finish upload food_eaten")


#recommended_values
print("create recommended_values table")
mycursor.execute("CREATE TABLE `nurti`.`recommended_values` (" \
                    "`ID` INT NOT NULL," \
                    "`gender` TINYINT(1) NULL," \
                    "`nutrient_id` INT NULL," \
                    "`amount` INT NULL," \
                    "PRIMARY KEY (`ID`));")

print("finish create recommended_values")
#male = 1 , female 0
arrTupleNutirient = [(1, 1, 1106, 1000), #A Male
                (2, 0, 1106, 800),  #A Female
                (3, 1, 1178, 2),  # B-12 Male
                (4, 0, 1178, 2),  # B-12 Female
                (5, 1, 1241, 60),  # c Male
                (6, 0, 1241, 60),  # c Female
                (7, 1, 1114, 15),  # d Male
                (8, 0, 1114, 15),  # d Female
                (9, 1, 1242, 10),  # e Male
                (10, 0, 1242, 8),  # e Female

                (11, 1, 1087, 1000),  # Calcium Male
                (12, 0, 1087, 1000),  # Calcium Female
                (13, 1, 1093, 1500),  # Sodium Male
                (14, 0, 1093, 1500),  # Sodium Female
                (15, 1, 1008, 2400),  # Energy Male
                (16, 0, 1008, 1800),  # Energy Female
                (17, 1, 1003, 75),  # Protein Male
                (18, 0, 1003, 75),  # Protein Female
                (19, 1, 1085, 50),  # Fat Male
                (20, 0, 1085, 50),]  # Fat Female

mycursor.executemany('INSERT INTO `nurti`.`recommended_values` (`ID`, `gender`, `nutrient_id`, `amount`) VALUES(%s, %s, %s, %s)', arrTupleNutirient)
db.commit()


#users
print("create users table")
mycursor.execute("CREATE TABLE `nurti`.`users` (" \
                    "`id` INT NOT NULL," \
                    "`gender` TINYINT(1) NULL," \
                    "PRIMARY KEY (`id`));")
db.commit()
print("finish create users")


# recommended_values_per_users
print("create recommended_values_per_users table")
mycursor.execute("CREATE TABLE `nurti`.`recommended_values_per_users` (" \
                    # "`id` INT NOT NULL AUTO_INCREMENT," \
                    "`user_id` INT NOT NULL," \
                    "`nutrient_id` INT NOT NULL," \
                    "`amount` INT NULL," \
                    "PRIMARY KEY (`user_id`, `nutrient_id`));")
db.commit()
print("finish create recommended_values_per_users")
