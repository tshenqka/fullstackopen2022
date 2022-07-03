const arto = {
    name: 'Shenq Kang',
    age: 35,
    educaion: 'BASc',
    university: 'UWaterloo!',
    doAddition: (a, b) => {console.log(a + b)},
    printSumAge: function(a) {return this.age + a}
}


const referenceToPrint = arto.printSumAge.bind(arto)
console.log(referenceToPrint(10))
