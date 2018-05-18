const {expect} = require('chai');
const {afterEach, describe, it} = require('mocha');
const mongoose = require('mongoose');

const schemaPathsGetter = require('./');

const definition = {
  title : String,
  author : String,
  ISBN : String,
  price : Number
};

afterEach(() => {
  // clear the model registry after every test,
  // to avoid OverwriteModelError
  mongoose.models = {};
});

describe('Get Paths', function () {
  it('should get all paths', () => {
    const BookSchema = new mongoose.Schema(definition);
    BookSchema.plugin(schemaPathsGetter);
    const Book = mongoose.model('Book', BookSchema);
    const book = new Book({/* book data */});
    const paths = book.getPaths();
    expect(paths).to.have.members(['title', 'author', 'ISBN', 'price']);
  });

  it('should exclude `ISBN`', () => {
    const exclude = 'ISBN'; // String
    const BookSchema = new mongoose.Schema(definition);
    BookSchema.plugin(schemaPathsGetter, {exclude});
    const Book = mongoose.model('Book', BookSchema);
    const book = new Book({/* book data */});
    const paths = book.getPaths();
    expect(paths).to.have.members(['title', 'author', 'price']);
    expect(paths).to.not.have.members(['ISBN']);
  });

  it('should exclude `ISBN` and `price`', () => {
    const exclude = ['ISBN', 'price']; // Array
    const BookSchema = new mongoose.Schema(definition);
    BookSchema.plugin(schemaPathsGetter, {exclude});
    const Book = mongoose.model('Book', BookSchema);
    const book = new Book({/* book data */});
    const paths = book.getPaths();
    expect(paths).to.have.members(['title', 'author']);
    expect(paths).to.not.have.members(['ISBN', 'price']);
  });

  it('should use custom method name', () => {
    const method = 'getProperties';
    const BookSchema = new mongoose.Schema(definition);
    BookSchema.plugin(schemaPathsGetter, {method});
    const Book = mongoose.model('Book', BookSchema);
    const book = new Book({/* book data */});
    const paths = book[method]();
    expect(paths).to.have.members(['title', 'author', 'ISBN', 'price']);
  });
});
