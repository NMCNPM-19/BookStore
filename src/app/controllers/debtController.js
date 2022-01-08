const pagination = require("../../public/js/pages/pagination");
const debtService = require("../services/debtService");
const {
    multipleSequelizeToObject,
    SequelizeToObject,
} = require("../../util/sequelize");
const e = require("express");
// dùng để in csv
const CsvParser = require("json2csv").Parser;

class debtController {
    //[GET]: debt/
    async list(req, res, next) {
        if (req.user) {
            const itemPerPage = 10;
            const title = req.query.title;
            let chooseMonth = req.query.chooseMonth;
            let secondChooseMonth = chooseMonth;
            var month;
            if (chooseMonth) {
                month = chooseMonth.split("-");
                month = month.join("");
            } else {
                let date = new Date();
                month =
                    date.getFullYear().toString() +
                    "-" +
                    ("0" + (date.getMonth() + 1).toString()).slice(-2);
                secondChooseMonth = month;
                month = month.split("-");
                month = month.join("");
            }

            const page =
                !isNaN(req.query.page) && req.query.page > 0
                    ? req.query.page - 1
                    : 0;
            const Debts = await debtService.list(
                title,
                month,
                page,
                itemPerPage
            );
            const TotalPage =
                Math.ceil(Debts.count / itemPerPage) > page + 1
                    ? Math.ceil(Debts.count / itemPerPage)
                    : page + 1;
            const pagItems = pagination.paginationFunc(page + 1, TotalPage);
            res.render("debt/debt", {
                Items: pagItems,
                Debts: Debts.rows,
                message: req.query.message,
                title: title,
                chooseMonth: secondChooseMonth,
                amount: Debts.count,
            });
        } else {
            res.redirect("/");
        }
    }

    //[GET]: /debt/print
    async printMonth(req, res, next) {
        if (req.user) {
            let chooseMonth = req.query.chooseMonth;
            var month;
            if (chooseMonth) {
                month = chooseMonth.split("-");
                month = month.join("");
            } else {
                let date = new Date();
                month =
                    date.getFullYear().toString() +
                    "-" +
                    ("0" + (date.getMonth() + 1).toString()).slice(-2);
            }

            let printTable = [];
            const Debts = await debtService.listMonth(month);

            Debts.forEach((element) => {
                const { MAKH, nodau, nocuoi, tongno, tongtra } = element;
                printTable.push({ MAKH, nodau, nocuoi, tongno, tongtra });
            });

            const csvFields = ["MAKH", "nodau", "nocuoi", "tongno", "tongtra"];
            const csvParser = new CsvParser({ csvFields });
            let csvData = [];
            if (printTable) {
                csvData = csvParser.parse(printTable);
            }

            res.setHeader("Content-Type", "text/csv");
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=TonNO.csv"
            );
            res.status(200).end(csvData);
        } else {
            res.redirect("/");
        }
    }

    //[GET]: /debt/info/:id/
    async info(req, res, next) {
        try {
            if (req.user) {
                const debtCus = await debtService.debtCust(req);
                const customers = await debtService.getCustomer(req);
                const rule = (await debtService.ruleDebt()).dept_min;
                res.status(200).json({ customers, debtCus, rule });
            } else {
                res.redirect("/");
            }
        } catch (error) {
            next(error);
        }
    }
    //[POST]: /debt/:id/add
    async add(req, res, next) {
        try {
            if (req.user) {
                var debt = await debtService.addDebt(req);
                res.redirect("back");
            } else {
                res.redirect("/");
            }
        } catch (error) {
            next(error);
        }
    }
    //[POST]: /debt/:id/pay
    async pay(req, res, next) {
        try {
            if (req.user) {
                var debt = await debtService.payDebt(req);
                res.redirect("back");
            } else {
                res.redirect("/");
            }
        } catch (error) {
            next(error);
        }
    }

    //[GET] : /debt/hisAdd
    async hisAdd(req, res, next) {
        try {
            if (req.user) {
                const itemPerPage = 10;
                const title = req.query.title;
                const page =
                    !isNaN(req.query.page) && req.query.page > 0
                        ? req.query.page - 1
                        : 0;
                var phieuno = await debtService.getListdebt(
                    title,
                    page,
                    itemPerPage
                );
                for (const no of phieuno.rows) {
                    no.HOTEN = no["MAKH_khachhang.HOTEN"];
                }
                const TotalPage =
                    Math.ceil(phieuno.count / itemPerPage) > page + 1
                        ? Math.ceil(phieuno.count / itemPerPage)
                        : page + 1;
                const pagItems = pagination.paginationFunc(page + 1, TotalPage);
                res.render("debt/hisAdd", {
                    Items: pagItems,
                    phieuno: phieuno.rows,
                    title: title,
                });
            } else {
                res.redirect("/");
            }
        } catch (error) {
            next(error);
        }
    }
    //[GET] : /debt/hisAdd
    async hisPay(req, res, next) {
        try {
            if (req.user) {
                const itemPerPage = 10;
                const title = req.query.title;
                const page =
                    !isNaN(req.query.page) && req.query.page > 0
                        ? req.query.page - 1
                        : 0;
                var phieuno = await debtService.getListPay(
                    title,
                    page,
                    itemPerPage
                );
                for (const no of phieuno.rows) {
                    no.HOTEN = no["MAKH_khachhang.HOTEN"];
                }
                const TotalPage =
                    Math.ceil(phieuno.count / itemPerPage) > page + 1
                        ? Math.ceil(phieuno.count / itemPerPage)
                        : page + 1;
                const pagItems = pagination.paginationFunc(page + 1, TotalPage);
                res.render("debt/hisPay", {
                    tems: pagItems,
                    phieuno: phieuno.rows,
                    title: title,
                });
            } else {
                res.redirect("/");
            }
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new debtController();
