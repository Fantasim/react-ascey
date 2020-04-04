import _ from 'lodash'
import Model from './model'

type Constructor<T> = new(...args: any[]) => T;

//  i) this class can be improved by adding more than you can usually find in lists.
//It aims to be the parent of any model class representing a list of object/classes
//for example in a todolist it would be the parent of the TodoList class containing a list of Todos
//This can be useful to avoid redundant functions like sorting, filtering, pushing, deleting, updating etc...

export default class Collection extends Model  {
    private nodeClass: Constructor<any>

    constructor(list: any[] = [], nodeClass: Constructor<Model>){
        super([])
        this.nodeClass = nodeClass
        this.set(this.toListClass(list))
    }

    //Return the number of element in the array
    public count = (): number => this.get().length

    /*
        Transform an array of object into an array of instancied Model
        Exemple => 
        [{content: '123', id: 'abc'}, {content: '456', id: 'def'}]
        to
        [new Model(content: '123', id: 'abc'}), new Model({content: '456', id: 'def'})]
        the class used to instance the objects is the one passed in parameters as nodeClass in the constructor.

    */
    public toListClass = (elem: any[] = []): Model[] => {
        let ret: Model[] = []
        for (let i = 0; i < elem.length; i++)
            if (!(elem[i] instanceof this.nodeClass)) {
                ret.push(new this.nodeClass(elem[i]))
            } else {
                ret.push(elem[i])
            }
        return ret
    }

    //add an element to the list
    public post = (v: Model) => this.get().push(v)

    // Update the element at index or post it.
   public put = (v: Model, index: number) => {
       if (this.get()[index]){
           this.get()[index] = v
       } else {
           this.post(v)
       }
   }

    //return a sorted array upon the parameters passed. see: https://lodash.com/docs/4.17.15#orderBy
    public orderBy = (iteratees: any[] = [], orders: any[] = []): any[] => {
        const ret = _.orderBy(this.toPlain(), iteratees, orders)
        return this.toListClass(ret)
    }

    //pick up a list of node matching the predicate. see: https://lodash.com/docs/4.17.15#filter
    public filter = (predicate: any) => this.toListClass(_.filter(this.toPlain(), predicate))
    
    //find the first node matching the predicate see: https://lodash.com/docs/4.17.15#find
    public find = (predicate: any) => {
        const o = _.find(this.toPlain(), predicate)
        if (o){
            return new this.nodeClass(o)
        }
        return o
    }

    //return the index of the first element found matching the predicate. see https://lodash.com/docs/4.17.15#findIndex
    public findIndex = (predicate: any): number => _.findIndex(this.toPlain(), predicate)

    //delete all the nodes matching the predicate. see https://lodash.com/docs/4.17.15#remove
    public deleteAll = (predicate: any) => _.remove(this.toPlain(), predicate)

    //delete a node if it exists in the list.
    public delete = (v: Model) => {
        const index = this.getIndex(v)
        index > -1 && this.get().splice(index, 1)
    }

    //return the index of the element passed in parameters if it exists in the list.
    public getIndex = (v: Model): number => _.findIndex(this.toPlain(), v.get())

}