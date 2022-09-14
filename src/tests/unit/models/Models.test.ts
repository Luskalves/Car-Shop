// template para criação dos testes de cobertura da camada de model


// import * as sinon from 'sinon';
// import chai from 'chai';
// const { expect } = chai;

// describe('Sua descrição', () => {

//   before(async () => {
//     sinon
//       .stub()
//       .resolves();
//   });

//   after(()=>{
//     sinon.restore();
//   })

//   it('', async () => {});

// });

import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car.ts';
import { ICar } from '../../../interfaces/ICar';
import { CarMock } from '../mocks/CarMock';

const modelCar = new CarModel();

describe('CarModel testes', () => {
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
    })
  });
})
