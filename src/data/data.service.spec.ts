import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { getModelToken } from '@nestjs/mongoose';
import { Data } from './interfaces/data.interfaces';
import { Model } from 'mongoose';
import { CreateDatumDto } from './dto/create-datum.dto';

const singleData = {
  id: "1",
  name: "Name",
  description: "Description",
  isOk: true
}

const singleDataUpdate = {
  id: "1",
  name: "update",
  description: "update",
  isOk: true
}

const arrayData = [
  {
    id: "1",
    name: "Name",
    description: "Description",
    isOk: true
  }
]

const updateDataV1: CreateDatumDto = {
  name: "update",
  description: "update",
  isOk: true
}

const updateDataV2: CreateDatumDto = {
  name: 'update',
  description: undefined,
  isOk: false
}

const createDto = {
  name: "create",
  description: "create",
  isOk: true
}

const mockDataModel = () => ({
  find: jest.fn().mockReturnValue(arrayData),
  //findById: jest.fn().mockReturnValue(singleData),
  findById: jest.fn().mockImplementation((id: string) => {
    if(id === "1") {
      return singleData;
    } 
    return undefined;
  }),
  findByIdAndUpdate: jest.fn().mockImplementation((id: string, updateDate: CreateDatumDto) => {
    if(id === "1" && updateDate != undefined) {
      return {
        id: id,
        name: updateDate.name != undefined ? updateDate.name: "default",
        description: updateDate.description != undefined ? updateDate.description: "default",
        isOk: updateDate.isOk != undefined ? updateDate.isOk: false
      }
    }
    return undefined;
  }),
  findByIdAndDelete: jest.fn().mockReturnValue(singleData),
  save: jest.fn().mockImplementation((data: CreateDatumDto) => {
    if(data != undefined) {
      return singleData
    }
    return undefined;
  })

});

describe('DataService', () => {
  let service: DataService;
  let model: Model<Data>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataService,
        {
          provide: getModelToken('Data'),
          useFactory: mockDataModel
        }
      ],
    }).compile();

    service = module.get<DataService>(DataService);
    model = module.get<Model<Data>>(getModelToken('Data'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all data', async () => {
    const data = await service.findAll();
    expect(data.length).toEqual(1);
    expect(data[0]).toEqual(singleData);
  });

  it('should return a single data by ID', async() => {
    const id = "1";
    const dataSuccess = await service.findOne(id);
    const dataUndefined = await service.findOne("5");
    expect(dataSuccess).toEqual(singleData);
    expect(dataUndefined).toBeUndefined();
  });

  it('should update data', async () => {
    const id = "1";
    const dataV1 = await service.update(id, updateDataV1);
    const dataV2 = await service.update(id, updateDataV2);
    const dataUndefined = await service.update("5", updateDataV1);

    expect(dataV1).toEqual(singleDataUpdate);
    expect(dataV2).toEqual({id: "1", name: "update", description: "default", isOk: false})
  });

  it('should remove data', async () => {
    const id = "1";
    const data = await service.remove(id);

    expect(data).toEqual(singleData);
  });
});
