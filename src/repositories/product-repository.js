'use stricts';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    const res = await Product.find({active: true}, 'title price slag tags');
    return res;
}

exports.getBySlug = async (slug) => {
    const res = await Product.findOne({
                            slug: slug,
                            active: true
                        }, 'title price slag description');
    return res;
}

exports.getById = async (id) => {
    const res = await Product.findById(id, 'title price slag description');
    return res;
}

exports.save = async (data) => {
    var product = new Product(data.body);
    await product.save()
}

exports.getByTag = async (tag) => {
    const res = await Product
                        .findOne({
                            tags: tag,
                            active: true
                        }, 'title price slag description');
    return res;
}

exports.remove = async (id) => {
    const res = await Product.findOneAndRemove(id);
    return res
}

exports.update = async (id, body) => {
    const res = await Product
                        .findByIdAndUpdate(id,{
                            $set: {
                                title: body.title,
                                description: body.description,
                                price: body.price,
                            }
                        });
    return res;
}