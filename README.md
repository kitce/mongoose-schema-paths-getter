## Installation

#### npm
`npm install mongoose-schema-paths-getter --save`
#### yarn
`yarn add mongoose-schema-paths-getter`

## Usage

```js
const schemaPathsGetter = require('mongoose-schema-paths-getter');
const BookSchema = new mongoose.Schema({
  title : String,
  author : String,
  ISBN : String,
  price : Number
});
BookSchema.plugin(schemaPathsGetter);
const Book = mongoose.model('Book', BookSchema);

const book = new Book({/* book data */});
book.getPaths(); // => ['title', 'author', 'ISBN', 'price'] *** order is not guaranteed ***
```

## Options

### `exclude` (`Array<String>`/`String`)
Exclude the unwanted paths
```js
BookSchema.plugin(schemaPathsGetter, {
  exclude : ['ISBN'] // or just 'ISBN'
});
book.getPaths(); // => ['title', 'author', 'price']
```

### `method` (`String`)
default : `getPaths`

Specify the method name
```js
BookSchema.plugin(schemaPathsGetter, {
  method : 'getProperties'
});
book.getProperties(); // => ['title', 'author', 'ISBN', 'price']
```

## Test

```
yarn install
yarn test
```
