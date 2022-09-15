import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { ICar } from '../../../interfaces/ICar';
import { CarMock } from '../mocks/CarMock';


describe('CarModel testes', () => {
  const modelCar = new CarModel();

  describe('Create', () => {
    beforeEach(() => {
      sinon.stub(modelCar, 'create').resolves(CarMock)
    })

    after(() => {
      sinon.restore();
    });

    it('Testando se um novo carro é cadastrado', async () => {
      const newCar = await modelCar.create(CarMock);

      expect(newCar).to.deep.equal(CarMock);
    });
  });

  describe('read', () => {
    beforeEach(() => {
      sinon.stub(modelCar, 'read').resolves([CarMock]);
      sinon.stub(modelCar, 'readOne').resolves(CarMock);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('verificando se o read retorna um array', async () => {
      const result = await modelCar.read();

      expect(result).to.be.deep.equal([CarMock]);
    });
  })
})
