create table USERS (
	id SERIAL primary key,
	name VARCHAR(250) not null,
	mail VARCHAR(250) not null unique,
	pwd VARCHAR(250) not null unique
);

INSERT INTO USERS (name, mail, pwd) VALUES
('Alice Johnson', 'alice.johnson@example.com', '$2a$10$KIJdsr69C5oreR8UBQ5rE.7rETmZSv9I1J5q9Y3e9W4u5o6p7q8r9'),
('Bob Smith', 'bob.smith@example.com', '$2a$10$MNOpqr70D6stuV7wxy.zHe4vG5nB2iK1mN8oPqRsTuVwWxY7Z2L8A'),
('Carla Davis', 'carla.davis@example.com', '$2a$10$OPQRST71E7vwxY8xyz.ABi5wH6mC3jL2nO9pQrStUvWxZ3M9B3N7B'),
('David Wilson', 'david.wilson@example.com', '$2a$10$QRSTU72F8wxyA9yza.BJ6vI7nD4kM5lO3pPqRsTvUwXyZ4N0C4O8C'),
('Elena Martinez', 'elena.martinez@example.com', '$2a$10$RSTUV73G9xyzB0zab.CK7wJ8nE5lN6mP4qQrStUvWxY5O1D5P9D9D'),
('Frank Lee', 'frank.lee@example.com', '$2a$10$STUVW74H0yzaC1abc.DL8xK9nF6mO7nP5rRsTvUwXyZ6P2E6Q0E0E'),
('Grace Kim', 'grace.kim@example.com', '$2a$10$TUVWX75I1zabD2bcd.EM9yL0nG7nP8oQ6rStUvWxY7Q7F7R1F1F1F'),
('Henry Clark', 'henry.clark@example.com', '$2a$10$UVWXY76J2abcE3cde.FN0zM1nH8oP9pQ7rStUvWxY8R8G8S2G2G2G'),
('Irene Lewis', 'irene.lewis@example.com', '$2a$10$VWXYZ77K3bcdF4def.GO1aN2nI9pQ0qR8rStUvWxY9S9H9T3H3H3H'),
('Jack Hall', 'jack.hall@example.com', '$2a$10$WXYZA78L4cdeG5efg.HP2bO3nJ0qR1rS9rStUvWxY0T0I0U4I4I4I'),
('Karen Young', 'karen.young@example.com', '$2a$10$XYZAB79M5defH6fgh.IQ3cP4nK1rS2sT0rStUvWxY1U1J1V5J5J5J'),
('Luis Hernandez', 'luis.hernandez@example.com', '$2a$10$YZABC80N6efgI7ghi.JR4dQ5nL2sT3tU1rStUvWxY2V2K2W6K6K6K'),
('Mia Allen', 'mia.allen@example.com', '$2a$10$ZABCD81O7fghJ8hij.KS5eR6nM3tU4uV2rStUvWxY3W3L3X7L7L7L'),
('Noah King', 'noah.king@example.com', '$2a$10$ABCDE82P8ghik9ijk.LT6fS7nN4uV5vW3rStUvWxY4X4M4Y8M8M8M'),
('Olivia Wright', 'olivia.wright@example.com', '$2a$10$BCDEF83Q9hijl0jkl.MU7gT8nO5vW6wX4rStUvWxY5Y5N5Z9N9N9N'),
('Paul Scott', 'paul.scott@example.com', '$2a$10$CDEFG84R0ijkl1klm.NV8hU9nP6wX7xY5rStUvWxY6Z6O6A0O0O0O'),
('Quinn Torres', 'quinn.torres@example.com', '$2a$10$DEFGH85S1jklm2lmn.OW9iV0nQ7xY8yZ6rStUvWxY7A7P7B1P1P1P'),
('Rachel Green', 'rachel.green@example.com', '$2a$10$EFGHI86T2klmn3mno.PX0jW1nR8yZ9zA7rStUvWxY8B8Q8C2Q2Q2Q'),
('Sam Baker', 'sam.baker@example.com', '$2a$10$FGHIJ87U3lmno4nop.QY1kX2nS9zA0zB8rStUvWxY9C9R9D3R3R3R'),
('Tina Adams', 'tina.adams@example.com', '$2a$10$GHIJK88V4mno5opq.RZ2lY3nT0zB1zC9rStUvWxY0D0S0E4S4S4S4S'),
('Uma Patel', 'uma.patel@example.com', '$2a$10$HIJKL89W5nop6pqr.SA3mZ4nU1zC2zD0rStUvWxY1E1T1F5T5T5T5T'),
('Victor Liu', 'victor.liu@example.com', '$2a$10$IJKLM90X6opq7qrs.TB4nA5nV2zD3zE1rStUvWxY2F2U2G6U6U6U6U'),
('Wendy Cruz', 'wendy.cruz@example.com', '$2a$10$JKLMN91Y7pqr8rst.UC5oB6nW3zE4zF2rStUvWxY3G3V3H7V7V7V7V'),
('Xander Fox', 'xander.fox@example.com', '$2a$10$KLMNO92Z8qrs9stu.VD6pC7nX4zF5zG3rStUvWxY4H4W4I8W8W8W8W'),
('Yara Gomez', 'yara.gomez@example.com', '$2a$10$LMNOP93A9rst0tuv.WE7qD8nY5zG6zH4rStUvWxY5I5X5J9X9X9X9X');