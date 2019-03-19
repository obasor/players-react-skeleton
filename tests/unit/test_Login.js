import chai from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
import Login from '../../src/components/Login'
let expect = chai.expect

describe("test <Login/>", ()=>{
    "use strict";
    const wrapper = shallow(<Login />)
    it('I should see a page where I can enter my email and password', ()=>{
		expect(wrapper.find('input[name="email"]')).to.have.length(1)
		expect(wrapper.find('input[name="password"]')).to.have.length(1)
    });

    it('As a user when I complete login I should see my player roster', ()=>{
    	wrapper.find('input[type="email"]').simulate('change', {target: {name: 'username', value: 'dav0r0@yahoo.com'}})
		wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'davo'}})
		expect(wrapper.find('form').simulate('submit', { preventDefault () {} }))
		expect(wrapper.state('submitted')).to.be.true

		console.log(wrapper.state('submitted'))

    });

})

