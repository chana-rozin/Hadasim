import { validator } from "../helper.js";

const new_member = async (req, res, next) => {
    const validationRule = {
        "id": "required|integer|israeliID|maxInstance:member,memberIdentifyNo,0",
        "first_name": "required|string|max:45",
        "last_name": "required|string|max:45",
        "city": "required|string|max:45",
        "street": "required|string|max:45",
        "house_no": "required|digits_between:1,10000",
        "birth_date": "required|date",
        "telephone": "required|israeliPhone",
        //"cellphone": "nullOrRegex:/^(05[0-9])-?(\d{7})$/"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const update_member = async (req, res, next) => {
    const validationRule = {
        "first_name": "required|string|max:45",
        "last_name": "required|string|max:45",
        "city": "required|string|max:45",
        "street": "required|string|max:45",
        "house_no": "required|digits_between:1,10000",
        "birth_date": "required|date",
        "telephone": "required|israeliPhone",
        //"cellphone": "nullOrRegex:/^(05[0-9])-?(\d{7})$/"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const new_vaccination = async (req, res, next) => {
    const validationRule = {
        "memberId": "required|integer|israeliID|existsInTable:member,memberIdentifyNo|maxInstance:vaccinated,memberId,3",
        "vaccinId": "required|integer|existsInTable:vaccin,vaccinId",
        "date": "required|datetime"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const update_vaccination = async (req, res, next) => {
    const validationRule = {
        "vaccinId": "required|integer|existsInTable:vaccin,vaccinId",
        "date": "required|datetime"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const new_covid_carrier = async (req, res, next) => {
    const validationRule = {
        "memberId": "required|integer|israeliID|maxInstance:covid_carrier,memberId,0|existsInTable:member,memberIdentifyNo",
        "receivingDate": "required|datetime",
        "recoveryDate": "nullOrDatetime"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const update_covid_carrier = async (req, res, next) => {
    const validationRule = {
        "memberId": "required|integer|israeliID|maxInstance:covid_carrier,memberIdentifyNo,0|existsInTable:member,memberIdentifyNo",
        "receivingDate": "required|datetime",
        "recoveryDate": "nullOrDatetime"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

const image = async (req, res, next) => {
    const validationRule = {
        "body": "image"
    };

    await validator(req, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch(err => console.log(err))
}

export {new_member,update_member, new_vaccination, update_vaccination, new_covid_carrier, update_covid_carrier, image};