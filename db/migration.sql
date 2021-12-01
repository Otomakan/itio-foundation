CREATE TABLE public.user_account (
    id character varying(40) NOT NULL,
    email text NOT NULL,
    role text NOT NULL,
    password text NOT NULL,
    first_name character varying(40),
    last_name character varying(40)
);
