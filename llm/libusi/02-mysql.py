from langchain_community.utilities import SQLDatabase

db = SQLDatabase.from_uri("mysql+mysqlconnector://root:z6skqQJrf@192.168.110.5:3306/app-local")
print(db.dialect)
print(db.get_usable_table_names())
db.run("SELECT * FROM t_user LIMIT 10;")
