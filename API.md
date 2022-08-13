USERS
index: all users => e.g. filter ??
show: one user by id => to show the logged in users profile
create: create a new user / sign up !! return value is the token
authenticate: sign in / enter username and password
addPetToUser: create a relation between a pet and a user !! how handle when pet already exists ?
edit: update a certain field of a certain user with a value
destroy: delete a user

PETS
index: all pets => e.g. filter by breed ?? OR: showByProp
show: one pet by id => ??
showPetsByUser: to display all of the users pets
create: create a new pet
edit: update a certain field of a certain pet with a value
destroy: delete a pet !! what if pet is connected to several users ?

POSTS
index: all posts => to show in newsfeed
show: one post by id => ??
create: create a new post !! image / video / null

COMMENTS
index: all comments ??
show: one comment by id ??
showCommentsByPost: returns all comments related to a specific post
create: create a new comment

LIKES
index: all likes => ??
showLikesByPost: returns all likes related to a specific post => arr.length & list usernames
create: create a new like
