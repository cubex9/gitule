export type Supplier<T> = () => T;
export type Consumer<T> = (a: T) => void;
export type Mapper<T,R> = (a: T) => R;
export type Predicate<T> = (a: T) => boolean;

export class Stream<T> {
    private iterable : Iterable<T>;

    constructor(iterable: Iterable<T>) {
        this.iterable = iterable;
    }

    static of<T>(args: T[]): Stream<T> {
        return new Stream<T>(args.values());
    }

    private fromGenerator<T>(generator: any) : Stream<T> {
        return new Stream(generator(this.iterable));
    }

    public filter<T>(predicate : Predicate<T>) : Stream<T> {
        return this.fromGenerator(function* (previous: Iterable<T>) {
           for(let item of previous) {
                if(predicate(item)) {
                    yield item;
                }
            }          
        });
    }

    public map<T,R>(mapper : Mapper<T,R> ) : Stream<R> {
        return this.fromGenerator(function* (previous: Iterable<T>) {
            for (const item of previous) {
                yield mapper(item);
            }
        });
    }

    public toArray() : T[] {
        return [...this.iterable];
    }

    public first() : T | undefined {
        for(let item of this.iterable) {
            return item;
        }
    }

}