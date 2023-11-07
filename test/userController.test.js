const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const userController = require('../controllers/userController');
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');

describe('User Controller', () => {
    before(() => {
        process.env.SECRET_KEY = 'testkey';
    });

    afterEach(() => {
        sinon.restore();
    })

    it('Should login successfully with registered username and correct password', async() => {
        const req = {
            body: {
                username: 'testuser',
                password: 'testpassword'
            }
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        const mockUser = {
            id: '123',
            password: bcrypt.hashSync('testpassword', 10)
        };

        sinon.stub(userModel, 'findOne').returns(mockUser);
        sinon.stub(bcrypt, 'compareSync').returns(true);
        
        await userController.signIn(req, res);
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
    });

    it('Should login failed and user does not exists', async() => {
        const req = {
            body: {
                username: 'notexist',
                password: 'testpassword'
            }
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        sinon.stub(userModel, 'findOne').resolves(null);

        await userController.signIn(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.firstCall.args[0]).to.deep.equal({msg: 'user does not exists'});
    });
})
