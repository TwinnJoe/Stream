CREATE DATABASE IF NOT EXISTS stream;
USE stream;

-- 1. Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Media (both movies and series)
CREATE TABLE media (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type ENUM('movie', 'series') NOT NULL,
  category VARCHAR(100),
  release_year YEAR,
  duration VARCHAR(20),
  image_url TEXT NOT NULL,           -- 🖼️ Image stored here
  video_url TEXT,                    -- 🎥 For movies only
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO media (title, description, type, category, release_year, duration, image_url, video_url) VALUES
-- 🎬 Movies
('Oppenheimer', 'A biopic about J. Robert Oppenheimer and the creation of the atomic bomb.', 'movie', 'Drama', 2023, '3h 0m', 'Oppenheimer.jpg', 'https://cdn.example.com/movies/oppenheimer.mp4'),
('Dune: Part Two', 'Paul Atreides unites with Chani and the Fremen to avenge his family.', 'movie', 'Sci-Fi', 2024, '2h 46m', 'Dune-Part-Two.jpg', 'https://cdn.example.com/movies/dune2.mp4'),
('Top Gun: Maverick', 'Maverick returns to train elite pilots for a dangerous mission.', 'movie', 'Action', 2022, '2h 11m', 'Top-Gun-Maverick.jpg', 'https://cdn.example.com/movies/topgun_maverick.mp4'),
('Spider-Man: No Way Home', 'Peter Parker faces multiverse mayhem with old and new foes.', 'movie', 'Superhero', 2021, '2h 28m', 'Spider-man_No-Way-Home.jpg', 'https://cdn.example.com/movies/spiderman_nwh.mp4'),
('The Batman', 'A gritty new take on Gotham’s dark knight as he investigates corruption.', 'movie', 'Crime', 2022, '2h 56m', 'The Batman.jpg', 'https://cdn.example.com/movies/the_batman.mp4'),
('Everything Everywhere All At Once', 'A laundromat owner is swept into a multiverse adventure.', 'movie', 'Sci-Fi', 2022, '2h 19m', 'Everything_E-A_O.jpg', 'https://cdn.example.com/movies/eeaao.mp4'),
('Avatar: The Way of Water', 'Return to Pandora with Jake and Neytiri’s family.', 'movie', 'Fantasy', 2022, '3h 12m', 'Avatar The_Way-of_Water.jpg', 'https://cdn.example.com/movies/avatar2.mp4'),
('John Wick: Chapter 4', 'John Wick uncovers a path to defeating the High Table.', 'movie', 'Action', 2023, '2h 49m', 'JW-4.jpg', 'https://cdn.example.com/movies/john_wick4.mp4'),
('Barbie', 'Barbie and Ken explore the real world in this meta-comedy.', 'movie', 'Comedy', 2023, '1h 54m', 'Barbie.jpg', 'https://cdn.example.com/movies/barbie.mp4'),
('Mission: Impossible – Dead Reckoning Part One', 'Ethan Hunt races to stop a global threat.', 'movie', 'Thriller', 2023, '2h 43m', 'Mission-Impossible_Dead.jpg', 'https://cdn.example.com/movies/mi_deadreckoning.mp4'),
('Black Panther: Wakanda Forever', 'The nation of Wakanda fights to protect their home.', 'movie', 'Superhero', 2022, '2h 41m', 'Wakanda_Forever.jpg', 'https://cdn.example.com/movies/wakanda_forever.mp4'),
('The Marvels', 'Captain Marvel joins forces with Ms. Marvel and Monica Rambeau.', 'movie', 'Superhero', 2023, '1h 45m', 'The_Marvels.jpg', 'https://cdn.example.com/movies/the_marvels.mp4'),
('The Flash', 'Barry Allen travels through time to save his mother.', 'movie', 'Action', 2023, '2h 24m', 'The_Flash.jpg', 'https://cdn.example.com/movies/the_flash.mp4'),
('Ant-Man and the Wasp: Quantumania', 'Scott Lang explores the Quantum Realm.', 'movie', 'Superhero', 2023, '2h 5m', 'Quntumania.jpg', 'https://cdn.example.com/movies/quantumania.mp4'),
('Guardians of the Galaxy Vol. 3', 'The Guardians embark on a mission to save Rocket.', 'movie', 'Sci-Fi', 2023, '2h 30m', 'Guadians-3.jpg', 'https://cdn.example.com/movies/gotg3.mp4'),
('Fast X', 'Dom and his family face their most lethal adversary.', 'movie', 'Action', 2023, '2h 21m', 'Fast X.jpg', 'https://cdn.example.com/movies/fastx.mp4'),
('The Creator', 'A futuristic war between AI and humanity rages on.', 'movie', 'Sci-Fi', 2023, '2h 13m', 'The_Creator.jpg', 'https://cdn.example.com/movies/the_creator.mp4'),
('Wonka', 'The origin story of the world’s greatest inventor, magician, and chocolatier.', 'movie', 'Fantasy', 2023, '1h 56m', 'Wonka.jpg', 'https://cdn.example.com/movies/wonka.mp4'),
('The Super Mario Bros. Movie', 'Mario and Luigi journey through the Mushroom Kingdom.', 'movie', 'Animation', 2023, '1h 32m', 'Super_Mario-Bros.jpg', 'https://cdn.example.com/movies/super_mario.mp4'),
('Napoleon', 'The rise and fall of the iconic French emperor.', 'movie', 'Historical', 2023, '2h 38m', 'Napoleon.jpg', 'https://cdn.example.com/movies/napoleon.mp4'),

-- 📺 Series
('Stranger Things', 'A group of young friends uncover supernatural mysteries in their town.', 'series', 'Sci-Fi', 2022, '4 Seasons', 'Stranger_Things.jpg', NULL),
('The Last of Us', 'A smuggler and a teenage girl journey across a post-apocalyptic US.', 'series', 'Drama', 2023, '1 Season', 'Last-of-Us.jpg', NULL),
('Wednesday', 'Wednesday Addams investigates mysteries at Nevermore Academy.', 'series', 'Comedy', 2022, '1 Season', 'Wednesday.jpg', NULL),
('The Witcher', 'A monster hunter struggles to find his place in a chaotic world.', 'series', 'Fantasy', 2023, '3 Seasons', 'The_Witcher.jpg', NULL),
('House of the Dragon', 'A Targaryen civil war decades before Game of Thrones.', 'series', 'Fantasy', 2022, '2 Seasons', 'House-of-Dragon.jpg', NULL),
('Succession', 'A powerful family battles for control of a media empire.', 'series', 'Drama', 2023, '4 Seasons', 'Succession.jpg', NULL),
('Loki', 'The god of mischief navigates alternate timelines.', 'series', 'Superhero', 2023, '2 Seasons', 'Loki.jpg', NULL),
('The Boys', 'Superheroes behave badly in this dark satire.', 'series', 'Action', 2023, '4 Seasons', 'The Boys.jpg', NULL),
('Breaking Bad', 'A chemistry teacher becomes a drug kingpin.', 'series', 'Crime', 2013, '5 Seasons', 'Breaking_Bad.jpg', NULL),
('Bridgerton', 'Romantic entanglements in Regency-era London.', 'series', 'Romance', 2023, '3 Seasons', 'Bridgerton.jpg', NULL),
('The Mandalorian', 'A lone bounty hunter in the outer reaches of the galaxy.', 'series', 'Sci-Fi', 2023, '3 Seasons', 'Mandalorian.jpg', NULL),
('The Crown', 'The political rivalries and romance of Queen Elizabeth II’s reign.', 'series', 'Historical', 2023, '6 Seasons', 'The_Crown.jpg', NULL),
('Peaky Blinders', 'A gangster family rises to power in post-WWI Birmingham.', 'series', 'Crime', 2022, '6 Seasons', 'Peaky_Blinders.jpg', NULL),
('The Umbrella Academy', 'A dysfunctional family of superheroes reunite to stop the apocalypse.', 'series', 'Fantasy', 2022, '3 Seasons', 'Umbrella_Academy.jpg', NULL),
('You', 'A charming man’s obsession turns deadly.', 'series', 'Thriller', 2023, '4 Seasons', 'You.jpg', NULL),
('Shadow and Bone', 'A young soldier discovers a power that could unite her war-torn world.', 'series', 'Fantasy', 2023, '2 Seasons', 'Shadow_and_Bone.jpg', NULL),
('Sex Education', 'A teen sets up an underground sex clinic at school.', 'series', 'Comedy', 2023, '4 Seasons', 'Sex_Education.jpg', NULL),
('Money Heist', 'Criminals attempt the biggest heist in history.', 'series', 'Thriller', 2021, '5 Seasons', 'Money_Heist.jpg', NULL),
('The Sandman', 'Dream, the king of dreams, escapes captivity and restores order.', 'series', 'Fantasy', 2022, '1 Season', 'The_Sandman.jpg', NULL),
('One Piece (Live Action)', 'Monkey D. Luffy sets out to become the Pirate King.', 'series', 'Adventure', 2023, '1 Season', 'One_Piece.jpg', NULL);



