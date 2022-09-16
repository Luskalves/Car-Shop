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

  const req = {
    params: '' as any,
  } as Request;
  const res = {} as Response;

  describe('CarController', () => {

    describe('Get', () => {
      beforeEach(() => {
        sinon.stub(carService, 'read').resolves([CarMockWithId]);
        sinon.stub(carService, 'readOne').resolves(CarMockWithId);
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      });

      afterEach(() => {
        sinon.restore();
      })

      it('Verifica se retorna uma lista de carros', async () => {
        await carController.read(req, res);

        const statusStub = res.status as sinon.SinonStub;
        const jsonStub = res.json as sinon.SinonStub;

        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith([CarMockWithId]));
      });

      it('Verifica se um carro é retornado se passar o id no parametro', async () => {
        await carController.readOne(req, res);

        const statusStub = res.status as sinon.SinonStub;
        const jsonStub = res.json as sinon.SinonStub;

        expect(statusStub.calledWith(200)).to.be.true;
        expect(jsonStub.calledWith(CarMockWithId));
      });
    });

    describe('Post', () => {
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
      });
    })

    describe('Update', () => {
      beforeEach(() => {
        sinon.stub(carService, 'updateOne').resolves(CarMockWithId);
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      });

      it('verifica se um documento é atualizado', async() => {
        req.params = { id: CarMockWithId._id }
        req.body = CarMock;
  
        await carController.update(req, res);
  
        expect((res.status as sinon.SinonStub).calledWith(200));
        expect((res.json as sinon.SinonStub).calledWith(CarMockWithId));
      });
    });
  })
})