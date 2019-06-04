import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
import * as Sinon from 'sinon';
import {db} from '../../app';
import { Department } from '../models/Department';
import {
    addDepartment,
    deleteDepartment, getCategoryDepartmentMenu,
    getDepartment,
    getDepartmentMenu,
    getDepartments,
    updateDepartment
} from '../modules/departments.module';

chai.use(chaiAsPromised);
chai.should();
describe('Departments module', function () {
    let stub;
    const results: Department[] = [{idDepartment: 0, contacts: 'contacts', description: 'descr', place: 'place'}];
    beforeEach(function() {
        stub = Sinon.stub(db, 'query');
    });

    afterEach(() => {
        stub.restore();
    });
    it('getDepartments should return correct data', function () {
        stub.withArgs('SELECT * FROM Departments').returns(Promise.resolve(results));
        return getDepartments().should.eventually.become(results);
    });
    it('getDepartment should return correct data', function () {
        stub.withArgs(`SELECT * FROM Departments WHERE idDepartment = 0`).returns(Promise.resolve(results));
        return getDepartment(0).should.eventually.become(results);
    });
    it('deleteDepartment should return correct data', function () {
        stub.withArgs(`DELETE FROM Departments WHERE idDepartment = 0`).returns(Promise.resolve(results));
        return deleteDepartment(0).should.eventually.become(results);
    });
    it('addDepartment should return correct data', function () {
        const args = [results[0].place, results[0].contacts, results[0].description];
        stub.withArgs('INSERT INTO Departments (`place`,' +
        ' `contacts`,' +
        ' `description`) VALUES (?)', [args]).returns(Promise.resolve(results[0].idDepartment));
        return addDepartment(results[0]).should.eventually.become(results[0].idDepartment);
    });
    it('updateDepartment should return correct data', function () {
        const args = [results[0].place, results[0].contacts, results[0].description];
        stub.withArgs('UPDATE Departments' +
          ' SET' +
          ' `place` = ?,' +
          ' `contacts` = ?,' +
          ' `description` = ? ' +
          'WHERE `idDepartment` =' + results[0].idDepartment + ';', args).returns(Promise.resolve(results[0].idDepartment));
        return updateDepartment(results[0]).should.eventually.become(results[0].idDepartment);
    });
    it('getDepartmentMenu with password should call correct sql', function () {
        stub.withArgs(`SELECT
    Menu.isIncluded,
    Menu.cost,
    Dishes.idDish,
    Dishes.name,
    Dishes.idPhoto,
    Dishes.description,
    Dishes.prepareTime,
    Dishes.Categories_idCategory
FROM
    Menu
        LEFT JOIN
    Dishes ON Dishes_idDish = Dishes.idDish
WHERE
    Menu.Departments_idDepartment =  0;`).returns(Promise.resolve(results[0]));
        return getDepartmentMenu(results[0].idDepartment).should.eventually.become(results[0]);
    });

    it('getCategoryDepartmentMenu without password should call correct sql', function () {
        stub.withArgs(`SELECT
    Menu.isIncluded,
    Menu.cost,
    Dishes.idDish,
    Dishes.name,
    Dishes.idPhoto,
    Dishes.description,
    Dishes.prepareTime,
    Dishes.Categories_idCategory
FROM
    Menu
        LEFT JOIN
    Dishes ON Dishes_idDish = Dishes.idDish
WHERE
    Menu.Departments_idDepartment =  0 AND Dishes.Categories_idCategory = 1;`).returns(Promise.resolve(results[0]));
        return getCategoryDepartmentMenu(results[0].idDepartment, 1).should.eventually.become(results[0]);
    });
});
