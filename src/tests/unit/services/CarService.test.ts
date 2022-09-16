import { expect } from 'chai';
import sinon from 'sinon';
import BadRequest from '../../../errors/customErrors/BadRequest';
import { carZodSchema } from '../../../interfaces/ICar';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { CarMock, CarMockWithId } from '../mocks/CarMock';


describe('ServiceTests', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);


  describe('CarService - read', () => {
    afterEach(() => {
      sinon.restore();
    })

    it('verifica se retorna um array vazio caso o banco retorne null', async () => {
      sinon.stub(carModel, 'read').resolves(undefined);

      const result = await carService.read();

      expect(result).to.be.deep.equal([]);
    })

    it('verificando se read retorna um array', async () => {
      sinon.stub(carModel, 'read').resolves([CarMock]);

      const result = await carService.read();

      expect(result).to.be.deep.equal([CarMock]);
    });

    it('verifica se retorna um carro no readOne', async () => {
      sinon.stub(carModel, 'readOne').resolves(CarMock);

      const result = await carService.readOne('6323720f0f467abc1023d142')

      expect(result).to.be.deep.equal(CarMock);
    })

    it('verifica se um erro é disparado ao receber um id iválido no readOne', async () => {
      let err: any;

      try {
        await carService.readOne('idErrado');
      } catch (e) {
        err = e;
      }

      expect(err.name).to.be.equal('badRequest');
      expect(err.status).to.be.equal(400)
    });

    it('verifica se dispara um erro caso o banco retorne null', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);

      let err:any;

      try {
        await carService.readOne('6323720f0f467abc1023d142');
      } catch (error) {
        err = error;
      }

      expect(err.name).to.be.equal('notFound');
      expect(err.status).to.be.equal(404)
    })
  });

  describe('CarService - create', () => {
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

  describe('CarService - update', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('verifica se um erro é disparado ao passar um id inválido', async () => {
      let err: any;

      try {
        await carService.updateOne('idErrado', {});
      } catch(error) {
        err = error;
      };

      expect(err.name).to.be.equal('badRequest');
      expect(err.status).to.be.equal(400)
    });
    
    it('verifica se um erro é disparado ao passar um objeto inválido', async () => {
      let err: any;

      try {
        await carService.updateOne('6323720f0f467abc1023d142', {});
      } catch (error) {
        err = error;
      };

      expect(err.name).to.be.equal('badRequest');
      expect(err.status).to.be.equal(400)
    });

    it('dispara um erro caso o id não exista', async () => {
      sinon.stub(carModel, 'update').resolves(null);

      let err: any;
      try {
        await carService.updateOne('6323720f0f467abc1023d142', CarMock);
      } catch (error) {
        err = error;
      };

      expect(err.name).to.be.equal('notFound');
      expect(err.status).to.be.equal(404)
    });

    it('Verifica se retorna o objeto com os valores atualizados', async () => {
      sinon.stub(carModel, 'update').resolves(CarMock);

      const update = await carService.updateOne('6323720f0f467abc1023d142', CarMock);

      expect(update).to.be.deep.equal(CarMock);
    })
  })
})