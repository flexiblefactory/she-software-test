import EntitySet from './EntitySet';
import { decorate, observable, computed, action } from "mobx"
import { withDescendants } from './withDescendants';

const byDate = (a, b) => a.datetime < b.datetime
const incident = { category: null, description: '', person: '', datetime: new Date().toJSON() }
const category = { label: '', parent: null }
const rootCat = { id: null, label: 'All incidents' }

class AppState {

  items = new EntitySet('incident')
  cats = new EntitySet('category')

  selectedCategoryId = null;
   
  newIncident = incident
  newCategory = category
  editIncident = incident
  editCategory = category
  rootCat = rootCat

  constructor(){
    this.cats.items.set(rootCat.id, rootCat)
  }

  get selectedCategory(){
    return this.cats.findById(this.selectedCategoryId)
  }

  get itemsInSelectedCategory() {
    if (!this.selectedCategory.id) return this.items.all.sort(byDate)
    return this.items.all
      .filter(i => this.descendantsAndSelf.has(i.category))
      .sort(byDate)
  }

  get descendantsAndSelf(){
    const selectedCategoryWithDescendants = withDescendants(this.selectedCategory, this.cats).map(c=>c.id)
    return new Set(selectedCategoryWithDescendants)
  }

  get allowedParentsForSelectedCategory() {
    //we don't want to be able to create cyclic structures
    return this.cats.all.filter(c => !this.descendantsAndSelf.has(c.id))
  }

  selectCategory(cat) {
    this.selectedCategoryId = cat.id;
    this.newIncident = { ...this.newIncident, category: cat.id, label: '' }
  }

  saveNewCategory(){
    if (!this.newCategory.label) return;
    this.cats.post({ label: this.newCategory.label, parent: this.newCategory.parent ? parseInt(this.newCategory.parent) : null });
    this.newCategory = { ...this.newCategory, label: '' }
  }

  saveNewIncident(){
    this.items.post({
      ...this.newIncident,
      category: this.newIncident.category ? parseInt(this.newIncident.category) : null
    });
  }

  clearNewIncident(){
    this.newIncident = { ...incident, datetime: new Date().toJSON(), category: this.selectedCategoryId }
  }

  removeIncident(incident) {
    this.items.delete(incident);
  }

  setEditIncident(incident){
    this.editIncident = { ...incident }
  }
  saveEditedIncident(){
    this.items.patch(this.editIncident)
  }

  editSelectedCategory(){
    this.editCategory = { ...this.selectedCategory }
  }

  saveEditedCategory(){
    this.cats.patch(this.editCategory)
  }

  removeSelectedCategory() {
    this.cats.delete(this.selectedCategory);
    this.selectedCategoryId = null
  }
}

export default decorate(AppState, {
  selectedCategory: computed,
  selectedCategoryId: observable,
  itemsInSelectedCategory: computed,
  allowedParentsForSelectedCategory: computed,
  descendantsAndSelf: computed,
  newIncident: observable,
  newCategory: observable,
  editIncident: observable,
  editCategory: observable,
  rootCat: observable,
  selectCategory: action.bound,
  saveNewCategory: action.bound,
  saveNewIncident: action.bound,
  clearNewIncident: action.bound,
  removeIncident: action.bound,
  setEditIncident: action.bound,
  saveEditedIncident: action.bound,
  editSelectedCategory: action.bound,
  saveEditedCategory: action.bound,
  removeSelectedCategory: action.bound,
})