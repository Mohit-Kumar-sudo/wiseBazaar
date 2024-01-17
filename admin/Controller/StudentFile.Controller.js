const createError = require('http-errors')
const Model = require('../models/StudentFile.model')
const CollecionModel = require('../models/Collection.Model')
const mongoose = require('mongoose')
const xlsx = require('node-xlsx');
const fs = require('fs');

module.exports = {

  create: async (req, res, next) => {
    try {
      const data = req.body
      data.created_at = Date.now()
      data.updated_at = Date.now()
      data.created_by = req.user ? req.user.username : 'unauth'
      data.updated_by = req.user ? req.user.username : 'unauth'

      // const doesExist = await Model.findOne({ email: data.email })
      // if (doesExist)
      //   throw createError.Conflict(`data already inserted`)

      const model = new Model(data)
      const savedModel = await model.save()
      if (savedModel) {
        res.send({ success: true, msg: 'Data inserted successfully.' })
      } else {
        res.send({ success: false, msg: 'Failed to insert data.' })
      }

    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  updateById: async (req, res, next) => {
    try {
      const data = req.body
      if (!data) {
        return next(createError.NotAcceptable('Invalid Query Data'))
      }
      data.updated_at = Date.now()
      data.updated_by = req.user ? req.user.username : 'unauth'

      let result = {}
      result = await Model.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data._id) }, data)
      if (result) {
        res.send({ success: true, msg: 'Data Updated Successfully' })
      } else {
        res.send({ success: false, msg: 'Failed to Update Data' })
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Bad Request'))
      next(error)
    }
  },

  getList: async (req, res, next) => {
    try {
      let list = []
      let query = {}
      // if (req.role.name != 'admin') {
      //   query = { created_by: req.user.username }
      // }
      list = await Model.find({ is_active: true, ...query }, { __v: 0 }).sort({ created_at: -1 })
      if (list) {
        res.send({ success: true, msg: 'Data Fetched', data: list, count: list.length })
      } else {
        res.send({ success: false, msg: 'Failed to Fetch Data' })
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Bad Request'))
      next(error)
    }
  },

  getDeletedList: async (req, res, next) => {
    try {
      let list = []
      list = await Model.find({ is_active: false }, { __v: 0 })
      if (list) {
        res.send({ success: true, msg: 'Data Fetched', data: list, count: list.length })
      } else {
        res.send({ success: false, msg: 'Failed to Fetch Data' })
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Bad Request'))
      next(error)
    }
  },

  getDataById: async (req, res, next) => {
    try {
      const data = req.body
      if (!data) {
        return next(createError.NotAcceptable('Invalid Query Data'))
      }

      let result = {}
      result = await Model.findById({ _id: mongoose.Types.ObjectId(data.id) }, { __v: 0 })
      if (result) {
        res.send({ success: true, msg: 'Detail Fetched', data: result })
      } else {
        res.send({ success: false, msg: 'Failed to Fetch Detail' })
      }

    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Bad Request'))
      next(error)
    }
  },

  getScheduleById: async (req, res, next) => {
    try {
      const data = req.body
      if (!data) {
        return next(createError.NotAcceptable('Invalid Query Data'))
      }

      let result = {}
      // result = await Model.findById({ _id: mongoose.Types.ObjectId(data.id) }, { __v: 0 })
      result = await Model.aggregate(
        [
          {
            $match: { _id: mongoose.Types.ObjectId(data.id) }
          },
          {
            $addFields: {
              sid: { $toString: data.id }
            }
          },
          {
            $lookup: {
              from: "programschedules",
              localField: "sid",
              foreignField: "program_id",
              as: "schedule"
            }
          },
          {
            $project: {
              _id: 1,
              sid: 1,
              title: 1,
              program_date: 1,
              days: 1,
              schedule: 1
            }
          }
        ]
      )
      if (result.length) {
        res.send({ success: true, msg: 'Detail Fetched', data: result[0] })
      } else {
        res.send({ success: false, msg: 'Failed to Fetch Detail' })
      }

    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Bad Request'))
      next(error)
    }
  },

  deleteDataById: async (req, res, next) => {
    try {
      const data = req.body
      if (!data) {
        return next(createError.NotAcceptable('Invalid Query Data'))
      }
      data.updated_at = Date.now()
      data.updated_by = req.user.username

      let result = {}
      result = await Model.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, { $set: { is_active: false } })
      if (result) {
        res.send({ success: true, msg: 'Data Deleted Successfully' })
      } else {
        res.send({ success: false, msg: 'Failed to Delete Data' })
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Bad Request'))
      next(error)
    }
  },

  restoreDataById: async (req, res, next) => {
    try {
      const data = req.body
      if (!data) {
        return next(createError.NotAcceptable('Invalid Query Data'))
      }
      data.updated_at = Date.now()
      data.updated_by = req.user.username

      let result = {}
      result = await Model.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.id) }, { $set: { is_active: true } })
      if (result) {
        res.send({ success: true, msg: 'Data Restored Successfully' })
      } else {
        res.send({ success: false, msg: 'Failed to Restore Data' })
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Bad Request'))
      next(error)
    }
  },

  processDataById: async (req, res, next) => {
    try {
      const data = req.body
      if (!data) {
        return next(createError.NotAcceptable('Invalid Query Data'))
      }

      let result = {}
      result = await Model.findOne({ _id: mongoose.Types.ObjectId(data.id) })
      console.log(`${__dirname}/../uploads/${result.path}`);
      const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/../${result.path}`));
      const studentFileData = workSheetsFromBuffer[0].data;

      studentFileData.reverse();
      studentFileData.pop();
      studentFileData.pop();
      const FileHeaders = studentFileData.pop();
      studentFileData.reverse();

      let reqHeadersAll = await CollecionModel.find({ collection_name: data.program, mandatory: true })
      let reqHeaders = await CollecionModel.find({ collection_name: data.program, mandatory: true })
      for (const header of FileHeaders) {
        if (reqHeaders.filter(o => o.field_name == header).length) {
          reqHeaders = reqHeaders.filter(o => o.field_name != header);
        }
      }
      if (reqHeaders.length) {
        return next(createError.BadRequest('Neccessary Fields Missing from the file'))
      }

      let dataList = [];
      for (const fileRow of studentFileData) {
        let i = 0;
        for (const fileHeader of FileHeaders) {
          fileRow[fileHeader] = fileRow[i];
          console.log(fileRow[fileHeader]);
          i++;
        }
      }
      for (const sfd of studentFileData) {
        let datum = {};
        for (const rh of reqHeadersAll) {
          datum[rh.field_name] = sfd[rh.field_name];
        }
        dataList.push(datum)
      }
      let schemaData = {};
      for (const rh of reqHeadersAll) {
        schemaData[rh.field_name] = rh.field_type == 'string' ? String : String
      }

      // const TableModel = mongoose.model(req.body.program, new mongoose.Schema(schemaData))

      const results = await mongoose.connection.db.collection(req.body.program).insertMany(dataList);
      console.log(dataList);
      console.log(results);
      console.log(reqHeaders)
      if (data) {
        res.send({ success: true, msg: 'Data Processed Successfully' })
      } else {
        res.send({ success: false, msg: 'Failed to Process Data' })
      }
    } catch (error) {
      console.log(error);
      if (error.isJoi === true)
        return next(createError.BadRequest('Bad Request'))
      next(error)
    }
  },

  processQuestionDataById: async (req, res, next) => {
    try {
      const data = req.body
      if (!data) {
        return next(createError.NotAcceptable('Invalid Query Data'))
      }
      let result = {}
      result = await Model.findOne({ _id: mongoose.Types.ObjectId(data.id) })
      console.log('Processing File' + `${__dirname}/../uploads/${result.path}`);
      const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/../${result.path}`));
      // console.log(workSheetsFromBuffer[0].data[0]);
      console.log('Processed File' + `${__dirname}/../uploads/${result.path}`);
      const FileData = workSheetsFromBuffer[0].data;

      console.log(`Extracting headers`);
      FileData.reverse();
      const FileHeaders = FileData.pop();
      FileData.reverse();

      let requiredHeaders = [
        'question',
        'option1',
        'option2',
        'option3',
        'option4',
        'correct_answer',
        'paper code',
        'weightage',
        'unit'
      ];

      for (const header of FileHeaders) {
        if (requiredHeaders.filter(o => o == header).length) {
          requiredHeaders = requiredHeaders.filter(o => o != header);
        }
      }

      if (requiredHeaders.length) {
        return next(createError.BadRequest('Neccessary Fields Missing from the file'))
      }

      for (const fileRow of FileData) {
        let i = 0;
        for (const fileHeader of FileHeaders) {
          fileRow[fileHeader] = fileRow[i];
          fileRow['class_name'] = fileRow['paper code'];
          fileRow['level'] = fileRow['weightage'];
          i++;
        }
      }

      let dataList = [];

      for (const row of FileData) {

        let correct_answer_index;
        if (row['correct_answer'] == row['option1']) {
          correct_answer_index = 0;
        } else if (row['correct_answer'] == row['option2']) {
          correct_answer_index = 1;
        } else if (row['correct_answer'] == row['option3']) {
          correct_answer_index = 2;
        } else if (row['correct_answer'] == row['option4']) {
          correct_answer_index = 3;
        }

        dataList.push({
          question: row['question'],
          options: [
            row['option1'] ? row['option1'].toString() : (row['option1'] === false ? "false" : ""),
            row['option2'] ? row['option2'].toString() : (row['option2'] === false ? "false" : ""),
            row['option3'] ? row['option3'].toString() : (row['option3'] === false ? "false" : ""),
            row['option4'] ? row['option4'].toString() : (row['option4'] === false ? "false" : ""),
          ],
          correct_answer: row['correct_answer'] ? row['correct_answer'].toString() : (row['correct_answer'] === false ? "correct_answer" : ""),
          correct_answer_index,
          paper_code: row['class_name'] ? row['class_name'].toString() : (row['class_name'] === false ? "false" : ""),
          level: row['level'],
          is_hindi: row['is_hindi'] ? row['is_hindi'] : 'N',
          question_hindi: row['question_hindi'],
          is_image: row['is_image'],
          is_image: row['image_path'],
          options_hindi: [
            row['option_hindi1'] ? row['option_hindi1'].toString() : (row['option_hindi1'] === false ? "false" : ""),
            row['option_hindi2'] ? row['option_hindi2'].toString() : (row['option_hindi2'] === false ? "false" : ""),
            row['option_hindi3'] ? row['option_hindi3'].toString() : (row['option_hindi3'] === false ? "false" : ""),
            row['option_hindi4'] ? row['option_hindi4'].toString() : (row['option_hindi4'] === false ? "false" : ""),
          ],
          paper_type: 'Online',
          unit: row['unit'],
          filename: result.filename,
          path: result.path,
          program_id: data.program,
          created_by: req.user.username
        });
      }

      const results = await QuestionBankModel.insertMany(dataList);
      //console.log(dataList); 
      if (results) {
        res.send({ success: true, msg: 'Data Processed Successfully' })
      } else {
        res.send({ success: false, msg: 'Failed to Process Data' })
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Bad Request'))
      next(error)
    }
  },
}
