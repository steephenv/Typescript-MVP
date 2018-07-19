import { Promise as BluePromise } from 'bluebird';
import { SkillCategory } from '../models/SkillCategory';
import { SkillSubCategory } from '../models/SkillSubCategory';

export const createCat = async () => {
  const cat1 = new SkillCategory({
    category: 'Cat 1',
    cluster: 'Personal',
  });
  const cat2 = new SkillCategory({
    category: 'Cat 2',
    cluster: 'Leadership',
  });
  const cat3 = new SkillCategory({
    category: 'Cat 3',
    cluster: 'Entrepreneurship',
  });
  const cat4 = new SkillCategory({
    category: 'Cat 4',
    cluster: 'Functional',
  });
  const cat5 = new SkillCategory({
    category: 'Cat 5',
    cluster: 'Personal',
  });
  const cat6 = new SkillCategory({
    category: 'Cat 6',
    cluster: 'Leadership',
  });
  const cat7 = new SkillCategory({
    category: 'Cat 7',
    cluster: 'Entrepreneurship',
  });
  const cat8 = new SkillCategory({
    category: 'Cat 8',
    cluster: 'Functional',
  });
  const cats = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8];
  return BluePromise.map(cats, cat => {
    return cat.save();
  }).then(catData => {
    const sub1 = new SkillSubCategory({
      categoryId: catData[0]._id,
      subCategory: 'Sub 1',
    });
    const sub2 = new SkillSubCategory({
      categoryId: catData[1]._id,
      subCategory: 'Sub 2',
    });
    const sub3 = new SkillSubCategory({
      categoryId: catData[2]._id,
      subCategory: 'Sub 3',
    });
    const sub4 = new SkillSubCategory({
      categoryId: catData[3]._id,
      subCategory: 'Sub 4',
    });
    const sub5 = new SkillSubCategory({
      categoryId: catData[4]._id,
      subCategory: 'Sub 5',
    });
    const subs = [sub1, sub2, sub3, sub4, sub5];
    return BluePromise.map(subs, sub => {
      return sub.save();
    });
  });
};
