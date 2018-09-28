import { SkillCategory } from '../../../../models/SkillCategory';
import { SkillSubCategory } from '../../../../models/SkillSubCategory';

// no new cluster can be added to db at present
const cluster = ['Personal', 'Leadership', 'Entrepreneurship', 'Functional'];

export async function rowApplier(gottenRow: string[]) {
  const row = gottenRow.map(col => col.trim());

  const successLog: string[] = [];
  const errLog: string[] = [];

  successLog.push(`gotten row (${row.toString()})`);

  if (cluster.indexOf(row[0]) < 0) {
    errLog.push(`INVALID CLUSTER (${row[0]})`);
    return { successLog: successLog.toString(), errLog: errLog.toString() };
  }

  if (!row[1]) {
    errLog.push(`EMPTY CATEGORY (${row[1]})`);
    return { successLog: successLog.toString(), errLog: errLog.toString() };
  }

  let category = await SkillCategory.findOne({
    category: row[1],
    cluster: row[0],
  }).exec();

  if (!category) {
    successLog.push(
      `no category (${row[0]}) under cluster (${row[0]}), creating it`,
    );
    category = new SkillCategory({
      category: row[1],
      cluster: row[0],
    });
    category = await category.save();
  }

  if (!row[2]) {
    successLog.push(`sub category field is empty. skipping`);
    return { successLog: successLog.toString(), errLog: errLog.toString() };
  }

  successLog.push(
    `content in subcategory field detected (${row[2]}). checking if it exists`,
  );

  let subCat = await SkillSubCategory.findOne({
    categoryId: category._id,
    subCategory: row[2],
  }).exec();

  if (subCat) {
    successLog.push(`subcategory (${row[2]}) exists`);
    return { successLog: successLog.toString(), errLog: errLog.toString() };
  }

  successLog.push(`creating subcategory (${row[2]})`);

  subCat = new SkillSubCategory({
    categoryId: category._id,
    subCategory: row[2],
  });
  await subCat.save();

  // if (cat && row[2]) {
  //   const subCat = await SkillSubCategory.findOne({
  //     categoryId: cat._id,
  //     subCategory: row[2],
  //   });
  //   if (!subCat) {
  //     const newSubCat = new SkillSubCategory({
  //       categoryId: cat._id,
  //       subCategory: row[2],
  //     });
  //     await newSubCat.save();
  //   }
  // } else {
  //   const newCat = new SkillCategory({
  //     category: row[1],
  //     cluster: row[0],
  //   });
  //   const savedNewCat = await newCat.save();
  //   if (row[2]) {
  //     const newSubCat = new SkillSubCategory({
  //       categoryId: savedNewCat._id,
  //       subCategory: row[2],
  //     });
  //     await newSubCat.save();
  //   }
  // }
}
