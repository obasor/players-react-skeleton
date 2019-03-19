import chai from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
import App from '../../src/components/App'
let expect = chai.expect

describe("test for <App/>", ()=>{
  "use strict";
  const wrapper = shallow(<App />)
  it('Homepage should Contain text Login', ()=>{
   expect(wrapper.find('h4').text()).to.have.string('Login');
  });
  it('Homepage should Contain text Register', ()=>{
    expect(wrapper.find('h4').text()).to.have.string('Register');
  });
  it('Homepage should see a link to href=/login', ()=>{
    expect(wrapper.find('a[href="/login"]')).to.have.length(1);
  });
  it('Homepage should see a link to href=/register', ()=>{
    expect(wrapper.find('a[href="/login"]')).to.have.length(1);
  });
})

