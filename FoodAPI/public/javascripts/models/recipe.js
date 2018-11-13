
class recipe {
  constructor (id, name, ingredients, keywords, description) {
    this.id = id
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
    if (this.keywords.includes(word)) {
      return true;
    } else {
      return false;
    }
  }

  toJSON () {
    return {
      'id': this.id,
      'name': this.name,
      'ingredients': this.ingredients,
      'keywords': this.keywords,
      'description': this.description
    };
  }
}

module.exports = recipe;

