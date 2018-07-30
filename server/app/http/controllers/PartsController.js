const CarPart = require('../../models/CarPart');
const colors = require('colors/safe');

class PartsController {

    get protected () {
        return ['updatedAt', 'createdAt', '_id', '__v'];
    }

    getAllParts (req, res) {
        CarPart.find().lean().exec((err, parts) => {
            if (err) {
                res.status(500).send(
                    this._formatResponse(false, err)
                );
                this._error(err);
                return;
            }
            res.json(
                this._formatResponse(true, parts)
            );
        });
    }

    getSinglePart (req, res) {
        CarPart.findById(req.params.id).lean().exec((err, part) => {
            if (err) {
                res.status(404).send(
                    this._formatResponse(false, err)
                );
                this._error(err);
                return;
            } else if (part === null) {
                res.status(404).send(
                    this._formatResponse(false)
                );
                this._error({ message: `Part with id ${req.params.id} not found.` });
                return;
            }
            res.json(
                this._formatResponse(true, part)
            );
        });
    }

    createCarPart (req, res) {
        CarPart.create(req.body, (err, part) => {
            if (err) {
                res.status(400).send(
                    this._formatResponse(false, err)
                );
                this._error(err);
                return;
            }
            res.json(
                this._formatResponse(true, part)
            );
        });
    }

    updatePart (req, res) {
        CarPart.findById(req.params.id, (err, part) => {
            for (const key in req.body) {
                if (!this.protected.includes(key)) {
                    if (part[key]) {
                        part[key] = req.body[key];
                    } else {
                        res.status(400).send(
                            this._formatResponse(false)
                        )
                        this._error({ message: 'Invalid key specified.' });
                        return;
                    }
                }
            }
            part.updatedAt = Date.now();
            part.save((err, part) => {
                if (err) {
                    res.status(500).send(
                        this._formatResponse(false, err)
                    );
                    this._error(err);
                    return;
                }
                res.json(
                    this._formatResponse(true, part)
                );
            });
        });
    }

    deletePart (req, res) {
        CarPart.remove({ _id: req.params.id }, (err) => {
            if (err) {
                res.status(500).send(
                    this._formatResponse(false, err)
                );
                this._error(err);
                return;
            }
            res.json(
                this._formatResponse(true)
            );
        })
    }

    _formatResponse (success, data = false) {
        const obj = {};
        if (success) {
            obj.success = true;
            if (data) {
                obj.data = data;
            }
        } else {
            obj.success = false;
            if (data) {
                Object.assign(obj, data);
            }
        }
        return obj;
    }
    
    _error (err) {
        console.error(colors.red( `[PartsController] Error occurred: ${err.message}`));
    }
}

module.exports = new PartsController();