
<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://siasky.net/BAA8tXYO7Ec4f7wEvKPYwM-L-paOU3ZZlcDnucQA2yh4Vg" width="100%">
  </a>
+ Control. | - Code. | + Scalability. | - Debugging. | + Productivity.
</p>

<br />


# Ascey - A React State Manager.

#### Ascey is Model oriented state manager for React apps.

It enables an organized and scalable architecture thanks to the centralization of data and their utilities (getter, setter, formatter) inside **Models** (objects) and **Collections** (list of Models). **One time**, **One place**. 🏴‍☠️

Acey helps your code to stay **organized**, **scalable**, and easy to keep **clean**. 🌱

<br />

## Get started

### Installation

```
npm i acey
```
or
```
yarn add acey
```
<br />

# Ascey - Core.

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/6phvTVrv/map.png" width="100%">
  </a>
</p>


## Documentation

### Table of contents
* [Model](#model)
* [Collection](#collection)

<br />

## Model

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/ZnmTKcNB/model.png" width="100%">
  </a>
</p>


#### prototype: `class Model` 🌿

A Model is a class built with an **object of data**. 
It allows you to **create** all the **methods** you need related to a specific type of data like **util**, **getter** (selector), and **setter** functions

You build a Model from a data object.

#### Example of a Model:
`./src/ascey/models/todo.ts`
```ts
import { Model } from 'react-ascey'
import moment from 'moment'

/*
    1. Create a default data object for our Model
   /!\ Must always be an object. /!\
*/
const DEFAULT_DATA = {
    content: '',
    created_at: new Date()
}

class TodoModel extends Model {

    constructor(todo = DEFAULT_DATA){
        super(todo)
    }

    getContent = () => this.get().content
    getCreatedAt = () => this.get().created_at
    
    getCreatedAtLTS = () => moment(this.getCreatedAt()).format('LTS')
}

export default TodoModel
```

#### Model native methods: 
- `get = (): Object` : return the state of the model.
- `set = (state: Object)` : set the new state of the model.
- `setState = (obj: Object)` : update the state by assigning the current state with the obj parameter. (like React)
- `run = (action: (newState: any) => void): Object` : Execute the function passed in parameter and then set the new state  with the state from the action function parameter. 
- `deleteKey = (key: string)` : delete the value linked with a key in your state object.
- `copyDeep = (src: Model)` : copy the src into the current state without changing the references of the values nested inside the current model.
- `toPlain = (): Object` : return the state of model as a plain javascript object
- `isCollection = (): boolean` : return true if the Model is a Collection.
- `defaultState = (): any` : return the state of data of the instanciation.

<br />

## Collection

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/hvYp1C0h/collection.png" width="100%">
  </a>
</p>

#### prototype: `class Collection extends Model` 🌳

#### A Collection is a Model that has for state an array of Models. (Example: a Todolist is a Collection of Todo Models.)

You build a collection with :
1. An array of Models or Objects.
2. A non-instanced Model class that represents the Model of the elements in the array.

#### Example of a Collection:
`./src/ascey/collections/todo.ts`
```ts
import { Collection } from 'react-ascey'
import TodoModel from '../models/todo'

/*
    1. Create a default data object for our Collectiono
   /!\ Must always be an array. /!\
*/
const DEFAULT_DATA = []

class TodoCollection extends Collection {

    constructor(list: any = DEFAULT_DATA){
        super(list, TodoModel)
    }

    sortByCreateDate = (sortType: any = 'asc' || 'desc') => {
        /*
            - orderBy sort the list by data and return an array
            of model.
            - We return a fresh instance of a collection with the array
            returned by orderBy
        */
        return new TodoCollection(
            this.orderBy(['created_at'], [sortType])
        )
    }
}

export default TodoCollection
```

There is room for other methods; please feel free to open a pull request if you want to add other useful methods.

#### Collection native methods :
- `count = (): number` - Return the length of the array
- `toListClass = (elem: any[]): Model[]` - Transform an object array into an instanced Model array.
- `push = (v: Model)` - Add an element in the array
- `update = (v: Model, index: number)` - Update the model at index with the one passed in parameter
- `pop = ()` - Remove the last element
- `shif = ()` - Remove the first item
- `map = (callback: (v: Model, index: number) => any)` - creates a new array with the results of calling a function for every array element (same than javascript map on arrays)
- `orderBy = (iteratees: any[], orders: any[]): Model[]` - Return a sorted array of instanced Model upon the parameters passed
- `filter = (predicate: any): Model[]` - Pick up a list of node matching the predicate
- `find = (predicate: any): Model | undefined` - Find the first node matching the predicate
- `findIndex = (predicate: any): number` - Return the index of the first node matching the predicate
- `deleteAll = (predicate: any)` - Delete all the nodes matching the predicate
- `delete = (v: Model)` - Delete the model passed in parameter in the list.
- `deleteIndex = (index: number)` - Remove an element at index.
- `getIndex = (v: Model): number` - Get the index of a node in the list.

#### + the ones from Model :
- `get = (): Object` : return the state of the model.
- `set = (state: Object)` : set the new state of the model.
- `run = (action: (newState: any) => void): Object` : Execute the function passed in parameter and then set the new state  with the state from the action function parameter. 
- `copyDeep = (src: Model)` : copy the src into the current state without changing the references of the values nested inside the current model.
- `toPlain = (): Object` : return the state of model as a plain javascript object
- `defaultState = (): any` : return the state of data of the instanciation.

<br />

## connect with Component

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/GhcyXPfm/component.png" width="100%">
  </a>
</p>


<br />

# Questions / Answers

<p align="center" font-style="italic" >
  <a>
    <img alt="react-ascey" src="https://i.postimg.cc/FsgFwdSL/band.png" width="100%">
  </a>
</p>

#### All the example are in Typescript, does the library works with Javascript?
Yes, it does! The library is written in Typescript, but you can use Acey if you are writing a React app in JS.
