const importService = require("../services/importService");
const pagination = require("../../public/js/pages/pagination");
// dùng để in csv
const CsvParser = require("json2csv").Parser;

class orderController {
    //[GET]: /products/
    async list(req, res, next) {
        if (req.user) {
            if (req.user.LOAINV != "emp") {
                let chooseMonth = req.query.chooseMonth;
                let secondChooseMonth = chooseMonth;
                var month = chooseMonth;
                if (!chooseMonth) {
                    let date = new Date();
                    month =
                        date.getFullYear().toString() +
                        "-" +
                        ("0" + (date.getMonth() + 1).toString()).slice(-2);
                    secondChooseMonth = month;
                }

                const itemPerPage = 10;
                const page =
                    !isNaN(req.query.page) && req.query.page > 0
                        ? req.query.page - 1
                        : 0;
                const title = req.query.title;
                const order = await importService.list(
                    title,
                    month,
                    page,
                    itemPerPage
                );
                const TotalPage =
                    Math.ceil(order.count / itemPerPage) > page + 1
                        ? Math.ceil(order.count / itemPerPage)
                        : page + 1;
                const pagItems = pagination.paginationFunc(page + 1, TotalPage);

                res.render("orders/import", {
                    Items: pagItems,
                    order: order.rows,
                    title: title,
                    chooseMonth: secondChooseMonth,
                });
            }
        } else {
            res.redirect("/");
        }
    }

    //[POST]:importOrder/add
    async add(req, res, next) {
        try {
            if (req.user) {
                req.body.MAPN = await importService.genKeyPN();
                const created = await importService.add(req);
                if (created) {
                    req.session.cart = {};
                    return res.redirect("back");
                } else {
                    res.status(401).json("Lỗi! Kiểm tra số lượng nhập");
                }
            } else {
                res.redirect("/");
            }
        } catch (err) {
            next(err);
        }
    }

    //[GET] importOrder/view/:id
    async view(req, res, next) {
        if (req.user) {
            if (req.user.LOAINV != "emp") {
                try {
                    const itemPerPage = 10;
                    const title = req.query.title;
                    const page =
                        !isNaN(req.query.page) && req.query.page > 0
                            ? req.query.page - 1
                            : 0;

                    const MAPN = req.params.id;
                    const ct_pn = await importService.getInfor(MAPN);
                    const emp = await importService.getEmp(ct_pn.MANV);
                    var books = await importService.getImportDetail(
                        MAPN,
                        title,
                        page,
                        itemPerPage
                    );
                    books.rows = await importService.getBookInfor(books.rows);

                    const TotalPage =
                        Math.ceil(books.count / itemPerPage) > page + 1
                            ? Math.ceil(books.count / itemPerPage)
                            : page + 1;
                    const pagItems = pagination.paginationFunc(
                        page + 1,
                        TotalPage
                    );
                    res.render("orders/importDetail", {
                        ct_pn,
                        emp,
                        Items: pagItems,
                        title: title,
                        books: books.rows,
                    });
                } catch (error) {
                    next(error);
                }
            }
        } else {
            res.redirect("/");
        }
    }
    //[GET]: /importOrder/print/:id
    async print(req, res, next) {
        if (req.user) {
            if (req.user.LOAINV != "emp") {
                let printTable = [];
                const MAPN = req.params.id;
                const ct_pn = await importService.getInfor(MAPN);
                const books = await importService.getImportDetail(
                    MAPN,
                    "",
                    0,
                    10000
                ); //get all books
                books.rows = await importService.getBookInfor(books.rows);
                books.rows.forEach((element) => {
                    const { MASACH, TENSACH, TACGIA, THELOAI, SL } = element;
                    printTable.push({ MASACH, TENSACH, TACGIA, THELOAI, SL });
                });
                console.log(printTable);
                const csvFields = [
                    "MASACH",
                    "TENSACH",
                    "TACGIAO",
                    "THELOAI",
                    "SOLUONG",
                ];
                const csvParser = new CsvParser({ csvFields, withBOM: true });
                let csvData = [];
                if (printTable) {
                    csvData = csvParser.parse(printTable);
                }
                const file_name =
                    MAPN + "-" + ct_pn.NGAYNHAP + "-" + ct_pn.MANV;
                res.setHeader("Content-Type", "text/csv; charset=utf-8;");
                res.setHeader(
                    "Content-Disposition",
                    "attachment; filename=" + file_name + ".csv"
                );
                res.status(200).end(csvData);
            }
        } else {
            res.redirect("/");
        }
    }
}

module.exports = new orderController();
