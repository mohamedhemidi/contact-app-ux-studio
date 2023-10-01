-- DROP table contacts
CREATE TABLE contacts (id INTEGER PRIMARY KEY, email TEXT NOT NULL, name TEXT NOT NULL, phone_number TEXT NOT NULL, picture TEXT, archived BOOLEAN)

INSERT INTO contacts (email, name, phone_number, picture, archived)
VALUES ("timothy@lewis.com", "Timothy Lewis", "123456789", "profilePic", false)