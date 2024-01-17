const Model = require("../models/Collection.Model");
const excelJs = require("exceljs");
const excelColumnName = require("excel-column-name");
const createError = require("http-errors");
const mongoose = require("mongoose");
const ModelName = "CollectionData";

module.exports = {
    ExportSampleFile: async (req, res, next) => {
        try {
            console.log(req.params);
            const { id } = req.params;
            const catData = await Model.find({ collection_name: id });
            if (!catData) {
                return res.send("Category Data not found..!");
            }
            console.log(catData);
            const mandateData = catData
                .filter((obj) => obj.mandatory)
                .map((o) => {
                    return {
                        header: o.field_name,
                        key: o.field_name,
                        width: 25,
                    };
                });
            console.log(mandateData);
            const notMandateData = catData
                .filter((obj) => !obj.mandatory)
                .map((o) => {
                    if (o.mandatory == false) {
                        return {
                            header: o.field_name,
                            key: o.field_name,
                            width: 15,
                        };
                    }
                });
            const workbook = new excelJs.Workbook();
            const worksheet = workbook.addWorksheet("SampleFile");
            const mandateLastColumnName = excelColumnName.intToExcelCol(
                mandateData.length
            )
                ? excelColumnName.intToExcelCol(mandateData.length)
                : "A";
            const notMandateFirstColumnSName = excelColumnName.intToExcelCol(
                (mandateData.length ? mandateData.length : 1) + 1
            );
            const notMandateLastColumnSName = excelColumnName.intToExcelCol(
                (mandateData.length ? mandateData.length : 1) +
                (notMandateData.length ? notMandateData.length : 1)
            );
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true };
            });
            worksheet.columns = [...mandateData, ...notMandateData];
            worksheet.mergeCells(`A1`, `${mandateLastColumnName}2`);
            const font = { name: "Arial", size: 16 };
            const alignment = { vertical: "middle", horizontal: "center" };
            worksheet.getCell("A1").value = "MANDATORY";
            worksheet.getCell("A1").font = font;
            worksheet.getCell("A1").alignment = alignment;
            worksheet.getCell("A1").fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF0000FF" },
            };
            worksheet.mergeCells(
                `${notMandateFirstColumnSName}1`,
                `${notMandateLastColumnSName}2`
            );
            worksheet.getCell(`${notMandateFirstColumnSName}1`).value =
                "GOOD TO HAVE";
            worksheet.getCell(`${notMandateFirstColumnSName}1`).font = font;
            worksheet.getCell(`${notMandateFirstColumnSName}1`).alignment = alignment;
            worksheet.getCell(`${notMandateFirstColumnSName}1`).fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "F08080" },
            };
            worksheet.getRow(3).values = [
                ...mandateData.map((o) => o.header),
                ...notMandateData.map((o) => o.header),
            ];
            worksheet.getRow(3).font = {
                name: "Arial",
                family: 4,
                size: 14,
                bold: true,
            };
            let filename = `${id}.xlsx`;
            const data = await workbook.xlsx.writeFile(`public/uploads/` + filename);
            let link = "http://35.154.176.14:3000/apiv1/uploads/" + filename;
            if (link) {
                res.send({
                    success: true,
                    msg: "Excel Generate Successfully",
                    data: filename,
                });
            } else {
                res.send({ success: false, msg: "Data not found" });
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = req.body;
            console.log(data);
            data.created_at = Date.now();
            data.created_by = req.user._id;

            const newData = new Model(data);
            const result = await newData.save();
            if (result) {
                res.send({
                    success: true,
                    msg: "Data Insert Successfully",
                    data: result,
                });
            } else {
                res.send({ success: false, msg: "Data not found" });
            }
        } catch (error) {
            next(error);
        }
    },
    get: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw createError.BadRequest("Invalid Parameters");
            }
            const result = await Model.findOne({ _id: mongoose.Types.ObjectId(id) });
            if (!result) {
                throw createError.NotFound(`No ${ModelName} Found`);
            }
            res.json(result);
            return;
        } catch (error) {
            next(error);
        }
    },
    list: async (req, res, next) => {
        try {
            const { name, categoryId, disabled, is_inactive, page, limit, sort } =
                req.query;
            const _page = page ? parseInt(page) : 1;
            const _limit = limit ? parseInt(limit) : 20;
            const _skip = (_page - 1) * _limit;
            const _sort = sort ? sort : "+name";
            const query = {};
            if (name) {
                query.name = new RegExp(name, "i");
            }
            if (categoryId) {
                query.categoryId = mongoose.Types.ObjectId(categoryId);
            }
            query.disabled = disabled && disabled == "true" ? true : false;
            query.is_inactive = is_inactive && is_inactive == "true" ? true : false;
            const result = await Model.find(query)
                .sort(_sort)
                .skip(_skip)
                .limit(_limit);
            const resultCount = await Model.countDocuments(query);
            // .sort(_sort).skip(_skip).limit(_limit)
            res.json({
                data: result,
                meta: {
                    current_page: _page,
                    from: _skip + 1,
                    last_page: Math.ceil(resultCount / _limit, 10),
                    per_page: _limit,
                    to: _skip + _limit,
                    total: resultCount,
                },
            });
            return;
        } catch (error) {
            next(error);
        }
    },
    count: async (req, res, next) => {
        try {
            const { name, disabled, is_inactive } = req.query;
            const query = {};
            if (name) {
                query.name = new RegExp(name, "i");
            }
            query.disabled = disabled && disabled == "true" ? true : false;
            query.is_inactive = is_inactive && is_inactive == "true" ? true : false;
            const result = await Model.countDocuments(query);
            res.json(result);
            return;
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            if (!id) {
                throw createError.BadRequest("Invalid Parameters");
            }
            if (!data) {
                throw createError.BadRequest("Invalid Parameters");
            }
            data.updated_at = Date.now();
            const result = await Model.updateOne(
                { _id: mongoose.Types.ObjectId(id) },
                { $set: data }
            );
            res.json(result);
            return;
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw createError.BadRequest("Invalid Parameters");
            }
            const deleted_at = Date.now();
            const result = await Model.updateOne(
                { _id: mongoose.Types.ObjectId(id) },
                { $set: { is_inactive: true, deleted_at } }
            );
            res.json(result);
            return;
        } catch (error) {
            next(error);
        }
    },
    restore: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw createError.BadRequest("Invalid Parameters");
            }
            const dataToBeDeleted = await Model.findOne(
                { _id: mongoose.Types.ObjectId(id) },
                { name: 1 }
            );
            if (!dataToBeDeleted) {
                throw createError.NotFound(`${ModelName} Not Found`);
            }
            // const dataExists = await Model.findOne({name: dataToBeDeleted.name, is_inactive: false})
            const dataExists = await Model.findOne({
                _id: mongoose.Types.ObjectId(id),
                is_inactive: false,
            });
            if (dataExists) {
                throw createError.Conflict(`${ModelName} already exists`);
            }
            const restored_at = Date.now();
            const result = await Model.updateOne(
                { _id: mongoose.Types.ObjectId(id) },
                { $set: { is_inactive: false, restored_at } }
            );
            res.json(result);
            return;
        } catch (error) {
            next(error);
        }
    },
    processProduct: async (req, res, next) => {
        try {
            const data = req.params;
            if (!data) {
                return next(createError.NotAcceptable("Invalid Query Data"));
            }
            let result = {};
            result = await Model.findOne({ _id: mongoose.Types.ObjectId(data.id) });
            if (!result) {
                throw createError.NotFound("File Not Found with this id");
            }
            const workSheetsFromBuffer = xlsx.parse(
                fs.readFileSync(`${__dirname}/../${result.path}`)
            );
            let FileData = workSheetsFromBuffer[0].data;

            FileData.reverse();
            let FileHeaders1 = FileData.pop();
            let FileHeaders2 = FileData.pop();
            let FileHeaders3 = FileData.pop();
            let FileHeaders4 = FileData.pop();
            FileData.reverse();

            for (const fileRow of FileData) {
                let i = 0;
                for (const fileHeader of FileHeaders3) {
                    if (fileRow[i] && typeof fileRow[i] == "string") {
                        fileRow[i] = fileRow[i].trim();
                    }
                    fileRow[fileHeader] = fileRow[i] ? fileRow[i] : "";
                    i++;
                }
            }

            const dbcategory = await CategoryModel.findOne({
                _id: mongoose.Types.ObjectId(data.category_id),
            });
            if (!dbcategory) {
                throw createError.NotFound("Category Not Found");
            }
            const base_properties = dbcategory.base_properties;
            const attributes = dbcategory.attributes;

            const productFile = await ProductFileModel.find({
                categoryId: mongoose.Types.ObjectId(data.category_id),
                is_inactive: false,
            }).sort("sequence_no");
            if (!productFile) {
                throw createError.NotFound("Category Attributes Not Found");
            }
            // let AllHeaders = [
            //     {field_name:"title",mandatory: true},
            //     {field_name:"sku",mandatory: true},
            //     {field_name:"hsn_code",mandatory: true},
            //     {field_name:"category",mandatory: true},
            //     {field_name:"brand",mandatory: true},
            //     {field_name:"images",mandatory: true},
            //     {field_name:"videos",mandatory: false},
            //     {field_name:"yt_videos",mandatory: false},
            //     {field_name:"main_image",mandatory: true},
            //     {field_name:"MRP",mandatory: true},
            //     {field_name:"selling_price",mandatory: true},
            //     {field_name:"transfer_price",mandatory: true},
            //     {field_name:"discount",mandatory: false},
            //     {field_name:"discount_type",mandatory: false},
            //     {field_name:"unit_type",mandatory: true},
            //     {field_name:"max_order_unit",mandatory: true},
            //     {field_name:"return_replacement_policy",mandatory: false},
            //     {field_name:"short_description",mandatory: false},
            //     {field_name:"description",mandatory: false},
            //     {field_name:"product_code",mandatory: true},
            //     {field_name:"is_main_product",mandatory: true},
            //     {field_name:"product_bar_code",mandatory: false},
            //     {field_name:"supplier_id",mandatory: false},
            //     {field_name:"keywords",mandatory: true},
            //     {field_name:"stock",mandatory: true},
            //     {field_name:"in_stock",mandatory: false},
            //     {field_name:"dimensional_length",mandatory: true},
            //     {field_name:"dimensional_breadth",mandatory: true},
            //     {field_name:"dimensional_height",mandatory: true},
            //     {field_name:"dimensional_weight",mandatory: true},
            //     {field_name:"shipping_cost",mandatory: false},
            //     {field_name:"cod_applicable",mandatory: false},
            //     {field_name:"vendor",mandatory: true},
            // ];
            let AllHeaders = [];

            for (const bp of base_properties) {
                AllHeaders.push({
                    field_name: bp.name,
                    mandatory: false,
                    base_property: true,
                    id: bp.attr_id,
                });
            }
            for (const attr of attributes) {
                AllHeaders.push({
                    field_name: attr.name,
                    mandatory: false,
                    attribute: true,
                    id: attr.attr_id,
                });
            }

            for (const header of AllHeaders) {
                if (
                    productFile.filter((o) => o.field_name == header.field_name).length
                ) {
                    const field = productFile.filter(
                        (o) => o.field_name == header.field_name
                    )[0];
                    header.display_name = field.display_name;
                    header.mandatory = field.mandatory;
                }
            }

            let dataList = [];
            for (const row of FileData) {
                let newData = {};
                newData.base_properties = [];
                newData.attributes = [];
                for (const header of AllHeaders) {
                    if (header.base_property) {
                        // newData.base_properties[header.field_name] = row[header.display_name]
                        newData.base_properties.push({
                            id: header.id,
                            name: header.field_name,
                            value: row[header.display_name],
                        });
                    } else if (header.attribute) {
                        newData.attributes.push({
                            id: header.id,
                            name: header.field_name,
                            value: row[header.display_name],
                        });
                    } else {
                        newData[header.field_name] = row[header.display_name]
                            ? row[header.display_name]
                            : "";
                    }
                }
                // console.log(newData.brand)
                newData.brand = await BrandModel.findOne(
                    { name: newData.brand },
                    { _id: 1 }
                );
                // console.log(newData.brand)
                // newData.brand = newData.brand
                newData.max_order_unit = newData.max_order_unit
                    ? newData.max_order_unit
                    : 999;
                newData.unit_type = newData.unit_type ? newData.unit_type : "unit";
                newData.category = data.category_id;
                newData.images = newData.images.split(",");
                newData.main_image = 0;
                newData.in_stock = newData.stock > 0 ? true : false;
                newData.cod_applicable = newData.cod_applicable
                    ? newData.cod_applicable
                    : false;
                newData.vendor = req.user._id;

                const commission_type =
                    req.user.commissions && req.user.commissions.type
                        ? req.user.commissions.type
                        : "";
                if (commission_type == "TP") {
                    newData.transfer_price = parseInt(newData.selling_price);
                    // console.log(newData.selling_price);
                    // newData.selling_price += parseInt(newData.selling_price);
                    newData.selling_price +=
                        dbcategory.commission.tp.rekkoz.type == "Fixed"
                            ? parseInt(dbcategory.commission.tp.rekkoz.share)
                            : newData.transfer_price *
                            (parseInt(dbcategory.commission.tp.rekkoz.share) / 100);
                    // console.log(dbcategory.commission.tp.rekkoz.type == 'Fixed') ? parseInt(dbcategory.commission.tp.rekkoz.share) : (newData.transfer_price * (parseInt(dbcategory.commission.tp.rekkoz.share) / 100))
                    newData.selling_price += parseInt(dbcategory.commission.tp.logistic);
                    // console.log(parseInt(dbcategory.commission.tp.logistic))
                    newData.selling_price +=
                        dbcategory.commission.tp.influencer.type == "Fixed"
                            ? parseInt(dbcategory.commission.tp.influencer.share)
                            : newData.transfer_price *
                            (parseInt(dbcategory.commission.tp.influencer.share) / 100);
                    // console.log((dbcategory.commission.tp.influencer.type == 'Fixed') ? parseInt(dbcategory.commission.tp.influencer.share) : (newData.transfer_price * (parseInt(dbcategory.commission.tp.influencer.share) / 100)))
                    // console.log("newData.selling_price")
                    // console.log(newData.selling_price)
                    // console.log("newData.MRP")
                    // console.log(newData.MRP)
                }
                newData.MRP = parseInt(newData.MRP);
                newData.selling_price = parseInt(newData.selling_price);
                newData.status_reason = [];
                if (newData.MRP < newData.selling_price) {
                    newData.status = "validation failed";
                    newData.status_reason.push("lower MRP then selling_price");
                }
                if (!newData.brand) {
                    delete newData.brand;
                    // newData.status = 'validation failed'
                    // newData.status_reason.push('Brand not found')
                } else {
                    newData.brand = newData.brand._id;
                }
                newData = new ProductModel(newData);
                newData.created_at = Date.now();
                newData.created_by = req.user._id;
                dataList.push(newData);
            }

            for (const dl of dataList) {
                const prod_check = await ProductModel.findOne(
                    {
                        product_code: dl.product_code,
                        is_main_product: true,
                        is_inactive: false,
                        vendor: req.user._id,
                    },
                    { _id: 1 }
                );
                dl.is_main_product = prod_check ? false : true;
                const prod_check2 = await ProductModel.findOne(
                    {
                        sku: dl.sku,
                        product_code: dl.product_code,
                        is_main_product: true,
                        is_inactive: false,
                        vendor: req.user._id,
                    },
                    { _id: 1 }
                );
                if (prod_check2) {
                    dl.status = "validation failed";
                    dl.status_reason.push("Duplicate SKU product");
                }
                dl.is_main_product = prod_check ? false : true;
                // console.log(dl.images)
                await dl.save();
            }
            // console.log(dataList)
            return res.send({
                success: true,
                msg: dataList.length + " Products Processed Successfully",
            });
        } catch (error) {
            console.log(error);
            if (error.isJoi === true)
                return next(createError.BadRequest("Bad Request"));
            next(error);
        }
    },
};
