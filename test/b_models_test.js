"use strict";

const _      = require('lodash');
const expect = require('unexpected');
const bcrypt = require('bcrypt');

const User = require('../app/models/user');
const Posts = require('../app/models/post');
const Comments = require('../app/models/comment');

const db = require('../app/db/bookshelf');

let mockUser = {
  name: 'Sally Low',
  username: 'sally',
  email: 'sally@example.org',
  password: 'password',
};

let mockPost = {
  title: 'My Test Post',
  body: 'This is just a test post with no real content.',
};

let mockComment = {
  body: 'This is a test comment.',
};

const checkHash = (hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(mockUser.password, hash, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
};


describe('Models', () => {

  let transaction;

  beforeEach((done) => {
    return db.transaction((trx) => {
      transaction = trx;
      return done();
    }).catch(err => { return; });
  });

  afterEach(() => {
    transaction.rollback().then(() => {
    }).catch(err => { return; });
  });

  it('User models exist', (done) => {
    expect(User, 'to be defined');
    done();
  });

  it('User model can save a user', (done) => {
    User
      .forge()
      .save(mockUser, {transacting: transaction})
      .catch((err) => { done(err) })
      .then((usr) => {
        expect(usr.attributes, 'to have keys', [
          'name',
          'email',
          'username',
          'password',
        ]);
        expect(usr.get('name'), 'to be', mockUser.name);
        expect(usr.get('email'), 'to be', mockUser.email);
        expect(usr.get('username'), 'to be', mockUser.username);
        checkHash(usr.get('password')).then((result) => {
          expect(result, 'to be', true);
          mockUser.id = usr.get('id');
          done();
        }).catch(err => { done(err); });
      });
  });

  it('Posts model exists', (done) => {
    expect(Posts, 'to be defined');
    done();
  });

  it('Posts model can save a post', (done) => {
    mockPost.author = mockUser.id;
    User
      .forge()
      .save(mockUser, {transacting: transaction})
      .catch((err) => { done(err); })
      .then((usr) => {
        mockPost.author = usr.id;
        return Posts
          .forge()
          .save(mockPost, {transacting: transaction});
      })
      .then((post) => {
        expect(post.attributes, 'to have keys', [
          'title',
          'body',
          'id',
          'author',
        ]);
        done();
      });
  });

  it('Comments model exists', () => {
    expect(Comments, 'to be defined');
  });

  it('Comments model can save a comment on a post', (done) => {
    mockComment.post_id = mockPost.id;
    mockComment.user_id = mockUser.id;
    User
      .forge()
      .save(mockUser, {transacting: transaction})
      .then((usr) => {
        return Promise.all([
          usr,
          Posts
            .forge()
            .save(mockPost, {transacting: transaction})
        ]);
      })
      .then((values) => {
        mockComment.post_id = values[1].id;
        mockComment.user_id = values[0].id;
        Comments
          .forge()
          .save(mockComment, {transacting: transaction})
          .then((comment) => {
            expect(comment.attributes, 'to have keys', [
              'id',
              'user_id',
              'post_id',
              'body',
              'created_at',
              'updated_at',
            ]);
            done();
          });
      });
  });

});
