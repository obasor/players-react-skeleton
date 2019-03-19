import chai from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
import Newplayer from '../../src/components/Newplayer'
let expect = chai.expect

describe("test <Newplayer/>", ()=>{
    "use strict";
    const wrapper = shallow(<Newplayer />)
    it('I should see a page where I can enter my email and password', ()=>{

    });

})

