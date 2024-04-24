const hashmap = () =>{
    const hashMapLength = 16;
    const loadFactor = 3 / 4
    return {
        buckets:Array(hashMapLength).fill([]),
        keys:[],
        values:[],
        hash(key){
            let hashCode = 0;
      
            const primeNumber = 31;
            for (let i = 0; i < key.length; i++) {
              hashCode = (primeNumber * hashCode + key.charCodeAt(i) ) % 16;
            }
         
            return hashCode;         
        },
        set(key, value){
            const bucketIndex = this.hash(key)

            this.buckets[bucketIndex] = {hashCode: bucketIndex, key, value}
        },
        get(key){
            const bucketIndex = this.hash(key)

            return this.buckets[bucketIndex].value
        },
        has(key){
            const bucketIndex = this.hash(key)

            return this.buckets[bucketIndex].value != undefined
        },
        clear(){
            this.buckets = Array(hashMapLength).fill([])
            this.keys = []
            this.values = []
            this.length = 0

        },
        remove(key){
            const bucketIndex = this.hash(key)

            this.buckets[bucketIndex] = []
        },
        getLength(){

        },
        getValues(){

        },
        getKeys(){

        },
        getEntries(){
            
        }

    }
}

const myHashMap = hashmap()

myHashMap.set('John', 12)
myHashMap.set('Jake', 13)
myHashMap.set('Mary', 124)
myHashMap.set('Chloe', 1324)
myHashMap.set('Ahmed', 1224)

console.log(myHashMap.buckets)