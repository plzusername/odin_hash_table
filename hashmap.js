const linkedList = require('../odin_linked_list/linkedLists')

const node = (value = null, next = null) =>{
    return {
        value,
        next
    }
}

function fillInBuckets(size){
    const hashBuckets = []

    for (let i = 0; i < size; i++) {
        hashBuckets.push(linkedList())
    }

    return hashBuckets
}

const hashmap = () =>{
    const hashLength = 16;
    const bucketsTemplate = fillInBuckets(hashLength)
    return {
        hashMapLength:hashLength,
        unavailableBuckets:0,
        propertiesLength:0,
        entries:[],
        buckets:bucketsTemplate,
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
            const linkedItemProperties = {key,value}
            const listNode = node(linkedItemProperties)
            const list = this.buckets[bucketIndex]

            if(list.containsNode(linkedItemProperties.key, 'key').exists){
                list.containsNode(linkedItemProperties.key, 'key').node.value.value = value
                this.entries.find(entry => entry[0] == key)[1] = value
                return 
            }

            this.propertiesLength += 1
            this.unavailableBuckets += 1
            this.entries.push([key, value])
            list.listPrepend(listNode)

            if(this.unavailableBuckets / this.hashMapLength >= 3 / 4){
                for (let i = 0; i < this.hashMapLength; i++) {
                    this.buckets.push(linkedList())
                }
                    this.hashMapLength *= 2
            }
        },
        get(key){
            const bucketIndex = this.hash(key)
            const list = this.buckets[bucketIndex]

            return list.containsNode(key, 'key') == false ? null : list.containsNode(key, 'key').node.value.value
        },

        has : (key) =>  this.get(key) == null ? false : true ,

        clear(){
            this.hashMapLength = 16
            this.propertiesLength = 0
            this.keys = []
            this.values = []
            this.buckets = []
        },
        remove(key) {
            const bucketIndex = this.hash(key);
            const list = this.buckets[bucketIndex];
        
            let prev = null;
            let current = list.headNode;

            let lastCurrent = list.headNode
        
            while (current) {
                if (current.value.key === key) {
                    if (prev === null) {
                        list.headNode = current.next;
                    } else {
                        prev.next = current.next;
                    }
                    const removedEntry = this.entries.find(entry => entry[0] == key)

                    this.entries.splice(this.entries.indexOf(removedEntry),1)
                    this.propertiesLength--;
                    break;
                }
                prev = current;
                current = current.next;
            }

            while(lastCurrent){
                if(lastCurrent.next == null){
                    list.tailNode = lastCurrent
                }
                lastCurrent = lastCurrent.next
            }
        },
        getKeys() {
            return this.entries.map(entry => entry[0]);
        },
        getValues() {
            return this.entries.map(entry => entry[1]);
        },
        getEntries() {
            return this.entries;
        },
        getLength(){
            return this.propertiesLength
            
        }



    }
}

const myHashMap = hashmap()

myHashMap.set('John', 83)
myHashMap.set('Mary', 81)
myHashMap.set('Msdfary', 81)
myHashMap.set('Maffry', 81)
myHashMap.set('Mafsdfry', 81)
myHashMap.set('Mary', 81)
myHashMap.set('Mfsdfary', 81)
myHashMap.set('Mafry', 81)
myHashMap.set('Ma5ry', 81)
myHashMap.set('Mdfary', 81)
myHashMap.set('6Marsdfy', 81)
myHashMap.set('M45ary', 81)
myHashMap.set('M6ary', 81)
myHashMap.set('M78ary', 813)

console.log(myHashMap.buckets)