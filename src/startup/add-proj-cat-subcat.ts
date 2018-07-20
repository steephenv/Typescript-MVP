import { Promise as BluePromise } from 'bluebird';
import { ProjectCategory } from '../models/ProjectCategory';
import { ProjectSubCategory } from '../models/ProjectSubCategory';

export const createProjCat = async () => {
  const cat1 = new ProjectCategory({
    category: 'ProjCat 1',
  });
  const cat2 = new ProjectCategory({
    category: 'ProjCat 2',
  });
  const cat3 = new ProjectCategory({
    category: 'ProjCat 3',
  });
  const cat4 = new ProjectCategory({
    category: 'ProjCat 1',
  });
  const cat5 = new ProjectCategory({
    category: 'ProjCat 1',
  });
  const cats = [cat1, cat2, cat3, cat4, cat5];
  return BluePromise.map(cats, cat => {
    return cat.save();
  }).then(catData => {
    const sub1 = new ProjectSubCategory({
      categoryId: catData[0]._id,
      subCategory: 'ProjSub 1',
    });
    const sub2 = new ProjectSubCategory({
      categoryId: catData[1]._id,
      subCategory: 'ProjSub 2',
    });
    const sub3 = new ProjectSubCategory({
      categoryId: catData[2]._id,
      subCategory: 'ProjSub 2',
    });
    const sub4 = new ProjectSubCategory({
      categoryId: catData[3]._id,
      subCategory: 'ProjSub 3',
    });
    const sub5 = new ProjectSubCategory({
      categoryId: catData[4]._id,
      subCategory: 'ProjSub 4',
    });
    const subs = [sub1, sub2, sub3, sub4, sub5];
    return BluePromise.map(subs, sub => {
      return sub.save();
    });
  });
};
