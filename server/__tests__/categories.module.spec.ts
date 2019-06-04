import {Category} from '../models/Category';
import {addCategory, deleteCategory, getCategories, getCategory, updateCategory} from '../modules/categories.module';
import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import {db} from '../../app';

chai.use(chaiAsPromised);
chai.should();
describe('Categories module', function () {
  let stub;
  beforeEach(function() {
    stub = Sinon.stub(db, 'query');
  });

  afterEach(() => {
    stub.restore();
  });
  it('getCategories should return correct data', function () {
    const name = 'john doe';
    const results: Category[] = [{idCategory: 0, name: name, idPhoto: '1', description: 'descr'}];
    stub.withArgs('SELECT * FROM Categories').returns(Promise.resolve(results));
    return getCategories().should.eventually.become(results);
  });
  it('getCategory should return correct data', function () {
    const name = 'john doe';
    const results: Category[] = [{idCategory: 0, name: name, idPhoto: '1', description: 'descr'}];
    stub.withArgs('SELECT * FROM Categories WHERE idCategory = 0').returns(Promise.resolve(results));
    return getCategory(0).should.eventually.become(results);
  });
  it('deleteCategory should return correct data', function () {
    const name = 'john doe';
    const results: Category[] = [{idCategory: 0, name: name, idPhoto: '1', description: 'descr'}];
    stub.withArgs('DELETE FROM Categories WHERE idCategory = 0').returns(Promise.resolve(results));
    return deleteCategory(0).should.eventually.become(results);
  });
  it('addCategory should return correct data', function () {
    const name = 'john doe';
    const results: Category[] = [{idCategory: 0, name: name, idPhoto: '1', description: 'descr'}];
    const args = [results[0].name, results[0].idPhoto, results[0].description];
    stub.withArgs('INSERT INTO Categories (`name`,' +
      ' `idPhoto`,' +
      ' `description`) VALUES (?)', [args]).returns(Promise.resolve(results[0].idCategory));
    return addCategory(results[0]).should.eventually.become(results[0].idCategory);
  });
  it('updateCategory should return correct data', function () {
    const name = 'john doe';
    const results: Category[] = [{idCategory: 0, name: name, idPhoto: '1', description: 'descr'}];
    const args = [results[0].name, results[0].idPhoto, results[0].description];
    stub.withArgs('UPDATE Categories' +
      ' SET' +
      ' `name` = ?,' +
      ' `idPhoto` = ?,' +
      ' `description` = ? ' +
      'WHERE `idCategory` = ' + results[0].idCategory + ';', args).returns(Promise.resolve(results[0].idCategory));
    return updateCategory(results[0]).should.eventually.become(results[0].idCategory);
  });
});
