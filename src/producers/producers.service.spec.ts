import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ProducerDto } from "./dto/producer.dto";
import { ProducerRepository } from "./producers.repository";
import { ProducersService } from "./producers.service";

const mockProducerRepository = () => ({
  createProducer: jest.fn(),
  updateProducer: jest.fn(),
  findProducers: jest.fn(),
  findOne: jest.fn(),
})

describe('ProducerService', () => {
  let repository;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: ProducerRepository,
          useFactory: mockProducerRepository,
        },
      ],
    }).compile();

    repository = await module.get<ProducerRepository>(ProducerRepository);
    service = await module.get<ProducersService>(ProducersService);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('crateProducer', () => {
    let mockProducerDto: ProducerDto;

    beforeEach(() => {
      mockProducerDto = {
        cpf_cnpj: '70975233017',
        producer_name: 'Jose Antonio',
        farm_name: 'Farm II',
        city: 'Cristalina',
        state: 'GO',
        total_area_farm: 2.42,
        planting_area: 2.00,
        vegetation_area: 0.4,
        planted_culture: {}
      };
    });

    it('should create an producer', async() => {
      const result = await service.createProducer(mockProducerDto);
      expect(repository.createProducer).toHaveBeenCalledWith(mockProducerDto);
    })

    it('should throw an error if cpf/cnpj is invalid', async () => {
      mockProducerDto.cpf_cnpj = '11111111111';
      expect(service.createProducer(mockProducerDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if the sum of the plateau area and the vegetation area for greater than the farm area', async () => {
      mockProducerDto.planting_area = 3.00;
      mockProducerDto.vegetation_area = 0.9;
      expect(service.createProducer(mockProducerDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  })
})
