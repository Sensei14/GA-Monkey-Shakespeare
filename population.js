class Population{
     //make a population
    constructor(target, popSize, mutationRate){
      this.population = []
      this.target = target;
      this.matingPool = [];
      this.perfectScore = 1;
      this.finished = false;
      this.best;
      this.generation = 1;
      this.mutationRate = mutationRate;
      for(var i=0; i<popSize; i++){
        this.population[i] = new DNA(target.length);
        //each member of population has a DNA
      }
    }
  
  calcFitness(){
    for(var i=0; i<this.population.length; i++){
      this.population[i].calcFitness(this.target);
    }
  }
  
  selection(){
    //making an Array of potential parents
    //for new members of population
    //higher fitness score = higher chance to be picked
    //as a parent for new child
    this.matingPool = [];
    let maxFitness = 0;
    for(var i=0; i<this.population.length; i++){
      if(this.population[i].fitness > maxFitness) {
       maxFitness = this.population[i].fitness 
       
      }
    }
    for(var i =0; i<this.population.length; i++){
       let fitness = map(this.population[i].fitness, 0, maxFitness, 0,1) 
       let n = floor(fitness*100);
      for(var j=0; j<n; j++){
         this.matingPool.push(this.population[i]); 
      }
        
    }
  }
  
  evolve(){
      // picking two members of population to be parents
      // members that have higher fitness score have more 
      // chance to be chosen as a parents
      
    for(var i=0; i<this.population.length; i++){
     let a = floor(random(this.matingPool.length))
     let b = floor(random(this.matingPool.length)) 
     let parentA = this.matingPool[a]
     let parentB = this.matingPool[b]
     
     //combine DNA of both parents and make a child
     //then mutate child DNA
     let child = parentA.crossover(parentB);
     child.mutate(this.mutationRate);
     this.population[i] = child;
    }
    this.generation++;
  }
  
  evaluate(){
    let record = 0.0;
    let index = 0;
    //evaluating best member of current generation
    
    for(var i=0;i<this.population.length; i++){
       if(this.population[i].fitness > record){
        index = i;
         this.best = this.population[i]
         record = this.population[i].fitness
       }
    }
    
    this.best = this.population[index].genes
    
    //checking if target is reached
    if(record == this.perfectScore){
     this.finished = true; 
    }
  }
  
  
  getBest(){
   return this.best.join("") 
  }
  
  
  isFinished() {
    return this.finished;
  }
  
  getGeneration(){
   return this.generation 
  }
  
  allPhrases() {
    let everything = "";
    let displayLimit = min(this.population.length, 50);
    for (let i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + "<br>";
    }
    return everything;
  }
  
  
  
}