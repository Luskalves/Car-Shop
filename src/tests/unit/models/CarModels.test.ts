import { expect } from 'chai';
import { model, Model } from 'mongoose';
import sinon from 'sinon';
import { ICar } from '../../../interfaces/ICar';
import CarModel from '../../../models/CarModel';
import { CarMock, CarMockWithId } from '../mocks/CarMock';


describe('CarModel testes', () => {
  const modelCar = new CarModel();

  describe('Create', () => {
    beforeEach(() => {
      sinon.stub(Model, 'create').resolves(CarMockWithId)
    })

    after(() => {
      sinon.restore();
    });

    it('Testando se um novo carro é cadastrado', async () => {
      const newCar = await modelCar.create(CarMock);
      expect(newCar).to.be.deep.equal(CarMockWithId);
    });
  });

  describe('read', () => {
    beforeEach(() => {
      sinon.stub(Model, 'find').resolves([CarMockWithId]);
      sinon.stub(Model, 'findById').resolves(CarMockWithId);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('verificando se o read retorna um array', async () => {
      const result = await modelCar.read();

      expect(result).to.be.deep.equal([CarMockWithId]);
    });

    it('verifica se retorna um erro no readOne caso um id inválido seja inválido', async () => {
      let err: any;

      try {
        await modelCar.readOne('idInvalido');
      } catch (error) {
        err = error;
      };

      expect(err.status).to.be.equal(404);
      expect(err.message).to.be.equal('Object not found');
    });

    it('verifica se um objeto é retornado caso um id válido seja passado no readOne', async () => {
      const car = await modelCar.readOne('6323720f0f467abc1023d142');
      
      expect(car).to.be.deep.equal(CarMockWithId);
    });
  });

  describe('Update', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(CarMockWithId);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('verifica se retorna um erro no update caso um id inválido seja inválido', async () => {
      sinon.stub(Model, 'findById').resolves(null);
      let err: any;

      try {
        await modelCar.update('999999999999999999999999', {} as ICar);
      } catch (error) {
        err = error;
      };

      expect(err.status).to.be.equal(404);
      expect(err.message).to.be.equal('Object not found');
    });

    it('verifica se um objeto é retornado caso um id válido seja passado no readOne', async () => {
      sinon.stub(Model, 'findById').resolves(true);
      const car = await modelCar.update('6323720f0f467abc1023d142', {} as ICar);
      
      expect(car).to.be.deep.equal(CarMockWithId);
    });
  });

  describe('Delete', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findByIdAndDelete').resolves(null);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('verifica se retorna um erro no delete caso um id inválido seja inválido', async () => {
      sinon.stub(Model, 'findById').resolves(null);
      let err: any;

      try {
        await modelCar.delete('idInvalido');
      } catch (error) {
        err = error;
      };

      expect(err.status).to.be.equal(404);
      expect(err.message).to.be.equal('Object not found');
    });

    it('verifica se retorna nulo apos um delete com sucesso', async () => {
      sinon.stub(Model, 'findById').resolves(true);

      const result = await modelCar.delete('6323720f0f467abc1023d142');

      expect(result).to.be.equal(null);
    })
  });
})
