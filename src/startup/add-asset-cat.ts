import { AssetCategory } from '../models/AssetCategory';
import { Promise as BluePromise } from 'bluebird';

export const createCat = async () => {
  const cat1 = new AssetCategory({
    category: 'AssetCat 1',
  });
  const cat2 = new AssetCategory({
    category: 'AssetCat 2',
  });
  const cat3 = new AssetCategory({
    category: 'AssetCat 3',
  });
  const cat4 = new AssetCategory({
    category: 'AssetCat 4',
  });
  const cat5 = new AssetCategory({
    category: 'AssetCat 5',
  });
  const cat6 = new AssetCategory({
    category: 'AssetCat 6',
  });
  const cat7 = new AssetCategory({
    category: 'AssetCat 7',
  });
  const cat8 = new AssetCategory({
    category: 'AssetCat 8',
  });
  const cats = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8];
  return BluePromise.map(cats, cat => {
    return cat.save();
  });
};
