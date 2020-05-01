'use stricts';

const ValidationContract = require('../validators/fluent-validator');

const repository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        const data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.post = async  (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter no mínimo 3 caracters');
    contract.hasMinLen(req.body.slug, 3, 'O Slug deve conter no mínimo 3 caracters');
    contract.hasMinLen(req.body.description, 3, 'O Description deve conter no mínimo 3 caracters');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        const data = await repository.save();
        res.status(201).send({message:"Produto cadastrado com sucesso"});
    } catch (e) {
        res.status(400).send({message:"Erro ao salvar produto", data: e});
    }
};

exports.put = async (req, res, next)=> {
    try {
        const data = await repository.update(req.params.id, req.body);
        res.status(204).send({message: 'Produto atualizado com sucesso'});
    } catch (e) {
        res.status(400).send({message: 'Falha ao atualizar produto',data: e});
    }
};

exports.delete = async (req, res, next)=> {
    try {
        const data = await repository.remove(req.params.id);
        res.status(204).send({
            message: 'Produto atualizado com sucesso'
        })
    } catch (e) {
        res.status(400).send({
            message: 'Falha ao atualizar produto',
            data: e
        });
    }
};