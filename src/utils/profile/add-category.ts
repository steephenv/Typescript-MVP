import mongoose = require('mongoose');
import lme from 'lme';
import { get as configGet } from 'config';
import { Promise as BluePromise } from 'bluebird';
// Connect to MongoDB
const MONGO_URI: string = configGet('database.url');

import { SkillCategory } from '../../models/SkillCategory';
import { SkillSubCategory } from '../../models/SkillSubCategory';

// Promisifying all mongoose methods
mongoose.Promise = BluePromise;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    lme.i('Mongoose connected to ' + MONGO_URI);
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    const cat1 = new SkillCategory({
      category: 'Personal Skill 1',
      cluster: 'Personal',
    });

    const cats = [cat1];
    return BluePromise.map(cats, cat => {
      return cat.save();
    }).then(catIds => {
      const newSub1 = new SkillSubCategory({
        categoryId: catIds[0]._id,
        subCategory: 'Sub 1',
      });
      return newSub1.save();
    });
  })
  .then(() => {
    lme.i('Finished');
  })
  .catch(err => {
    lme.e(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err,
    );
    // process.exit();
  });
