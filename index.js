"use strict";
// Simulation Deva
// Copyright ©2000-2026 Quinn A Michaels; All rights reserved. 
// Legal Signature Required For Lawful Use.
// Distributed under VLA:16172463734087807447 LICENSE.md
// Wednesday, January 7, 2026 - 5:30:08 PM

import Deva from '@indra.ai/deva';
import { MongoClient, ObjectId } from 'mongodb';

import pkg from './package.json' with {type:'json'};
const {agent,vars} = pkg.data;

// set the __dirname
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';    
const __dirname = dirname(fileURLToPath(import.meta.url));

const info = {
  id: pkg.id,
  name: pkg.name,
  describe: pkg.description,
  version: pkg.version,
  url: pkg.homepage,
  dir: __dirname,
  git: pkg.repository.url,
  bugs: pkg.bugs.url,
  author: pkg.author,
  license: pkg.license,
  VLA: pkg.VLA,
  copyright: pkg.copyright,
};

const SimulationDeva = new Deva({
  info,
  agent,
  vars,
  utils: {
    translate(input) {return input.trim();},
    parse(input) {return input.trim();},
    process(input) {return input.trim();}
  },
  listeners: {},
  modules: {
    client: false,
  },
  devas: {},
  func: {},
  methods: {},
  onInit(data, resolve) {
    const {personal} = this.license(); // get the license config
    const agent_license = this.info().VLA; // get agent license
    const license_check = this.license_check(personal, agent_license); // check license
    // return this.start if license_check passes otherwise stop.
    this.action('return', `onInit:${data.id.uid}`);    
    return license_check ? this.start(data, resolve) : this.stop(data, resolve);
  },
  onReady(data, resolve) {
    const {VLA} = this.info();
        
    // this.state('get', `mongo:global:${data.id.uid}`);
    // const {uri,database, log} = this.authority().global.mongo;
    // this.state('set', `mongo:client:${data.id.uid}`);
    // this.modules.client = new MongoClient(uri);
    // this.state('set', `mongo:database:${data.id.uid}`);
    // this.vars.database = database;
    // this.state('set', `mongo:log:${data.id.uid}`);
    // this.vars.log = log;
    // this.action('return', `onStart:${data.id.uid}`);    
    
    this.prompt(`${this.vars.messages.ready} > VLA:${VLA.uid}`);
    this.action('resolve', `onReady:${data.id.uid}`);
    return resolve(data);
  },
  onError(err, data, reject) {
    this.prompt(this.vars.messages.error);
    console.log(err);
    this.action('reject', `onError:${data.id.uid}`);        
    return reject(err);
  }
});
export default SimulationDeva
