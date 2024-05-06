# Start a client
Server URL is in VITE_APP_SERVER_URL environment variable (currently it's located in .env file and by default equals http://localhost:3001). 

Go to the client directory
enter "npm run dev"

# Start a server
Go to the server directory
enter "node server.js"

# Currect functionality
Currently all blogs are showed (without any filering and pagination).
Only own blogs could be edited / deleted (even in previous sessions, each post has userId field).
Empty posts are not saved.

# New user's registration : 
Go to the Register, enter username and password. 
If such user already exists, error message displayed.

# Logging in :
Go to the Login menu item, fill username and password
If username or password are incorrect - error is displayed.

Predefined users : 
  username: "oleg",
  password: "oleg1"

  username: "user",
  password: "user1"
