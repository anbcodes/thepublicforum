echo "WARNING: THIS RESETS THE DATABASE"
echo "================================="
echo "(You have exacty seconds to quit)"
sleep 2

psql -c "DROP DATABASE forum;" postgres://postgres:password@localhost

psql -c "CREATE DATABASE forum;" postgres://postgres:password@localhost
psql -c "CREATE TABLE users(\
    id INT GENERATED ALWAYS AS IDENTITY, \
    joined TIMESTAMPTZ NOT NULL DEFAULT NOW(), \
    username TEXT NOT NULL, \
    hash TEXT NOT NULL, \
    PRIMARY KEY(id)\
);" postgres://postgres:password@localhost/forum
psql -c "\
CREATE TABLE discussions(\
    id INT GENERATED ALWAYS AS IDENTITY, \
    title TEXT NOT NULL, \
    description TEXT NOT NULL, \
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), \
    author_id INT, \
    PRIMARY KEY(id), \
    FOREIGN KEY(author_id)\
	    REFERENCES users(id)\
        ON DELETE SET NULL\
);" postgres://postgres:password@localhost/forum

psql -c "\
CREATE TABLE comments(\
    id INT GENERATED ALWAYS AS IDENTITY, \
    text TEXT NOT NULL, \
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), \
    author_id INT, \
    discussion_id INT NOT NULL, \
    parent_id INT, \
    PRIMARY KEY(id), \
    FOREIGN KEY(author_id) \
	    REFERENCES users(id)\
        ON DELETE SET NULL,\
    FOREIGN KEY(parent_id) \
	    REFERENCES comments(id)\
        ON DELETE CASCADE,\
    FOREIGN KEY(discussion_id) \
	    REFERENCES discussions(id)\
        ON DELETE CASCADE\
);" postgres://postgres:password@localhost/forum