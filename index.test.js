"use strict";
// Simulation Deva Test File
// Copyright ©2000-2025 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:68662190310951498652 LICENSE.md
// Friday, December 19, 2025 - 8:32:17 AM

const {expect} = require('chai')
const SimulationDeva = require('./index.js');

describe(SimulationDeva.me.name, () => {
  beforeEach(() => {
    return SimulationDeva.init()
  });
  it('Check the DEVA Object', () => {
    expect(SimulationDeva).to.be.an('object');
    expect(SimulationDeva).to.have.property('agent');
    expect(SimulationDeva).to.have.property('vars');
    expect(SimulationDeva).to.have.property('listeners');
    expect(SimulationDeva).to.have.property('methods');
    expect(SimulationDeva).to.have.property('modules');
  });
})
