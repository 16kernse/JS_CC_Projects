// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// factory function for the pAequorObject
const pAequorFactory = (num, DNAarr) => {
  return {
    'specimenNum': num,
    'dna': DNAarr,
    // randomly changes one of the 15 bases in the dna array.
    mutate: function() {
      i = Math.floor(Math.random() * 15);
      base = this.dna[i]
      while (base === this.dna[i]) {
        base = returnRandBase();
      }
      this.dna[i] = base;
    },
    compareDNA: function(otherPAequor) {
      counter = 0;
      for (let i = 0; i < 15; i++) {
        if (this['dna'][i] === otherPAequor['dna'][i]) {
          counter++;
        }
      }
      return counter;
      // console.log(`specimen #${this['specimenNum']} and specimen #${otherPAequor['speciesNum']} ${(counter / 15 * 100).toFixed(2)}%  DNA in common`);
    },
    willLikelySurvive: function() {
      let counter = 0
      for (let base of this.dna) {
        if (base === 'C' || base === 'G') {
          counter++;
        }
      }
      if (counter > 8) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand: function() {
      let compStrand = [];
      for (let base of this['dna']) {
        if (base === 'A') {
          compStrand.push('T')
        } else if (base === 'T') {
          compStrand.push('A')
        } else if (base === 'C') {
          compStrand.push('G')
        } else if (base === 'G') {
          compStrand.push('C')
        }
      }
      return compStrand;
    }
  }
}


// let PA1 = pAequorFactory(1, mockUpStrand());
// let PA2 = pAequorFactory(2, mockUpStrand());
// console.log(PA1);
// console.log(PA2);

// console.log(PA1.complementStrand());

// PA1.compareDNA(PA2);

// console.log(PA1.willLikelySurvive());


const PAArray = [];
const thirtyPA = () => {
  while (PAArray.length < 30) {
    let subject = pAequorFactory(PAArray.length + 1, mockUpStrand())
    if (subject.willLikelySurvive() === true ) {
      PAArray.push(subject);
    }
  }
}


thirtyPA();

const closestMatch = arr => {
  let fullList = []
  let highestList = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j< arr.length; j++) {
      if (i === j) {
        continue
      } else {
        fullList.push([arr[i].compareDNA(arr[j]), `Number ${arr[i]['specimenNum']}`, `Number ${arr[j]['specimenNum']}`]);
      }
    }
  }
  let counter = 0
  for (let ent of fullList) {
    let iteration = 0
    iteration = ent[0]
      if (iteration < counter) {
        continue;
      } else if (iteration === counter) {
        highestList.push(ent);
      } else if (iteration > counter) {
        counter = iteration
        highestList = [];
        highestList.push(ent);
      }
  }
  console.log(`The P. aequor with the most similar DNA share a whopping ${(counter / 15 * 100).toFixed(2)}% of their dna. the pairs can be found below:`);
  console.log(highestList);
}

closestMatch(PAArray);