### Route is demo app that shows how to draw lines using google map API with React

### Quick Start

1. Install yarn and build
```bash
$ cd route/ 
$ brew install yarn
$ yarn install
```

2. Specify google map token in `.env` file
 
```bash
$ echo "GOOGLE_MAP_API_TOKEN='YOUR TOKEN HERE'" > .env
```


3. Start the app
```bash
$ yarn start
```


### Customize line colors   

You can customize the line colors within the `Map.js` by updating the `colorMap` function or passing in a react property of the same name.


### Hide lines according to distance

Just update `pathFilter` inside the `Map.js` or pass in a path filter as a react property.
