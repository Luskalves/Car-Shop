import { Request, Response } from 'express';
import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { CarMock, CarMockWithId } from '../mocks/CarMock';

describe('Testando os controllers', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  describe('CarController', () => {
    beforeEach(() => {
      sinon.stub(carService, 'create').resolves(CarMockWithId);

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    })

    after(() => {
      sinon.restore();
    });

    it('Testando quando uma requisição é válida', async () => {
      req.body = CarMock;

      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      const jsonStub = res.json as sinon.SinonStub;
      
      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith(CarMockWithId)).to.be.true;
    })
  })
})