import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import {db} from '../../app';
import { addDish, deleteDish, getCategoryDishes, getDish, getDishes, getDishIngredients, updateDish } from '../modules/dishes.module';
import { Dish } from '../models/Dish';

chai.use(chaiAsPromised);
chai.should();
describe('Dishes module', function () {
    let stub;
    const results: Dish[] = [{idDish: 0, cost: 12, description: 'descr', name: 'name', } as Dish];
    beforeEach(function() {
        stub = Sinon.stub(db, 'query');
    });

    afterEach(() => {
        stub.restore();
    });
    it('getDepartments should return correct data', function () {
        stub.withArgs(`SELECT Dishes.idDish,
    Dishes.name,
    Dishes.idPhoto,
    Dishes.description,
    Dishes.prepareTime,
    Dishes.Categories_idCategory
FROM db.Dishes;`).returns(Promise.resolve(results));
        return getDishes().should.eventually.become(results);
    });
    it('geDish should return correct data', function () {
        stub.withArgs(`SELECT Dishes.idDish,
    Dishes.name,
    Dishes.idPhoto,
    Dishes.description,
    Dishes.prepareTime,
    Dishes.Categories_idCategory
FROM db.Dishes WHERE idDish = 0;`).returns(Promise.resolve(results));
        return getDish(0).should.eventually.become(results);
    });
    it('getCategoryDishes should return correct data', function () {
        stub.withArgs(`SELECT Dishes.idDish,
    Dishes.name,
    Dishes.idPhoto,
    Dishes.description,
    Dishes.prepareTime,
    Dishes.Categories_idCategory
FROM db.Dishes WHERE Categories_idCategory = 0;`).returns(Promise.resolve(results));
        return getCategoryDishes(0).should.eventually.become(results);
    });

    it('deleteDish should return correct data', function () {
        stub.withArgs(`DELETE FROM Dishes WHERE idDish = 0;`).returns(Promise.resolve(results[0].idDish));
        return deleteDish(0).should.eventually.become(results[0].idDish);
    });
    it('addDish should return correct data', function () {
        const args = [results[0].name, results[0].idPhoto, results[0].description, results[0].prepareTime, results[0].Categories_idCategory];
        stub.withArgs(`INSERT INTO db.Dishes
(name,
idPhoto,
description,
prepareTime,
Categories_idCategory)
VALUES (?);`, [args]).returns(Promise.resolve(results[0].idDish));
        return addDish(results[0]).should.eventually.become(undefined);
    });

    it('getDishIngredients with password should call correct sql', function () {
        stub.withArgs(`SELECT Ingredients.idIngredient,
    Ingredients.name,
    Ingredients.count,
    Ingredients.cost
FROM
    db.Ingredients_has_Dishes
        LEFT JOIN
    Ingredients ON Ingredients_idIngredient = Ingredients.idIngredient
WHERE
    Ingredients_has_Dishes.Dishes_idDish =  0;

`).returns(Promise.resolve(results[0]));
        return getDishIngredients(0).should.eventually.become(results[0]);
    });

    it('updateDish without password should call correct sql', function () {
        const args = [results[0].name, results[0].idPhoto, results[0].description, results[0].prepareTime, results[0].Categories_idCategory];
        stub.withArgs('UPDATE db.Dishes' +
          ' SET' +
          ' `name` = ?,' +
          ' `idPhoto` = ?,' +
          ' `description` = ?,' +
          ' `prepareTime` = ?, ' +
          ' `Categories_idCategory` = ? ' +
          'WHERE `idDish` =' + results[0].idDish + ';', args).returns(Promise.resolve(results[0]));
        return updateDish(results[0]).should.eventually.become(results[0]);
    });
});
