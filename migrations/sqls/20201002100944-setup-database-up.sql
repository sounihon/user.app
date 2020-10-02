CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE IF NOT EXISTS users (id UUID NOT NULL DEFAULT uuid_generate_v4(),
                                                           login VARCHAR(32) UNIQUE NOT NULL,
                                                                                    password VARCHAR(255) NOT NULL,
                                                                                                          PRIMARY KEY (id));