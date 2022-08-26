USERS => all tests passing
index: all users
show: one user by id => to show the logged in users profile
create: create a new user / sign up !! return value is the TOKEN
OR null if user_name already taken => display message to user !!
authenticate: sign in / enter username and password
=> returns encrypted password
=> display message to the user if username does not exist
or if password is not correct
addPetToUser: create a relation between a pet and a user !! how handle when pet already exists ?
removePetFromUser: cancel a relation between user and pet (e.g. before deleting a pet => FK constraints!)
edit: update a certain field of a certain user with a value
destroy: delete a user
=> delete users' pets, posts, comments, likes
=> comments and likes preserved in new table
=> shown as "deleted user"

PETS => all tests passing
index: all pets
show: one pet by id
showPetsByUser: to display all of the users pets
showPetsByProp: for filtering the pets (e.g. all with type dog)
create: create a new pet !! addToUser should be called automatically
edit: update a certain field of a certain pet with a value
destroy: delete a pet !! message to user when pet only removed but not deleted

POSTS => all tests passing
index: all posts => to show in newsfeed
show: one post by id
showPostsByUser: to display all of the user's posts on his profile page
create: create a new post !! image / video / null
edit: update text or author of a certain post with a value
destroy: delete a post !! if post not exists => handle undefined

COMMENTS => all tests passing
index: all comments (active and deleted users)
show: one comment by id => ? (not for deleted users)
showCommentsByPost: returns all comments related to a specific post (active and deleted users)
create: create a new comment
edit: update the text field of a certain comment with a value
destroy: delete a comment

LIKES => all tests passing
index: all likes (active and deleted users)
showLikesByPost: returns all likes related to a specific post => arr.length & list usernames (active and deleted users)
create: create a new like - LIKE
destroy: delete a like - UNLIKE
