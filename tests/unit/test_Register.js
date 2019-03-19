import chai from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
import Register from '../../src/components/Register'
let expect = chai.expect

describe("test <Register/>", ()=>{
    "use strict";
    const wrapper = shallow(<Register />)
    it('I should see a Register page', ()=>{

    });

})

