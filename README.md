Making Our Blog Social (Lab)
============================

## Overview

In this lab, we will transform our blog server into a social platform of sorts.

## Introduction

Blogs, as we know, are powerful platforms for communication, but in the last years what we've seen over and over again is the growth of a new social form on the internet: the social platform. We all use them: facebook, instagram, etc. There are a number of individual features that characterize these platforms, but arguably one of the most central is the ability to follow (and unfollow) users.

What we'll be doing in this lab, then, is building this core social feature into the blogging platform that we've been constructing. The feature is so common as to be cliche, but implementing this feature involves some interesting challenges, so this will be an interesting project.

## Our specification

Wihtout further ado, here's the specification that we must meet:

1. Users can follow other users.
2. Users can unfollow other users.
3. Users can have followers.
4. When the user is logged in, and they load the home page (/), they will see a list of recent posts by users that they follow in desceding order by date.

In addition, as usual, consult the tests in the `/tests` directory for additional specifications 

### Some Considerations

As we begin work on this lab, it will pay to think a bit about the kind of database relationship that we'll need to establish in order to represent the relation of follower and followed. There are, as you may recall, three kinds of relational database relationships:

1. **One-to-one: where one record in table A relates directly to another record in table B. For example, in an Ecommerce site an orders table might have a one-to-one relationship between a shipping address and an addresses table.
2. **One-to-many: where one record in one table A relates to many records in table B. For example, a table of pet owners might have a one-to-many relationship with a table of pets.
3. **Many-to-many: where one record in table A relates to many records in table B, *and* a record in table B may also relate to many records in table A. For example, a table of books many relate to many records in an authors table (because you can have more than one author for a book), at the same time as one author may relate to many records in a books table (because authors frequently write multiple books). This kind of relation is usually achieved by creating a interim table, whose individual rows contain the primary keys from each table in the relation:

[Many-to-many Table Diagram](http://ezmiller.s3.amazonaws.com/public/flatiron-imgs/manytomany.png)

So which one are we going to need for this project? Does one user have many followers? Yep. But also can one user follow many users? Yep also. So this is a many-to-many? Sounds like it. But something else is going on here: in both cases we are talking about a user. The relation is between the table and itself. This is a self-referencing many-to-many relationship.

Ah, so now we see the challenge here. Let's see if you can use Bookshelf to get this working. A word of warning here: we'll need to read the documentation for Bookshelf carefully here. In particular, we should read the documentation for [many-to-many relationships in Bookshelf](http://bookshelfjs.org/#many-to-many), and look closely at the explanations for the following methods: [`belongsToMany()`](http://bookshelfjs.org/#Model-instance-belongsToMany), [`attach()`](http://bookshelfjs.org/#Collection-instance-attach), and [`detach()`](http://bookshelfjs.org/#Collection-instance-detach), and [`related()`](http://bookshelfjs.org/#Model-instance-related).

Okay, good luck!

## Resources
* The Bookshelf documentation: http://bookshelfj.js
* The Knex documentation: http://knexjs.org




