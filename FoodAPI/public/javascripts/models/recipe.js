class recipe {
  constructor (name, ingredients, keywords, description) {
  	this.name = name;
    this.ingredients = ingredients; //array of ingredients
    this.keywords = keywords;
    this.description = description;
    this._generateKeywords()
  }

  _generateKeywords() {
    let currentObject = this;

    this.ingredients.forEach(function(item) {
      item.keywords.forEach(function (keyword) {
          currentObject.keywords.push(keyword);
      })
    });

  }

  matchKeyword(word) {
    return this.keywords.includes(word);
  }

  toJSON () {
    return {
      'name': this.name,
      'ingredients': this.ingredients,
      'keywords': this.keywords,
      'description': this.description
    };
  }

}

module.exports = recipe;

