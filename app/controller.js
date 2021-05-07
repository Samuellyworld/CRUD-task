const Info = require('./model.js');

// Create and save new data

const handleCreate = (req, res) => {
 // Validate request
 if(!req.body) {
    return res.status(400).json({
        message: "all fields can not be empty"
    });
}
// Create data
const info = new Info({
    name: req.body.name, 
    email: req.body.email,
    country: req.body.country
});
// Save data in the database
info.save()
.then(data => {
    res.status(200).json({
        message: 'sucess',
        data: data
    });
 })
 .catch(err => {
    res.status(500).json({
        message: err.message || "Some error occurred while creating data."
    });
});
};


// Retrieve and return data from the database.
const handleFind = (req, res) => {
    Info.find()
    .then(data => {
      res.status(200).json({
            message: 'Success',
            data: data
        });
    }).catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};


// Update a data identified by the dataId in the request

const handleUpdate = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).json({
            message: "content can not be empty"
        });
    }
    // Find data and update it with the request body
    Info.findByIdAndUpdate(req.params.dataId, {
        name: req.body.name, 
        email: req.body.email,
        country: req.body.country
    }, {new: true})
    .then(data => {
        if(!data) {
            return res.status(404).json({
                message: "data not found with id " + req.params.dataId
            });
        }
        res.status(200).json({
            message: 'Data updated sucessfully',
        });;
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "data not found with id " + req.params.dataId
            });                
        }
        return res.status(500).json({
            message: "Error updating data with id " + req.params.dataId
        });
    });
};


// Delete a data with the specified noteId in the request

const handleDelete = (req, res) => {
    Info.findByIdAndRemove(req.params.dataId)
    .then(data => {
        if(!data) {
            return res.status(404).json({
                message: "data not found with id " + req.params.dataId
            });
        }
        res.send({message: "data deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                message: "Note not found with id " + req.params.dataId
            });                
        }
        return res.status(500).json({
            message: "Could not delete data with id " + req.params.dataId
        });
    });
};


module.exports = {
    handleCreate,
    handleFind,
    handleUpdate,
    handleDelete
}