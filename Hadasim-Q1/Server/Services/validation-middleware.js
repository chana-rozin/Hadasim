import { validator } from "../helper.js";

const new_member = async (req, res, next) => {
    const validationRule = {
        "memberIdentifyNo": "required|integer|israeliID|maxInstance:member,memberIdentifyNo,0",
        "memberFirstName": "required|string|max:45",
        "memberLastName": "required|string|max:45",
        "memberCity": "required|string|max:45",
        "memberStreet": "required|string|max:45",
        "memberHouseNo": "required|digits_between:1,10000",
        "memberBirthDate": "required|date",
        "memberTel": "required|israeliPhone",
        //"memberCell": "nullOrRegex:/^(05[0-9])-?(\d{7})$/"
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
        "memberFirstName": "required|string|max:45",
        "memberLastName": "required|string|max:45",
        "memberCity": "required|string|max:45",
        "memberStreet": "required|string|max:45",
        "memberHouseNo": "required|digits_between:1,10000",
        "memberBirthDate": "required|date",
        "memberTel": "required|israeliPhone",
        //"memberCell": "nullOrRegex:/^(05[0-9])-?(\d{7})$/"
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
    }).catch(err => console.error(err))
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