USERS
index: all users => e.g. filter
show: one user by id => ?
create: create a new user / sign up !! return value is the token
authenticate: sign in / enter username and password
addPetToUser: create a relation between a pet and a user !! how handle when pet already exists ?

PETS
index: all pets => e.g. filter by breed
show: one pet by id => ?
create: create a new pet

POSTS
index: all posts => to show in newsfeed
show: one post by id => ?
create: create a new post !! image / video / null

COMMENTS
index: all comments
show: one comment by id
showCommentsByPost: returns all comments related to a specific post
create: create a new comment
