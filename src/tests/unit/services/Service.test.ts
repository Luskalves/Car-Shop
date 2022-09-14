import { expect } from 'chai';
import sinon from 'sinon';
import { carZodSchema, ICar } from '../../../interfaces/ICar';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { CarMock, CarMockWithId } from '../mocks/CarMock';


describe('ServiceTests', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);

  describe('CarService', () => {
    beforeEach(() => {
      // sinon.stub(carService, 'create').resolves(CarMock);
    })

    afterEach(() => {
      sinon.restore();
    })

    it('Testando quando envia para o model uma requisição válida', async () => {
      sinon.stub(carModel, 'create').resolves(CarMockWithId);

      const newCar = await carService.create(CarMock);

      expect(newCar).to.be.deep.equal(CarMockWithId);
    });

    it('Testando quando uma requisição é inválida', async () => {
      sinon.stub(carZodSchema, 'safeParse').rejects();
      let err: any;

      try {
        await carService.create(CarMock);
      } catch (error) {
        err = error;
      };

      expect(err.message).to.be.equal('Bad Request')
    });
  })
})