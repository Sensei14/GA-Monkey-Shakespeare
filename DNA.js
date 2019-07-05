class DNA{
 
  constructor(numOfGenes){
    //making Array of genes that are random characters
    this.genes = [];
    this.fitness = 0;
    for(var i=0; i<numOfGenes; i++){
     this.genes[i] = newChar(); 
    }
  }
  
  calcFitness(target){
    //calculating fitness score by checking
    //each character of genes
    //checking how many characters of genes fit targets characters
    let score = 0;
    for(var i=0; i<this.genes.length; i++){
     if(this.genes[i] == target.charAt(i)){
        score ++; 
     }
    }
    this.fitness = score / target.length;
  }
  
  crossover(partner){
    //making a child and combining DNA of two parents
   let child = new DNA(this.genes.length)
   let midPoint = floor(random(this.genes.length));
    
    for(var i = 0; i<this.genes.length; i++){
     if(i > midPoint) {
      child.genes[i] = this.genes[i];
     }else{
      child.genes[i] = partner.genes[i]
     }
    }
    return child;
  }
  
  mutate(mutationRate) {
    //mutating DNA by mutationRate
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }
  getPhrase() {
    return this.genes.join("");
  }
}






function newChar() {
  //picking random character and converting it to String
  let c = floor(random(63, 126));
  if (c === 63) c = 32;
  if (c === 64) c = 46;

  return String.fromCharCode(c);
}
 